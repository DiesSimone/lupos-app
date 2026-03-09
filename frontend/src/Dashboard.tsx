import { getUsername, getTask } from "./ApiReqs";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { AuthContext } from './Contexts.js';
import { useContext } from 'react';

type Task = {
    _id: string,
    user_id: string,
    name: string,
    date: Date
}

function RenderTasks({ tasks }: any) {
    //mapping the task parameter, to create a list element for each task inside of the task array, the array will be a collection of lists
    const taskList = tasks.map((el: Task) => {
        return (
            <li key={el._id}>
                <input type="checkbox" />
                <p>{el.name}</p>
            </li>
        )
    });
    return <ul>{taskList}</ul>
}

function Dashboard() {
    //defining which context to use (the wrapper AuthContext)
    const context = useContext(AuthContext)
    const [name, setName] = useState('');
    const [tasks, setTasks] = useState([]);
    const {accessToken, setAccessToken, UpdateToken} = context!

    //when the page loads, executes everything inside useEffect()
    useEffect(() => {
        const getName = async () => {
            try {
                const username = await getUsername(accessToken, UpdateToken);
                setName(username);
            } catch (error) {
                console.log(`[GETNAME-ERROR] There has been an error with getting the name: ${error}`);
            }
        }
        getName();
    }, []);

    useEffect(() => {
            const fetchingTasks = async () => {
                try {
                    const data = await getTask(accessToken, UpdateToken);
    
                    //memorizing the fetched tasks into the tasks variable, will then be rendered with the RenderTask()
                    setTasks(data);
                } catch (error) {
                    console.log(`[TASKFETCHING-ERROR] There has been an error: ${error}`);
                }
            }
            fetchingTasks();
        }, []);

    return (
        <>
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome back, {name}</h1>
                <div className="dashboard-grid">
                    <div className="dashboard-tasks">
                        <RenderTasks tasks={tasks}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard