const { Pool } = require('pg');

const connection = new Pool({
  user: 'power_user',
  host: '18.221.228.110',
  database: 'spotify',
  password: '$poweruserpassword',
  port: 5432,
});

const getArtist = function () {
 
  const sqlArtist = `SELECT COUNT(*) FROM artists`;
  const sqlAlbums = `SELECT COUNT(*) FROM albums`;
  const sqlSongs = `SELECT COUNT(*) FROM songs`;

  connection.query(sqlArtist)
      .then(data => console.log('artists ', data.rows))
      .catch(err => console.log(err));
  connection.query(sqlAlbums)
      .then(data => console.log('albums ', data.rows))
      .catch(err => console.log(err));
  connection.query(sqlSongs)
      .then(data => console.log('songs ', data.rows))
      .catch(err => console.log(err));
 
};

getArtist();
