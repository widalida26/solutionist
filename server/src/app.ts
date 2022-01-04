const cookieParser = require('cookie-parser');
import express from 'express';

const app = express();
app.use(cookieParser());
