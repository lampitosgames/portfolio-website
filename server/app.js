// Node modules
import express from 'express';
import http from 'http';
// Custom express router
import router from './router';

// Import state
// import AppState, { DefaultUser } from './state';

// Select the port from an environment variable or default to 5000
// This is needed for Heroku
const port = process.env.PORT || process.env.NODE_PORT || 5000;

// Express app
const app = express();
// HTTP servver
const server = http.createServer(app);

// Hook in the app router
app.use(router);

// Start the server listening on this port
server.listen(port, () => {
  console.log(`Server listening on ${server.address().port}`);
});
