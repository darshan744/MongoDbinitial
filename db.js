const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;//its a class databaseconnectionas are made
const ObjectID = mongodb.ObjectId;

let database;

async function getDatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');//local host for mongodb
    database = client.db('library');
    if(!database){
        console.log('Databse Nor');
    }
    return database;
}
module.exports = {
    getDatabase,
    ObjectID
}