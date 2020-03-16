import express from 'express';
import api from './api'
require('dotenv').config();

const app = express();

app.use('/', api)