// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;//its a class databaseconnectionas are made
// const ObjectID = mongodb.ObjectId;
const mongoose = require('mongoose');


let database;

async function getDatabase(){
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017');//local host for mongodb
    // database = client.db('library');
    // if(!database){
    //     console.log('Databse Nor');
    // }
    // return database;
    mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(()=>{
        console.log('Database Connected');
    }).catch(()=>{
        console.log("Database Connection Failed");
    })
}
module.exports = {
    getDatabase,
    // ObjectID
}