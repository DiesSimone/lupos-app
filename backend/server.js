const express = require("express");
const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.get("/", (req, res) => {
    res.send("CIAO");
})

app.listen(PORT, () => {
    console.log("Server online");
});