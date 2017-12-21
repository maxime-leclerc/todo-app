import mongoose from 'mongoose';
import { MONGO_HOST, MONGO_PORT, MONGO_DB } from '../config';

const DB = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.connect(DB,  { useMongoClient: true });

mongoose.connection.on('connected', () =>
  console.log('Mongoose connected: ', DB)
);

mongoose.connection.on('error', err =>
  console.log('Mongoose connection error: ', err)
);

mongoose.connection.on('disconnected', () =>
  console.log('Mongoose disconnected')
);

const tasks = require('./tasks.model.js');

export { tasks };
