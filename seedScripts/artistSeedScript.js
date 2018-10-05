const faker = require('faker');
const fs = require('fs');

let dataArtists;
let artistsCounter = 0;
let streamArtist = fs.createWriteStream('./scriptData/artist_data.csv');
console.log(`new file created: artist_data.csv`);

//------------EDIT------------
const numberArtists = 10000000;
//----------------------------

// --------- HEADER ---------- 
dataArtists = 'artistID,artistName\n';
streamArtist.write(dataArtists);

for (let i = 1; i <= numberArtists; i++) {

    let artistName = faker.lorem.word();
    artistsCounter++;
    if(artistsCounter % 1000000 === 0) console.log(`counter === ${artistsCounter}`);

    dataArtists = `${i},${artistName}\n`;
    streamArtist.write(dataArtists);
}

streamArtist.end(() => {
    console.log('artists created');
});


