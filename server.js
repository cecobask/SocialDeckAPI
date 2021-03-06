const app = require('./app');
const https = require('https');
const http = require('http');
const debug = require('debug')('SocialDeck-server');
const fs = require('fs');

// Create server.
let server;
if (process.env.ON_HEROKU)
    server = http.createServer(app);
else
    server = https.createServer({
        cert: fs.readFileSync(__dirname + '/secrets/cert.cert'),
        key: fs.readFileSync(__dirname + '/secrets/certkey.key'),
    }, app);

server.listen({port: process.env.PORT || 7000}, () =>
        debug('Server ready at https://localhost:7000/graphql')
);

module.exports = server;