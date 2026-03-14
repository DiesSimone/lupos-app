import { Request, Response } from 'express'
import { AuthRequest } from '../middlewares/middlewares'
import bcrypt from 'bcrypt'
import User from '../models/users'
import Task from '../models/tasks'
import Token from '../models/tokens'
import Habit from '../models/habits'
import HabitLogs from '../models/habit_logs'
import jwt from 'jsonwebtoken'
const accessSecret: string = process.env.ACCESS_TOKEN_SECRET!
const refreshSecret: string = process.env.REFRESH_TOKEN_SECRET!

export async function userCreation(req: Request, res: Response) {
    console.log(req.body);
    try {
        //creating a new password and hashing it with bcrypt
        const hashedPassword = await bcrypt.hash(req.body.data.password, 10);

        //creating a new document in the database (storing the user account information)
        User.create({
            username: req.body.data.username,
            email: req.body.data.email,
            password: hashedPassword,
            created_at: new Date(Date.now())
        })
        res.status(200).json({ message: "User created" })
    } catch (error) {
        console.log(`[USER-CREATION] There has been an error: ${error}`);
        res.status(500).json({ error: "Couldn't create the user" });
    }
}

export async function userLogging(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.body.data.email });
        if (!user || user === null) {
            return res.status(404).json({ message: "User not found" });
        }

        //comparing the input password and the real password associated to the user
        if (await bcrypt.compare(req.body.data.password, user.password)) {
            const accessToken = generateToken(user.toJSON())
            const refreshToken = jwt.sign(user.toJSON(), refreshSecret)
            Token.create({
                value: refreshToken
            })

            //giving to browser a new token, storing the refreshToken
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
                sameSite: 'lax',
                secure: false,
                httpOnly: true
            })
            res.status(200).json({ message: `Successfully logged in as ${user.username}`, accessToken: accessToken });
            console.log(`${user.username} has succesfully logged in!`);
        } else {
            res.status(401).json({ message: "Not authorized" });
        }

    } catch (error) {
        console.log(`[USER-LOGGING] There has been an error: ${error}`);
        res.status(500).json({ error: "Couldn't login" });
    }
}

export async function getUsername(req: AuthRequest, res: Response) {
    try {
        //getting the Id of the user to then check if it exists on the user database
        const userId = await req.user!._id
        const user = await User.findOne({ _id: userId })
        return res.json({ username: user!.username });
    } catch (error) {
        console.log(`There has been an error with getting the username ${error}`);
        return res.status(500).json({ error: error })
    }
}

export async function createTask(req: AuthRequest, res: Response) {
    try {
        //getting the Id of the user to then create a new task associated with that specific user
        const userId = await req.user!._id
        if (req.body.taskName == "") throw new Error("TNE");
        Task.create({
            user_id: userId,
            name: req.body.taskName,
            completed: false,
            date: new Date(Date.now())
        });
        res.status(200).json({ message: "Task created succesfully" })
    } catch (error: any) {
        console.log(`There has been an error with creating the tasks ${error}`);
        if ((error as Error).message == "TNE") {
            res.status(400).json({ message: "You must put something inside the task" })
        }
    }
}

export async function deleteTask(req: AuthRequest, res: Response) {
    try {
        console.log('deleting task...');
        const taskId = req.body.task_id;
        const task = await Task.deleteOne({ _id: taskId });
        return res.status(200).json({ message: "Task successfully deleted" });
    } catch (error) {
        console.log(`There has been an error with deleting the task ${error}`);
        return res.status(500).json({ error: error })
    }
}

export async function checkTask(req: AuthRequest, res: Response) {
    try {
        const taskId = req.body.task_id;
        console.log(taskId);
        const task = await Task.findOne({ _id: taskId });
        let taskCompletion = task?.completed
        taskCompletion = !taskCompletion
        await Task.findByIdAndUpdate(taskId, { completed: taskCompletion });
        console.log(taskCompletion);
        res.status(200).json("Completion switched to: " + taskCompletion);
        // const task = await Task.findByIdAndUpdate(taskId, {_id: taskId});
    } catch (error) {
        console.log(`There has been an error with checking the task ${error}`);
        return res.status(500).json({ error: error })
    }
}

export async function getTasks(req: AuthRequest, res: Response) {
    try {
        //getting the Id of the user to find all of his tasks
        const userId = await req.user!._id
        const tasks = await Task.find({ user_id: userId });
        const today = new Date();
        const startToday = (Date.now() - today.setHours(0, 0, 0));
        const filteredTasksByDate = tasks.filter((task) => {
            return task.date < new Date(Date.now()) && task.date > new Date(Date.now() - startToday);
        });
        res.status(200).json(filteredTasksByDate);
    } catch (error) {
        console.log(`There has been an error with getting the tasks ${error}`);
        res.status(400).json({ error: "Failed to fetch tasks" })
    }
}

export async function getToken(req: Request, res: Response) {
    try {
        //getting the refreshToken from the cookie sent from the browser
        const refreshToken = req.headers.cookie?.split('=')[1]
        if (refreshToken == null) return res.status(401).json({ message: "Refresh token from request not found" })

        //checking if token from the cookies exists in the refreshTokens DB
        if (await Token.findOne({ value: refreshToken }) == null) return res.status(403).json({ message: "Refresh token from database not found" })

        //verifying the token, if its valid it generates a new accessToken to give to the browser
        jwt.verify(refreshToken, refreshSecret, async (err: any, user: any) => {
            if (err) return res.status(403).json({ message: "There has been an error" })
            const userDb = await User.findOne({ email: user.email })
            const accessToken = generateToken(userDb?.toJSON())
            res.status(200).json({ accessToken: accessToken })
        })
    } catch (error) {
        console.log(`[GET-TOKEN] Error: ${error}`)
        res.status(400).json({ message: "There has been an error with saving the token" })
    }
}

export async function deleteToken(req: Request, res: Response) {
    try {
        //finding the requested token to delete and deleting it
        const token = await Token.deleteOne({ value: req.body.token })
        res.status(200).json({ message: "Deleted the token succesfully" })
    } catch (error) {
        console.log(`[DELETE-TOKEN] Error: ${error}`)
        res.status(400).json({ error: "There has been an error with deleting the tokens" })
    }
}

//generates an accessToken, lasting 600 seconds
function generateToken(user: any) {
    return jwt.sign(user, accessSecret, { expiresIn: '600s' })
}

export async function createHabit(req: AuthRequest, res: Response) {
    try {
        //creating the habit
        console.log('about to create the habit!');
        const userId = req.user!._id
        const habit = await Habit.create({
            user_id: userId,
            name: req.body.habit_name,
            type: req.body.type,
            goal: req.body.goal,
            unit: req.body.unit,
            created_at: new Date(Date.now())
        });
        res.status(200).json({ message: "Habit created succesfully" });
    } catch (error) {
        console.log(`[HABIT-CREATION] Error: ${error}`)
        res.status(400).json({ error: "There has been an error with creating the habit" });
    }
}

export async function habitValue(req: AuthRequest, res: Response) {
    try {
        //creating value associated to an habit via FK
        const today = new Date();
        const currentHabitValue = await HabitLogs.findOne({ habit_id: req.body.habit_id, date: new Date(today.setHours(0, 0, 0, 0)) });
        console.log(currentHabitValue);
        if (currentHabitValue == null || currentHabitValue == undefined) {
            const habitValue = await HabitLogs.create({
                habit_id: req.body.habit_id,
                value: req.body.value,
                date: new Date(today.setHours(0, 0, 0, 0))
            });
            return res.status(200).json({ message: "Habit value created succesfully" });
        }
        await HabitLogs.updateOne({habit_id: req.body.habit_id, date: new Date(today.setHours(0, 0, 0, 0))}, {
            $inc: {value: req.body.value}
        })
        res.status(200).json({message: "Habit value updated succesfully"});

    } catch (error) {
        console.log(`[HABIT-VALUE] Error: ${error}`)
        res.status(400).json({ error: "There has been an error with adding value to the habit" });
    }
}