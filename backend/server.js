require("dotenv").config();
const express = require("express");
const { connectDb } = require("./db");
const session = require("express-session");
const cors = require("cors");
const dbRoute = require("./src/routes/database_router");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use(session({
    secret: "trialsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
        sameSite: 'lax'
    }
}))
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

