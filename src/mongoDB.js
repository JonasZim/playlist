const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function connectToDB() {
  // Connection URL
  const url = 'mongodb://localhost:27017/projectPlaylist';

  return MongoClient.connect(url, { useUnifiedTopology: true });
}

function createCrapped(collectionName) {
  connectToDB().then((connection) => {
    const db = connection.db();
    db.createCollection(collectionName, (err, result) => {
      console.log(`Collection ${collectionName} created`);
      connection.close();
    });
  }).catch(err => console.log(err));
}

function savePlaylist(pName, songs) {
  connectToDB().then((connection) => {
    const db = connection.db('projectPlaylist');
    db.collection(pName).insertOne(songs, (err, res) => {
      if (err) throw err;
      console.log('1 document inserted');
      connection.close();
    });
  });
}

function getPlaylistNames() {
  return connectToDB().then((connection) => {
    const db = connection.db('projectPlaylist');
    return db.listCollections().toArray();
  });
}

function getSongsForPlaylist(pName) {
  return connectToDB().then((connection) => {
    const db = connection.db('projectPlaylist');
    return db.collection(pName).find().toArray();
  });
}

export {
  savePlaylist,
  createCrapped,
  getPlaylistNames,
  getSongsForPlaylist,
};
