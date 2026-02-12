const User = require("../../models/users.js");
const bcrypt = require("bcrypt");
const session = require("express-session");

async function userCreation(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            created_at: new Date(Date.now())
        })
        res.status(200).json({ message: "User created" })
    } catch (error) {
        console.log(`[USER-CREATION] There has been an error: ${error}`);
        res.status(500).json({ error: "Couldn't create the user" });
    }
}

async function userLogging(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user === null) {
            return res.status(401).json({ message: "User not found" });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user._id
            console.log(req.session.userId);
            res.status(200).json({ message: `Successfully logged in as ${user.username}` });
        } else {
            res.status(401).json({ message: "Not authorized" });
        }

    } catch (error) {
        console.log(`[USER-LOGGING] There has been an error: ${error}`);
        res.status(500).json({ error: "Couldn't login" });
    }
}

module.exports = { userCreation, userLogging }