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
