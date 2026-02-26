import express from 'express'
import { userCreation, userLogging, sessionCheck, getUsername, createTask, getTasks } from '../controllers/database_controller'
const router = express.Router();

router.post("/register", userCreation);
router.post("/login", userLogging);
router.post("/taskcreate", createTask);
router.get("/status", sessionCheck);
router.get("/getname", getUsername);
router.get("/gettasks", getTasks);

export default router