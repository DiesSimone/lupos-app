import express from 'express'
import { userCreation, userLogging, getUsername, createTask, getTasks, getToken, deleteToken } from '../controllers/database_controller'
import { AuthenticateToken } from '../middlewares/middlewares'
const router = express.Router();

router.post("/register", userCreation);
router.post("/login", userLogging);
router.post("/taskcreate", AuthenticateToken, createTask);
router.get("/getname", AuthenticateToken, getUsername);
router.get("/gettasks", AuthenticateToken ,getTasks);
router.post("/token", getToken)
router.delete("/logout", deleteToken)

export default router