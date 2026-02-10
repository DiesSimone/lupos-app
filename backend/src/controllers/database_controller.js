const User = require("../../models/users.js");

async function userCreation(req, res){
    try {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: new Date(Date.now())
        })
        res.status(200).json({message: "User created"})
    } catch (error) {
        console.log(`[USER-CREATION] There has been an error: ${error}`);
        res.status(500).json({error: "Couldn't create the user"});
    }
}

module.exports = {userCreation}