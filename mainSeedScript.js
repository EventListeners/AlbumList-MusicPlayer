const faker = require('faker');
const fs = require('fs');
let streamArtist = fs.createWriteStream('./scriptData/artist_data.csv');
let streamAlbums = fs.createWriteStream('./scriptData/albums_data.csv');
let streamSongs = fs.createWriteStream('./scriptData/songs_data.csv');

let fileNameCounterSong = 1;
let fileNameCounterAlbum = 1;
let fileNameCounterArtist = 1;

let artistsCounter = 0;
let albumsCounter = 0;
let songsCounter = 0;

const numberArtists = 10000000;
//const numberAlbums = 1;
//const numberSongs = 2;

let dataArtists = 'artistID,artistName\n';
streamArtist.write(dataArtists);

let dataAlbums = 'albumID,albumName,albumImage,publishedYear,artistID\n';
streamAlbums.write(dataAlbums);

let dataSongs = 'songID,songName,streams,length,popularity,addedToLibrary,albumID\n';
streamSongs.write(dataSongs);

for (let i = 1; i <= numberArtists; i++) {
    let artistName = faker.lorem.word();

    artistsCounter++;

    if(artistsCounter % 1000000 === 0) {
        console.log(`counter === ${artistsCounter}`);
        streamArtist.end(() => console.log('artist created ' + fileNameCounterArtist));
        streamArtist = fs.createWriteStream(`./scriptData/artist_data${fileNameCounterArtist}.csv`);
        fileNameCounterArtist++;
    } 

    dataArtists = `${i},${artistName}\n`;
    streamArtist.write(dataArtists);

    //number of albums - between 1 and 5
    let numberAlbums = Math.floor(Math.random() * 5) + 1;

    for (let j = 1; j <= numberAlbums; j++) {
        let albumName = faker.lorem.word();
        let albumCover = 'https://s3-us-west-1.amazonaws.com/dotthen/';
        let publishedYear = Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920;

        albumsCounter++;

        if(albumsCounter % 1000000 === 0) {
            console.log(`counter === ${albumsCounter}`);
            streamAlbums.end(() => console.log('albums created ' + fileNameCounterAlbum));
            streamAlbums = fs.createWriteStream(`./scriptData/albums_data${fileNameCounterAlbum}.csv`);
            fileNameCounterAlbum++;
        } 

        dataAlbums = `${j},${albumName},${albumCover},${publishedYear},${i}\n`;
        streamAlbums.write(dataAlbums);

        //number of songs - between 15 and 10
        let numberSongs = Math.floor(Math.random() * (15 - 10 + 1)) + 10;

        for (let k = 1; k <= numberSongs; k++) {
            let songName = faker.lorem.word();
            let songStreams = Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000;
            let songLength = Math.floor(Math.random() * (300 - 210 + 1)) + 210;
            let songPopularity = Math.floor(Math.random() * 20) + 1;
            let partOfLibrary = Math.random() >= 0.5;

            songsCounter++;

            if(songsCounter % 1000000 === 0) {
                console.log(`counter === ${songsCounter}`);
                streamSongs.end(() => console.log('songs created ' + fileNameCounterSong));
                streamSongs = fs.createWriteStream(`./scriptData/songs_data${fileNameCounterSong}.csv`);
                fileNameCounterSong++;
            } 

            dataSongs = `${k},${songName},${songStreams},${songLength},${songPopularity},${partOfLibrary},${j}\n`;
            streamSongs.write(dataSongs);
        }
    }

}

streamArtist.end(() => {
    console.log('artists created');
});

streamAlbums.end(() => {
    console.log('albums created');
});

streamSongs.end(() => {
    console.log('songs created');
});

