import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArtistList from './ArtistList';
import React from 'react';


test('renders artist list', () => {
    const albums = [
        { _id: '1', artist: 'Artist 1' },
        { _id: '2', artist: 'Artist 2' },
    ];

    render(<ArtistList albums={albums} clickHandler={() => {}} />);

    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
});




// Mock the API call
// global.fetch = jest.fn();
//
// // Mocking the API response for GET /api/albums
// beforeEach(() => {
//     fetch.mockResolvedValueOnce({
//         json: () => Promise.resolve({
//             _id: '1',
//             artist: 'Artist One',
//             albumTitle: 'Album One',
//             songs: ['Song One', 'Song Two'],
//             releaseDate: '2020-01-01'
//         },
//             {
//                 _id: '2',
//                 artist: 'Artist Two',
//                 albumTitle: 'Album Two',
//                 songs: ['Song Three', 'Song Four'],
//                 releaseDate: '2020-01-02'
//             }),
//     });
// });
//
// afterEach(() => {
//     jest.clearAllMocks();
// });
//
// test('renders artist list fetched from API', async () => {
//     render(<ArtistList />);
//
//     // Wait for data to be rendered
//     await waitFor(() => screen.getByText('Artist 1'));
//
//     expect(screen.getByText('Artist 1')).toBeInTheDocument();
//     expect(screen.getByText('Artist 2')).toBeInTheDocument();
// });
//
// test('adds a new album', async () => {
//     fetch.mockResolvedValueOnce({
//         json: () => Promise.resolve({
//             _id: '3', artist: 'Artist 3', albumTitle: 'New Album', songs: []
//         })
//     });
//     render(<ArtistList />);
//     // Simulate the process of adding a new album
//     const addButton = screen.getByText('Save'); // Assuming you have a "Save" button in the form
//     fireEvent.click(addButton);
//
//     // Assert the album was added (you can check if the new album is in the document, for example)
//     await waitFor(() => screen.getByText('Artist 3'));
//     expect(screen.getByText('Artist 3')).toBeInTheDocument();
// });






