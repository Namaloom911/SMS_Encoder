const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
const port = 3000;

const replacements = {
    '–': '-', '—': '-', '−': '-',
    '“': '"', '”': '"', '„': '"',
    '‘': "'", '’': "'", '‚': "'",
    '…': '...', '′': "'", '″': '"',
    '‹': '<', '›': '>', '«': '<<', '»': '>>'
};

function normalizeText(text) {
    return text.replace(/[\u2013\u2014\u2212\u201C\u201D\u201E\u2018\u2019\u201A\u2026\u2032\u2033\u2039\u203A\u00AB\u00BB]/g, (char) => {
        return replacements[char] || char;
    });
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('typing', (text) => {
    const normalizedText = normalizeText(text);
    io.emit('display', normalizedText);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
