const { Pool } = require('pg');

/*
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);

const cacheFunc = async function(artistID, sql) {
  console.log('cache func call')
  const hashKey = JSON.stringify(artistID); 
  const key = JSON.stringify(sql);  
  const cachedValue = await client.hget(hashKey, key);
  return cachedValue ? JSON.parse(cachedValue) : null
};
*/

// const connection = new Pool({
//   "host": "localhost",
//   "user": "postgres",
//   "database": "spotify",
//   "password": "student123",
//   "port": "5432"
// });

const connection = new Pool({
  user: 'power_user',
  host: '18.191.102.59',
  database: 'spotify',
  password: '$poweruserpassword',
  port: 5432,
});


const getArtist = function (artistID, callback) {
 
  // const sql = 
  //   `SELECT * 
  //   FROM artists 
  //   INNER JOIN albums ON artists.artistID=albums.albums_artistID 
  //   INNER JOIN songs ON albums.albumID=songs.songs_albumID 
  //   WHERE artists.artistID = ${artistID}`;

  const sql = 
    `SELECT * 
    FROM artists
    WHERE artists.artistID = ${artistID}`;

  connection.query(sql)
      .then(data => callback(null, data))
      .catch(err => callback(err, null));

/*
  const cache = cacheFunc(artistID, sql);

  console.log(cache)
  
  if (cache) {
    console.log('caching');
    callback(null, cache);
  } else {
    console.log('postgres query');
    connection.query(sql)
      .then(data => {
        client.hset(artistID, sql, JSON.stringify(data));
        callback(null, data);
      })
      .catch(err => callback(err, null));
  }
*/
};

const postArtist = (artist, callback) => {
  client.del(JSON.stringify(artist.artistID));
  const sql = `INSERT INTO artists (artistID, artistName) VALUES (${artist.artistID}, '${artist.artistName}')`;
  connection.query(sql)
    .then(() => callback(null, `New artist added to database ${artist.artistID}`))
    .catch(err => callback(err, null));
};

const updateArtist = (artistID, newArtist, callback) => {
  client.del(JSON.stringify(artistID));
  const sql = 
    `UPDATE artists 
    SET (artistName) = (${newArtist.artistName})
    WHERE artistID = ${artistID}`;
  connection.query(sql)
    .then(() => callback(null, `Artist ${artistID} has been updated`))
    .catch(err => callback(err, null));
};

const deleteArtist = (artistID, callback) => {
  client.del(JSON.stringify(artistID));
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
