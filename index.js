import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/index') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Server Error');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }else if (url === '/about') {
        fs.readFile('about.html', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Server Error');
            }else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 - Internal Server Error');
    }
});
server.listen(3000, () => {
    console.log('Server started on port 3000');
});