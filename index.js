import express from 'express';
import bodyParser from 'body-parser';
import routes from "./routes/index.js";
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = 5000;

// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/api/v1', routes);


// Connect mango db
mongoose.connect(process.env.DB_URL).then(() => {
  console.info('Connected to MongoDB');
  app.listen(port, () => {
    console.info(`Listening to port ${port}`);
  });
});

