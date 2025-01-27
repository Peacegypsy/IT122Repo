'use strict'

import * as album from './data.js'
import express from "express";
import {getAlbum} from "./data.js";


const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname+ "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home", {albums: album.getAllAlbums()});
});

app.get("/detail", (req, res) => {
    let album = getAlbum(req.query.artist);
    res.render("details", {
        artist: req.query.artist,
        album: album,
    });
});

app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});


app.listen(app.get("port"), () => {
    console.log("Express started");
});
// const server = http.createServer((req, res) => {
//     const url = req.url;
//
//     if (url === '/' || url === '/index') {
//         fs.readFile('index.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end('500 - Internal Server Error');
//             }else {
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(data);
//             }
//         });
//     }else if (url === '/about') {
//         fs.readFile('about.html', (err, data) => {
//             if (err) {
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end('500 - Internal Server Error');
//             }else {
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(data);
//             }
//         });
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.end('404 - Internal Server Error');
//     }
// });
// server.listen(3000, () => {
//     console.log('Server started on port 3000');
// });