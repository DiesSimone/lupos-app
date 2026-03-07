import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '../middlewares/middlewares'
import bcrypt from 'bcrypt'
import User from '../models/users'
import Task from '../models/tasks'
import Token from '../models/tokens'
import jwt from 'jsonwebtoken'
const accessSecret: string = process.env.ACCESS_TOKEN_SECRET!
const refreshSecret: string = process.env.REFRESH_TOKEN_SECRET!

export async function userCreation(req: Request, res: Response) {
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.data.password, 10);
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
        console.log(user)
        if (!user || user === null) {
            return res.status(401).json({ message: "User not found" });
        }
        if (await bcrypt.compare(req.body.data.password, user.password)) {
            // console.log("about to create the tokens")
            const accessToken = generateToken(user.toJSON())
            const refreshToken = jwt.sign(user.toJSON(), refreshSecret)
            // console.log("created the tokens")
            Token.create({
                value: refreshToken
            })
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
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
        console.log('getting the username!')
        const userId = await req.user!._id
        console.log(userId)
        const user = await User.findOne({ _id: userId })
        console.log(user);
        return res.json({ username: user!.username });
    } catch (error) {
        console.log(`There has been an error with getting the username ${error}`);
        return res.status(401).json({error: error})
    }
}

export async function createTask(req: AuthRequest, res: Response) {
    try {
        const userId = await req.user!._id
        console.log(userId)
        console.log(req.body)
        Task.create({
            user_id: userId,
            name: req.body.taskName,
            date: new Date(Date.now())
        });
        console.log("A task has been created");
        res.status(200).json({ message: "Task created succesfully" })
    } catch (error) {
        console.log(`There has been an error with creating the tasks ${error}`);
    }
}

export async function getTasks(req: AuthRequest, res: Response) {
    try {
        const userId = await req.user!._id
        const task = await Task.find({ user_id: userId });
        res.status(200).json(task);
    } catch (error) {
        console.log(`There has been an error with getting the tasks ${error}`);
        res.status(400).json({ error: "Failed to fetch tasks" })
    }
}

export async function getToken(req: Request, res: Response) {
    try {
        // console.log(req.headers)
        const refreshToken = req.headers.cookie?.split('=')[1]
        // console.log(`[REFRESH-TOKEN]: ${refreshToken}`)
        if (refreshToken == null) return res.status(401).json({ message: "Refresh token from request not found" })
        if (await Token.findOne({ value: refreshToken }) == null) return res.status(403).json({ message: "Refresh token from database not found" })
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
        const token = await Token.deleteOne({ value: req.body.token })
        console.log(`[DELETE-TOKEN] token: ${token}`)
        res.status(400).json({ message: "Deleted the token succesfully" })
    } catch (error) {
        console.log(`[DELETE-TOKEN] Error: ${error}`)
        res.status(400).json({ error: "There has been an error with deleting the tokens" })
    }
}

function generateToken(user: any) {
    return jwt.sign(user, accessSecret, { expiresIn: '25s' })
}

// module.exports = { userCreation, userLogging, sessionCheck, getUsername, createTask, getTasks }