import express from 'express'
import { userCreation, userLogging, sessionCheck, getUsername, createTask, getTasks, getToken, deleteToken } from '../controllers/database_controller'
import { AuthenticateToken } from '../middlewares/middlewares'
const router = express.Router();

router.post("/register", userCreation);
router.post("/login", userLogging);
router.post("/taskcreate", createTask);
router.get("/status", sessionCheck);
router.get("/getname", AuthenticateToken, getUsername);
router.get("/gettasks", getTasks);
router.post("/token", getToken)
router.delete("/logout", deleteToken)

export default router