//Node modules
import express from 'express';
import path from 'path';
import http from 'http';
//Custom express router
import router from './router';

//Load environment variables if in production
//Needed for twitter API keys.  We don't want to store sensitive info on a public
//git repo
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

//Import state
import AppState, {DefaultUser} from './state';

//Select the port from an environment variable or default to 5000
//This is needed for Heroku
const port = (process.env.PORT || 5000);

//Express app
let app = express();
//HTTP servver
let server = http.createServer(app);

//Hook in the app router
app.use(router);

//Start the server listening on this port
server.listen(port, () => {
    console.log("Server listening on " + server.address().port);
});
