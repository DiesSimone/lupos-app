const express = require("express");
const router = express.Router();
const dbController = require("../controllers/database_controller");

router.post("/register", dbController.userCreation);

module.exports = router