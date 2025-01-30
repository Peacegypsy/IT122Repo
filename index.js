'use strict'

import {Album} from './models/album.js';
import express, {json} from "express";
import cors from 'cors';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static( "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', cors());
app.set("view engine", "ejs");

// Gets home page
app.get("/", (req, res) => {
    Album.find({}).lean()
        .then((albums) => {
            res.render('home', {albums: albums});
        })
        .catch((err) => {
            console.error(err);
        })
});

// Home page - displays all artists names linked to an album in collection
app.get('/home', (req, res) => {
    Album.find({}).lean()
        .then((albums) => {
            res.render('home', {albums: albums});
        })
        .catch((err) => {
            console.error(err);
        })
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
})

// Album details
app.get("/detail", (req, res) => {
    Album.findOne({ artist:req.query.artist}).lean()
        .then((album) => {
            res.render('details', {album: album});
        })
        .catch((err) => {next(err)})
});

// Deletes a single album
app.get('/delete', async (req, res) => {
    const deletedAlbum = await Album.findOneAndDelete({albumTitle:req.query.albumTitle}).lean();

    if (deletedAlbum) {
        console.log("Album deleted");
        res.render('delete', {albumTitle:req.query.albumTitle, deletedAlbum});
    } else {
        res.render('delete');
    }
});


// API routes
// get home page(show all albums)
app.get('/albums', (req, res) => {
    Album.find({}).lean()
        .then((albums) => {
            res.json(albums);
        })
        .catch(err => res.json(err));
});

// details page
app.get('/albums/:artist', (req, res) => {
    let artist = req.body.artist;
    Album.findOne({artist: artist})
        .then((album) => {
            res.json(album);
        })
        .catch(err => res.json(err));
    });

// Update album info
app.post('/albums/update/:artist', (req, res) => {
    Album.findOneAndUpdate({artist: req.body.artist},req.body, {upsert: true})
        .then(result => res.json(result))
        .catch(err => res.json({"error NOT HERE": err}));
});

// delete an album
app.get('/albums/delete/:albumTitle', (req, res) => {
    Album.findOneAndDelete({albumTitle: req.body.albumTitle}, req.body)
        .then(result => {
            if (result.deletedCount === 1) {
                console.log("Successfully deleted");
            } else {
                console.log("Not deleted");
            }
        res.json(result);
        })
    .catch(err => res.json({"error NOT HERE": err}));
})


app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('Not Found');
});


app.listen(app.get("port"), () => {
    console.log("Express started");
});
