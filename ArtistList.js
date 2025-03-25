import React from 'react';
import {Album} from "./models/album.js";

const ArtistList = ({albums, clickHandler}) => {
    return (
        <ul>
            {albums.map(album => (
                <li key={album.id} onClick={clickHandler}>{album.artist}</li>
            ))}
        </ul>
    );
};
export default ArtistList;