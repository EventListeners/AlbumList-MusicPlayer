CREATE DATABASE spotify;
USE spotify;


CREATE TABLE IF NOT EXISTS artists (
  artistID INT PRIMARY KEY,
  artistName VARCHAR(60) NOT NULL
);


CREATE TABLE IF NOT EXISTS albums (
   albumID INT PRIMARY KEY,
   albumName VARCHAR(100) NOT NULL,
   albumImage VARCHAR(150) NOT NULL,
   publishedYear INT NOT NULL,
   albums_artistID INT NOT NULL,
   FOREIGN KEY (albums_artistID) REFERENCES artists(artistID)
);


CREATE TABLE IF NOT EXISTS songs (
   songID INT PRIMARY KEY,
   songName VARCHAR(100) NOT NULL,
   streams INT NOT NULL,
   songLength INT NOT NULL,
   popularity INT NOT NULL,
   addedToLibrary BOOLEAN NOT NULL,
   songs_albumID INT NOT NULL,
   FOREIGN KEY (songs_albumID) REFERENCES albums(albumID)
);

CREATE INDEX albums_index ON ALBUMS (albums_artistID);
CREATE INDEX songs_index ON SONGS (songs_albumID);




