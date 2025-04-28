Text Optimizer
Text Optimizer is a web application that converts Unicode (UCS) characters to GSM-compatible characters in real-time. It features a sleek, dark-themed interface inspired by grok.com, with a centered layout including an input textarea with a Paste button and an output display with a Copy button. The app uses a Node.js backend with Express and Socket.IO for real-time text normalization.
Features

Real-Time Conversion: Converts UCS characters (e.g., “Hello” – world…) to GSM-compatible ones (e.g., "Hello" - world...) as you type or paste.
User-Friendly Interface: Dark-themed, centered design with:
Input textarea for typing or pasting text.
Paste button to load text from the clipboard.
Output display showing the normalized text.
Copy button to copy the output, with a brief "Copied" message.


Responsive Design: Works on desktop and mobile devices.
Real-Time Updates: Uses Socket.IO for instant text conversion feedback.

Prerequisites

Node.js: Version 14 or higher (download from nodejs.org).
npm: Included with Node.js for package management.
Browser: Modern browser (e.g., Chrome, Firefox) with JavaScript enabled.
Internet Connection: Required for loading the Socket.IO CDN in development.

Installation

Clone or Create the Project Directory:

Create a directory (e.g., text-optimizer).
Place the following files in the directory:
app.js (backend server)
index.html (frontend)
styles.css (styling)




Install Dependencies:

Open a terminal in the project directory.
Initialize a package.json (if not already present):npm init -y


Install required Node.js packages:npm install express socket.io




Verify File Structure:Ensure the directory looks like this:
text-optimizer/
├── app.js
├── public/index.html
├── public/styles.css
├── package.json
├── node_modules/



Running the App

Start the Backend Server:

In the project directory, run:node app.js


You should see:Server running at http://localhost:3000




Access the App:

Open a browser and navigate to http://localhost:3000.
The app should display a dark-themed interface with:
A "Text Optimizer" title.
An input textarea with a Paste button.
An output area with a Copy button.




Test the Functionality:

Type or paste text with UCS characters (e.g., “Hello” – world…) into the textarea.
The output area should update in real-time with GSM-compatible text (e.g., "Hello" - world...).
Click the Paste button to load text from your clipboard.
Click the Copy button to copy the output text; a "Copied" message should appear briefly.



File Descriptions

app.js:

Node.js backend using Express and Socket.IO.
Serves index.html and styles.css.
Normalizes UCS characters to GSM-compatible ones using a replacement map.
Handles real-time text updates via Socket.IO.


index.html:

Frontend interface using plain HTML, JavaScript, and Socket.IO.
Features a centered layout with input/output components.
Loads styles.css for styling and Socket.IO from a CDN for real-time communication.


styles.css:

Styles the app with a dark theme, inspired by grok.com.
Includes responsive design and a "Copied" message style for the Copy button.



Troubleshooting

Black Screen:

Check the browser Console (F12 > Console) for errors.
Ensure the Socket.IO CDN (https://cdn.socket.io/4.5.0/socket.io.min.js) loads (200 OK in Network tab).
Verify app.js is running and shows “a user connected” in the terminal.


Styles Not Applied:

Ensure styles.css is in the project directory and served correctly (http://localhost:3000/styles.css should load CSS).
Confirm app.js includes app.use(express.static(__dirname)) before routes.


No Real-Time Updates:

Check for Socket.IO errors in the Console or terminal.
Ensure the backend is running on http://localhost:3000 and the frontend connects to the correct URL (io('http://localhost:3000')).


Copy/Paste Issues:

Test in a modern browser; clipboard APIs require HTTPS or localhost in some browsers.
Check Console for clipboard-related errors.



Development Notes

The app uses a CDN for Socket.IO to reduce setup complexity. For production, consider local dependencies or a bundler like Vite.
The frontend is built with plain JavaScript for simplicity. A React version is available but requires additional CDNs (React, ReactDOM, Babel).
To deploy, use a platform like Heroku or Vercel, ensuring static files and Socket.IO are configured correctly.

Contributing
Feel free to fork the project, submit issues, or suggest improvements. To contribute:

Fork the repository (if hosted on GitHub).
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m "Add feature").
Push to the branch (git push origin feature-name).
Open a pull request.

License
This project is unlicensed. Feel free to use and modify it as needed.
Contact
For questions or support, contact the developer via [your preferred method, e.g., email or GitHub issues].
