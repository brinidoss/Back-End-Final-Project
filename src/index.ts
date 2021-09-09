import express from 'express';
import cors from 'cors';
import shoutRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", shoutRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

