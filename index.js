import express from 'express';
import abf from './lib'

const app = express();

abf(app);

app.listen(
    process.env.PORT || 3000,
    () => console.log('Open http://localhost:3000 to see a response.')
);