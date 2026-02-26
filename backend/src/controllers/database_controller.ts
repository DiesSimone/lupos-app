import {Request, Response} from 'express'
// const User = require("../models/users.js");
// const Task = require("../models/tasks.js");
// const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt'
import User from '../models/users'
import Task from '../models/tasks'

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
        if (!user || user === null) {
            return res.status(401).json({ message: "User not found" });
        }
        if (await bcrypt.compare(req.body.data.password, user.password)) {
            req.session.userId = user._id.toString()
            console.log(`[USER-LOGGING] session id: ${req.sessionID}`);
            console.log(`[USER-LOGGING] session id: ${req.session.userId}`);
            req.session.save((err) => {
                if (err) {
                    console.log('There has been an error with the saving of the session');
                }
                console.log("Saving the session");
            })
            res.status(200).json({ message: `Successfully logged in as ${user.username}` });
            console.log(`${user.username} has succesfully logged in!`);
        } else {
            res.status(401).json({ message: "Not authorized" });
        }

    } catch (error) {
        console.log(`[USER-LOGGING] There has been an error: ${error}`);
        res.status(500).json({ error: "Couldn't login" });
    }
}

export async function sessionCheck(req: Request, res: Response) {
    try {
        console.log("checking....");
        console.log(`[SESSION-CHECK] session id: ${req.sessionID}`);
        console.log(req.session.userId);
        if (req.session.userId) {
            res.status(200).json({
                isLogged: true,
            });
            console.log("authorized");
        } else {
            res.status(401).json({
                isLogged: false
            });
            console.log("unauthorized");
        }
    } catch (error) {
        console.log(`There has been an error with checking the session ${error}`);
    }
}

export async function getUsername(req: Request, res: Response) {
    try {
        const userId = await req.session.userId
        const user = await User.findOne({ _id: userId })
        console.log(user);
        return res.json({ username: user!.username });
    } catch (error) {
        console.log(`There has been an error with getting the username ${error}`);
    }
}

export async function createTask(req: Request, res: Response){
    try {
        Task.create({
            user_id: req.session.userId,
            name: req.body.data.taskName,
            date: new Date(Date.now())
        });
        console.log("A task has been created");
        res.status(200).json({message: "Task created succesfully"})
    } catch (error) {
        console.log(`There has been an error with getting the tasks ${error}`);
    }
}

export async function getTasks(req: Request, res: Response) {
    try {
        console.log(req.session.userId)
        const task = await Task.find({user_id: req.session.userId});
        res.status(200).json(task);
    } catch (error) {
        console.log(`There has been an error with getting the tasks ${error}`);
        res.status(400).json({error: "Failed to fetch tasks"})
    }
}

// module.exports = { userCreation, userLogging, sessionCheck, getUsername, createTask, getTasks }