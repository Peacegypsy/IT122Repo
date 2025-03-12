'use strict'

import {Album} from './models/album.js';
import express, {json} from "express";
import cors from 'cors';


const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static( "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', cors({origin: "*"}));
app.set("view engine", "ejs");


// Gets home page
app.get('/', (req,res, next) => {
    res.render('albums_react');

});

// Home page - displays all artists names linked to an album in collection
app.get('/home', (req, res, next) => {
    Album.find({}).lean()
        .then((albums) => {
            res.render('albums_react', {albums: JSON.stringify(albums)});
        })
        .catch((err) => {next(err)})
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
})

// Album details
app.get("/detail", (req, res, next) => {
    Album.findOne({ artist:req.query.artist}).lean()
        .then((album) => {
            res.render('details', {album: album, albumTitle: req.query.album});
        })
        .catch((err) => {next(err)})
});

// Deletes a single album
app.get('/delete', async (req, res) => {
    const deletedAlbum = await Album.findOneAndDelete({albumTitle:req.query.album}).lean();
    if (deletedAlbum) {
        console.log("Album deleted");
        res.render('delete', {albumTitle:req.query.albumTitle, deletedAlbum});
    } else {
        res.render('delete');
    }
});


// API routes
// get home page(show all albums)
app.get('/api/albums', (req, res, next) => {
    Album.find({}).lean()
        .then((albums) => {
            res.json(albums);
        })
        .catch(err => next(err));
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

// add a new album
app.post('/api/addAlbum', (req, res, next) => {
    if (!req.body._id) {
        console.log("create", req.body);
        Album.create(req.body).then(result => res.json(result)).then(result => {console.log(result.statusCode)})
        .catch(err => res.json({"error": err}));

    } else {
        console.log("alternate");
        Album.findOneAndUpdate({_id: req.body._id}, {artist:req.body.artist, albumTitle: req.body.albumTitle, songs: req.body.songs})
            .then(result => res.json(result))
            .catch(err => res.json({"error": err}));
    }
});

// Update album info
app.get('/api/add/:_id/:artist/:albumTitle/:songs',(req, res, next) => {
    let artist = req.params.artist;
    console.log("rp: ", req.params);
    Album.findOneAndUpdate({ artist: artist},({artist:req.params.artist, albumTitle: req.params.albumTitle, songs: req.params.songs}), {upsert: true},(err, res) =>{
        if (err) return next(err);
        res.json({updated: res.nModified});
    });
});



// delete an album
app.get('/api/albums/delete/:_id', (req, res) => {
    Album.findOneAndDelete({_id: req.params._id})
        .then((result) => {
        res.json({"Deleted": result});
        })
    .catch(err => res.json({"error": err}));
})


app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('Not Found');
});


app.listen(app.get("port"), () => {
    console.log("Express started");
});
