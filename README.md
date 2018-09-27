# EventListeners

> Music streaming web application 

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API

>#### GET - Get an Artist
- Endpoint: `/artists/:artistID`
- Description: Gets all the information related to a given artist, including all songs



>#### GET - Get an Artist's Album
- Endpoint: `/artists/:artistID/albums/:albumID`
- Description: Gets all the information related to an artist's album



>#### POST - Add an Artist
- Endpoint: `/artists`
- Description: Adds a new artist to the database



>#### PUT - Update an Artist
- Endpoint: `/artists/:artistID`
- Description: Updates all information related to an artist



>#### PATCH - Update/Add a Song to Library
- Endpoint: `/artists/:artistID/albums/:albumID/songs/:songID`
- Description: Add song to the user's library



>#### DELETE - Deletes an Artist
- Endpoint: `artist/:artistID`
- Description: Deletes an artist from the database

