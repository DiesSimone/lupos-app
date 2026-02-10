require("dotenv").config();
const express = require("express");
const { connectDb } = require("./db");
const dbRoute = require("./src/routes/database_router");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/db", dbRoute);

app.get("/", (req, res) => {
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

