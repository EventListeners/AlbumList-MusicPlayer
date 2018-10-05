const faker = require('faker');
const fs = require('fs');

let dataAlbums;
let albumsCounter = 0;
let streamAlbums = fs.createWriteStream(`./scriptData/albums_data.csv`);
console.log(`new file created: albums_data.csv`);

//------------EDIT------------
const numberArtists = 10000000;
const numberAlbums = 1;
//----------------------------

// --------- HEADER ---------- 
dataAlbums = 'albumID,albumName,albumImage,publishedYear,albums_artistID\n';
streamAlbums.write(dataAlbums);

for (let i = 1; i <= numberArtists; i++) {

    for (let j = 1; j <= numberAlbums; j++) {

        let albumName = faker.lorem.word();
        let albumCover = 'https://s3-us-west-1.amazonaws.com/dotthen/';
        let publishedYear = Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920;

        albumsCounter++;
        if(albumsCounter % 1000000 === 0) console.log(`counter === ${albumsCounter}`);
         
        dataAlbums = `${albumsCounter},${albumName},${albumCover},${publishedYear},${i}\n`;
        streamAlbums.write(dataAlbums);
    }

}

streamAlbums.end(() => {
    console.log('albums created');
});


