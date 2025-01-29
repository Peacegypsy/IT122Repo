'use strict'

import {Album} from './models/album.js';
import express from "express";
import cors from 'cors';
 
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static( "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    Album.find({}).lean()
        .then((albums) => {
            res.render('home', {albums: albums});
        })
        .catch((err) => {
            console.error(err);
        })
});
app.get('/home', (req, res) => {
    Album.find({}).lean()
        .then((albums) => {
            res.render('home', {albums: albums});
        })
        .catch((err) => {
            console.error(err);
        })
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get("/detail", (req, res) => {
    Album.findOne({ artist:req.query.artist}).lean()
        .then((album) => {
            res.render('details', {album: album});
        })
        .catch((err) => {next(err)})
});
app.get('/delete', async (req, res) => {
    const deletedAlbum = await Album.findOneAndDelete({albumTitle:req.query.albumTitle}).lean();

    if (deletedAlbum) {
        console.log("Album deleted");
        res.render('delete', {albumTitle:req.query.albumTitle, deletedAlbum});
    } else {
        res.render('delete');
    }
});


app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('Not Found');
});


app.listen(app.get("port"), () => {
    console.log("Express started");
});
