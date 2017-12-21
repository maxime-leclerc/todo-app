import { APP_HOST, APP_PORT } from './config';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('port', APP_PORT || 8080);
app.set('host', APP_HOST || '127.0.0.1');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/tasks', require('./controllers/tasks.controller.js'));

app.listen(app.get('port'), app.get('host'), () => {
  console.log(`\nServer listening at http://${app.get('host')}:${ app.get('port')}`);
});
