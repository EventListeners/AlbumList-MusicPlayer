const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;

const PG = {
  "host": "localhost",
  "user": "postgres",
  "db": "spotify",
  "port": "5432",
  "pass": "student123"
};
const conString = `postgresql://${PG.user}:${PG.pass}@${PG.host}:${PG.port}/${PG.db}`

const copyIntoTable = (tableName, cols, ind, t1) => new Promise((resolve, reject) => {

  const client = new Client({
    connectionString: conString,
  })

  client.connect();

  var stream = client.query(copyFrom(`COPY ${tableName} ${cols} FROM STDIN DELIMITER ',' CSV`));
  var fileStream = fs.createReadStream(`../../seedScripts/scriptData/${t1 + ind}.csv`);

  fileStream.on('error', (error) =>{
    reject(`Error in reading file: ${error}`);
  });
  stream.on('error', (error) => {
    reject(`Error in copy command: ${error}`);
  });
  stream.on('end', () => {
    console.log(`Completed loading data into ${tableName}`);
    client.end(resolve);
  });
  fileStream.pipe(stream);
});

const copyManyCSV = async (tableName, colName, t1, first, last) => {
  for (let i = first; i <= last; i++) {
    await copyIntoTable(tableName, colName, i, t1);
  }
};

//Artists
// copyManyCSV('artists', '(artistID,artistName)', 'artist_data', 1, 11);
//Albums
// copyManyCSV('albums', '(albumID,albumName,albumImage,publishedYear,albums_artistID)', 'albums_data', 1, 31);
//Songs
copyManyCSV('songs', '(songID,songName,streams,songLength,popularity,addedToLibrary,songs_albumID)', 'songs_data', 1, 31);
