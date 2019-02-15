const http = require('http');
const fs = require('fs');
const path = require('path');

function savePost(name, body) {
    name = name.split(':').join('_');
    fs.writeFileSync(
        path.normalize(`out${name}.txt`),
        body
    );
    console.log(`${name} - saved `);
}

const server = http.createServer((req, res) => {

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {

            console.log('req.url',req.url);
            savePost(req.url, body);
            res.end('ok');
        });
    } else {
        res.end(`it's work!`);
    }
});


console.log('server start: 3001');
server.listen(3001);

