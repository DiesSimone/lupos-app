import express from 'express'
import { userCreation, userLogging, getUsername, createTask, createHabit, habitValue ,getTasks, getToken, deleteToken, deleteTask, checkTask, editHabit } from '../controllers/api_controller'
import { AuthenticateToken } from '../middlewares/middlewares'
const router = express.Router();

router.post("/register", userCreation);
router.post("/login", userLogging);
router.post("/taskcreate", AuthenticateToken, createTask);
router.post("/createhabit", AuthenticateToken, createHabit);
router.post("/edithabit", AuthenticateToken, editHabit);
router.post("/habitvalue", AuthenticateToken, habitValue)
router.get("/getname", AuthenticateToken, getUsername);
router.get("/gettasks", AuthenticateToken, getTasks);
router.post("/token", getToken);
router.post("/checktask", checkTask);
router.post("/deletetask", deleteTask);
router.delete("/logout", deleteToken);

export default router