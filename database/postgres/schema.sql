CREATE DATABASE IF NOT EXISTS spotify;
USE spotify;


CREATE TABLE IF NOT EXISTS artists (
  artistID INT AUTO_INCREMENT PRIMARY KEY,
  artistName VARCHAR(60) NOT NULL
);


CREATE TABLE IF NOT EXISTS albums (
   albumID INT AUTO_INCREMENT PRIMARY KEY,
   albumName VARCHAR(100) NOT NULL,
   albumImage VARCHAR(150) NOT NULL,
   publishedYear INT NOT NULL,
   FOREIGN KEY (albums_artistID) REFERENCES artists(artistID)
);


CREATE TABLE IF NOT EXISTS songs (
   songID INT AUTO_INCREMENT PRIMARY KEY,
   songName VARCHAR(100) NOT NULL,
   streams INT NOT NULL,
   songLength INT NOT NULL,
   popularity INT NOT NULL,
   addedToLibrary BOOLEAN NOT NULL,
   FOREIGN KEY (songs_albumID) REFERENCES albums(albumID)
);




