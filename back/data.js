const mongodb = require('mongodb');
require('dotenv').config()

const mongoURL = process.env.MONGOLAB_URI

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongoURL);
  database = client.db('catalog');
}

function getDb() {
  if (!database) {
    throw { message: 'Database not connected!' };
  } else {  message: 'Database connected!'}
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
