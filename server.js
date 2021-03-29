const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 8000;
http.createServer((req, res) => {
    var filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';

    const extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;  
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile('./404.html', (err, data) => {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Encountered error '+err.code+'. Check with the page administrator.');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data, 'utf-8');
        }
    });
}).listen(port);

console.log('Server started at port '+port+'.');