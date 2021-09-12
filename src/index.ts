import express from 'express';
import cors from 'cors';
import homeRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", homeRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

