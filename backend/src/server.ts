require("dotenv").config();
import express, {Request, Response} from 'express'
import connectDb  from './db'
import cors from 'cors'
import apiRoute from './routes/api_router'
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
}));

app.use(express.json());

app.use("/api", apiRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("CIAO");
})

async function startServer() {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log("Server online");
        });
    } catch (error) {
        console.log(error);
        console.log("There has been an error with the server start");
    }
}

startServer();

