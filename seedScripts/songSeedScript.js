const faker = require('faker');
const fs = require('fs');

var randomfunc = async () => {

let dataSongs;
let songsCounter = 0;
let albumsCounter = 0;

//------CHANGE--------
const startArtist = 1;
const numberAlbums = 1;
const numberArtists = 10000000; //1mm * 10 = 10mm
//--------------------

let streamSongs = fs.createWriteStream(`./scriptData/songs_data.csv`);
console.log(`new file created: songs_data.csv`);

dataSongs = 'songID,songName,streams,songLength,popularity,addedToLibrary,songs_albumID\n';
streamSongs.write(dataSongs);

for (let i = startArtist; i <= numberArtists; i++) {

    for (let j = 1; j <= numberAlbums; j++) {

        //number of songs - between 10 and 12
        // let numberSongs = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
        let numberSongs = 1;
        albumsCounter++;

        for (let k = 1; k <= numberSongs; k++) {
            let songName = faker.lorem.word();
            let songStreams = Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000;
            let songLength = Math.floor(Math.random() * (300 - 210 + 1)) + 210;
            let songPopularity = Math.floor(Math.random() * 20) + 1;
            let partOfLibrary = Math.random() >= 0.5;

            songsCounter++;

            if(songsCounter % 1000000 === 0) console.log(`counter === ${songsCounter}`);

            dataSongs = `${songsCounter},${songName},${songStreams},${songLength},${songPopularity},${partOfLibrary},${albumsCounter}\n`;
            streamSongs.write(dataSongs);
        }
    }

}

streamSongs.end(() => {
    console.log('songs created');
});

};

randomfunc();