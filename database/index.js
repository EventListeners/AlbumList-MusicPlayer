const { Pool } = require('pg');

// const connection = new Pool({
//   "host": "localhost",
//   "user": "postgres",
//   "database": "spotify",
//   "password": "student123",
//   "port": "5432"
// });

const connection = new Pool({
  user: 'power_user',
  host: '18.221.228.110', //public
  //host: '172.31.41.198', //private
  database: 'spotify',
  password: '$poweruserpassword',
  port: 5432,
});


const getArtist = function (artistID, callback) {
  const sql = 
    `SELECT * 
    FROM artists 
    INNER JOIN albums ON artists.artistID=albums.albums_artistID 
    INNER JOIN songs ON albums.albumID=songs.songs_albumID 
    WHERE artists.artistID = ${artistID}`;

    connection.query(sql)
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
};

const postArtist = (artist, callback) => {
  //client.del(JSON.stringify(artist.artistID));
  const sql = `INSERT INTO artists (artistID, artistName) VALUES (${artist.artistID}, '${artist.artistName}')`;
  connection.query(sql)
    .then(() => callback(null, `New artist added to database ${artist.artistID}`))
    .catch(err => callback(err, null));
};

const updateArtist = (artistID, newArtist, callback) => {
  //client.del(JSON.stringify(artistID));
  const sql = 
    `UPDATE artists 
    SET (artistName) = (${newArtist.artistName})
    WHERE artistID = ${artistID}`;
  connection.query(sql)
    .then(() => callback(null, `Artist ${artistID} has been updated`))
    .catch(err => callback(err, null));
};

const deleteArtist = (artistID, callback) => {
  //client.del(JSON.stringify(artistID));
  const query = 
    `DELETE FROM artists
    WHERE artistID = ${artistID}`;
  connection.query(query)
    .then(() => {callback(null, `Artist ${artistID} has been deleted`)})
    .catch(err => {callback(err)})
}

module.exports.getArtist = getArtist;
module.exports.postArtist = postArtist;
module.exports.updateArtist = updateArtist;
module.exports.deleteArtist = deleteArtist;
