import express from 'express';
import cors from 'cors';
var bodyParser = require('body-parser');
import {petsRouter} from './Routes/petsRouter';
require('dotenv').config();

const api = express();

const port = process.env.PORT || 3000;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}))

api.use(cors());

api.use('/', petsRouter);

api.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

export default api;
