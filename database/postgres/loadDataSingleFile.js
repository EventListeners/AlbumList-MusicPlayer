const fs = require('fs');
const { Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;

console.time('Script Time: ');

const PG = {
  "host": "localhost",
  "user": "postgres",
  "db": "spotify",
  "port": "5432",
  "pass": "student123"
};

const conString = `postgresql://${PG.user}:${PG.pass}@${PG.host}:${PG.port}/${PG.db}`

const copyIntoTable = (tableName, cols, t1) => new Promise((resolve, reject) => {

  const client = new Client({
    connectionString: conString,
  })

  client.connect();

  var stream = client.query(copyFrom(`COPY ${tableName} ${cols} FROM STDIN DELIMITER ',' CSV`));
  var fileStream = fs.createReadStream(`../../seedScripts/scriptData/${t1}.csv`);

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
  console.timeEnd('Script Time: ');
});

const copyManyCSV = async (tableName, colName, t1) => {
    await copyIntoTable(tableName, colName, t1);
};

//Artists
// copyManyCSV('artists', '(artistID,artistName)', 'artist_data');
//Albums
// copyManyCSV('albums', '(albumID,albumName,albumImage,publishedYear,albums_artistID)', 'albums_data');
//Songs
copyManyCSV('songs', '(songID,songName,streams,songLength,popularity,addedToLibrary,songs_albumID)', 'songs_data');
