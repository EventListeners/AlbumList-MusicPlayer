const faker = require('faker');
const fs = require('fs');
let streamArtist = fs.createWriteStream('./scriptData/artist_data.csv');

let fileNameCounterArtist = 1;
let artistsCounter = 0;
const numberArtists = 10000000;

let dataArtists = 'artistID,artistName\n';
streamArtist.write(dataArtists);

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
}

streamArtist.end(() => {
    console.log('artists created');
});


