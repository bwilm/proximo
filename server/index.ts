import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
const prerender = require('prerender-node');
import check from './middleware/assetcheck.mw';
import api from './api';


let app = express();

let clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
app.use(prerender);
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('*', check);
app.use('/api', api);



app.listen(process.env.PORT || 3000);
