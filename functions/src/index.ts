import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors';
import homeRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", homeRoutes);

export const api = functions.https.onRequest(app);