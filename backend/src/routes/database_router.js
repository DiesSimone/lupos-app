const express = require("express");
const router = express.Router();
const dbController = require("../controllers/database_controller");

router.post("/register", dbController.userCreation);
router.post("/login", dbController.userLogging);
router.get("/status", dbController.sessionCheck);
router.get("/getname", dbController.getUsername);

module.exports = router