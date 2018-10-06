const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const server = express();
const {getArtist, postArtist, updateArtist, deleteArtist} = require('../database/index.js');

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
//server.use(express.urlencoded({ extended: true }));
// parse application/json
server.use( bodyParser.json() );

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));


server.get('/artists/:artistID', (req, res) => {
  getArtist(req.params.artistID, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.json(data.rows);
    }
  });
});

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
