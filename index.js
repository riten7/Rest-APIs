import express from 'express';
import path from 'path';
import config from 'config';
import route from './initial/route.js';
import database from './initial/db.js';

const port = 9000;
const app = express();

if (!config.get('Course.jwtPrivateKey')) {
  process.exit(1);
}
database();
route(app);

app.listen(process.env.PORT || config.get('Course.dbConfig.port'), () => console.log(`Server running on port ${port}`));