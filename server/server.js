const ip = require("ip");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const server = express();
const {getArtist, postArtist, updateArtist, deleteArtist} = require('../database/index.js');
//Redis
const redis = require('redis');
const redisUrl = 'redis://18.216.83.224:6379';
const client = redis.createClient(redisUrl);
//


server.use(bodyParser.urlencoded({ extended: false }));
server.use( bodyParser.json() );

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/:artistID', (req, res) => {
  console.log ( ip.address() );

  const key = JSON.stringify(req.params.artistID);
  client.get(key, function (err, redisQ) {
    if (err) {
      console.log(err);
    } else {
      if(!!redisQ) {
        res.json(JSON.parse(redisQ));
      } else {
        getArtist(req.params.artistID, (error, data) => {
          if (error) {
            res.status(400).send(error);
          } else {
            client.set(key, JSON.stringify(data.rows), 'EX', 10);
            res.json(data.rows);
          }
        });
      }
    }
  });
});

server.get('/ip', (req, res) => {
  res.json(ip.address());
});

// server.get('/artists/:artistID', (req, res) => {
//   console.log ( ip.address() );
//   getArtist(req.params.artistID, (error, data) => {
//     if (error) {
//       res.status(400).send(error);
//     } else {
//       res.json(data.rows);
//     }
//   });
// });

server.post('/artists', (req, res) => {
  postArtist(req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send({message: data});
    }
  });
});


server.put('/artists/:artistID', (req, res) => {
  const artistID = req.params.artistID;
  updateArtist(artistID, req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(202).send({message: data});
    }
  });
});


server.delete('/artists/:artistID', (req, res) => {
  const artistID = req.params.artistID;
  deleteArtist(artistID, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(202).send({message: data});
    }
  });
});

module.exports = server;
