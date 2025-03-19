'use strict';


import {Album} from './models/album.js';
import express from "express";
import cors from 'cors';

const app = express();
app.set("port", process.env.PORT || 3000)
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', cors({origin: "*"}));
app.set("view engine", "ejs");

//Gets home page
app.get('/', (req, res, next) => {
    res.render('albums_react');
})

// API Routes
// Get home page - show all albums
app.get('/api/albums', (req, res, next) => {
    Album.find({}).lean()
        .then((albums: any) => {
            res.json(albums);
        })
        .catch((err: any) => {next(err);
        })
});

app.post('/api/addAlbum', (req, res, next) => {
    if(!req.body._id) {
        console.log("Create: ",req.body);
        Album.create(req.body).then((result: any) => res.json(result)).then((result: { statusCode: any; }) => {console.log(result.statusCode)})
        .catch((err: any) => res.json({"Error: ": err}));
    } else {
        Album.findByIdAndUpdate({_id: req.body._id}, {artist:req.body.artist, albumTitle:req.body.albumTitle, songs:req.body.songs})
            .then((result: any) => res.json(result))
            .catch((err: any) => res.json({"Error: ": err}));
    }
});

app.get('/api/albums/delete/:_id', (req, res) => {
    Album.findOneAndDelete({_id: req.params._id})
        .then((result: any) => {
            res.json({"Deleted": result});
        })
        .catch((err: any) => res.json({"error": err}));
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`);
})