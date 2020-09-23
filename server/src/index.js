const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const {sendError} = require('./helpers/error-helper');
var cors = require('cors');

const { defaultPort, defaultFrontendUrl } = require('./constants');

const app = express();

//Adds middleware 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//setsup cors for dev mode to debug with front end development server
const frontEndUrl = process.env.FRONT_END_URL || defaultFrontendUrl;
const corsOptions = {
    origin: frontEndUrl
}
app.use(cors(corsOptions));

//setup router middleware all apis routing
app.use('/api', router);

app.use( (error, req, res, next) => {
    //minimal error helper to avoid error pages and use JSON responses
    if(!!error) {
        sendError(res, 500, [error.message], error);
    }
    next();
  })

//Serves client side files for production build
fs.exists(path.join(__dirname, 'public/index.html'), exists => {
    if (exists) {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        })
    }
});

const port = process.env.PORT || defaultPort;
app.listen(port);

console.log(`listening on port ${port} open on http:\\localhost:${port}`);
