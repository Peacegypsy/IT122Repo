'use strict'

import mongoose, {Schema, model, connect} from "mongoose";
import {configDotenv} from "dotenv";

//const { Schema } = mongoose;
configDotenv();

const user = process.env.USERNAME;

const pw = process.env.CONNECTION_STRING;

const connectionString: string = `mongodb+srv://${user}:${pw}@cluster0.hujra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(connectionString, {dbName: 'musicCollection'}).then(() => {})
    .catch((error: any) => {
        console.log("Mongo Error: ", error);
    });

mongoose.connection.on('open', () => {
    console.log('Mongoose connected');
});

const albumSchema = new Schema({
    artist: {type: String, required: true},
    albumTitle: {type: String},
    songs: {type: Array, default: []},
    releaseDate: {type: Date}
});

export const Album = mongoose.model('Album', albumSchema);
