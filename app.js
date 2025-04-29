const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static(__dirname + "/public"));
const port = process.env.PORT || 3000;

const emojiRegex = /[\p{Emoji}\uFE0F]/gu;

const replacements = {
  "–": "-", // En dash to regular dash
  "—": "-", // Em dash to regular dash
  "−": "-", // Minus sign to regular dash
  "“": '"', // Opening curly quote to straight quote
  "”": '"', // Closing curly quote to straight quote
  "„": '"', // Low-quote mark to straight quote
  "‘": "'", // Opening single curly quote to straight single quote
  "’": "'", // Closing single curly quote to straight single quote
  "‚": "'", // Single low-quote mark to straight single quote
  "…": "...", // Ellipsis to three dots
  "′": "'", // Prime to straight single quote
  "″": '"', // Double prime to straight double quote
  "‹": "<", // Single left-pointing angle quote to "<"
  "›": ">", // Single right-pointing angle quote to ">"
  "«": "<<", // Left-pointing double angle quote to "<<"
  "»": ">>", // Right-pointing double angle quote to ">>"
  "•": "*", // Bullet to asterisk (GSM-7 compatible)
  "‍": "", // Zero-width joiner to empty string (remove for GSM-7)
};

function containsEmoji(text) {
  return emojiRegex.test(text);
}

function removeEmojis(text) {
  return text.replace(emojiRegex, "").replace(/\u200D/g, "");
}

function normalizeText(text) {
  console.log("yes");
  return text.replace(
    /[\u2013\u2014\u2212\u201C\u201D\u201E\u2018\u2019\u201A\u2026\u2032\u2033\u2039\u203A\u00AB\u00BB\u2022\u200D]/g,
    (char) => {
      return replacements[char] || char;
    }
  );
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  const userRoom = socket.id;
  socket.join(userRoom);
  socket.on("typing", (text) => {
    let normalizedText = text;
    if (containsEmoji(text)) {
      console.log("Emoji detected in message:", text);
      const clean = removeEmojis(text).trim();
      normalizedText = normalizeText(clean);
    } else {
      console.log("No emoji found. Skipping heavy processing.");
      normalizedText = normalizeText(text).trim();
    }
    io.to(userRoom).emit("display", normalizedText);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
