import config from 'config';
import mongoose from 'mongoose';

export default function() {
  const db = config.get('Course.dbConfig');
  const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
  mongoose.connect(db.host, connectionOptions)
    .then(() => console.log('Connected to MongoDb ...'))
    .catch(err => console.log('Could not connect to MongoDb ...', err)); 
}