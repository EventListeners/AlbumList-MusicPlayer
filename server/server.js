const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Artist = require('../database/index.js');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));


server.get('/artists/:artistID', (req, res) => {
  Artist.find({'artistID': req.params.id})
    .then(artist => res.json(artist))
    .catch(err => console.log(err));
});


server.post('/artists', (req, res) => {
  let newArtist = new Artist(req.body);
  newArtist.save()
    .then(() => res.status(201).json({message:"Successfully Added"}))
    .catch(() => res.status(400).end(error));
});


server.put('/artists/:artistID', (req, res) => {
  Artist.updateOne({ artistID: req.params.id }, { $set: req.body })
    .then(res.json({message:"Successfully Updated"}))
    .catch(() => res.status(400).end(error));
});


server.delete('/artists/:artistID', (req, res) => {
  Artist.deleteOne({ artistID: req.params.id })
    .then(res.json({message:"Successfully Deleted"}))
    .catch(() => res.status(400).end(error));
});





module.exports = server;
