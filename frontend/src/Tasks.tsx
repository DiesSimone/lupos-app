import Sidebar from './Sidebar.js'
import { useState, useEffect } from 'react'
import { postTask, getTask } from './ApiReqs.js'
import { AuthContext } from './LevelContext.js'
import { useContext } from 'react'

type Task = {
    _id: string,
    user_id: string,
    name: string,
    date: Date
}

function RenderTasks({ tasks }: any) {
    const taskList = tasks.map((el: Task) => {
        return (
            <li key={el._id}>
                <p>{el.name}</p>
            </li>
        )
    });
    // console.log(taskList);
    return <ul>{taskList}</ul>
}

function Tasks() {
    const context = useContext(AuthContext)
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const {accessToken, setAccessToken} = context!

    function handleTask(e: React.ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value);
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        // console.log(task);
        const sendTaskAxios = async () => {
            try {
                const sendTask = await postTask({
                    taskName: task
                }, accessToken)
                console.log("Task sent");
            } catch (error) {
                console.log(`[TASK-ERROR] There has been an error with sending the task: ${error}`)
            }
        }
        sendTaskAxios();
    }

    useEffect(() => {
        const fetchingTasks = async () => {
            try {
                const data = await getTask(accessToken);
                // setTasks(data);
                console.log(data);
                setTasks(data);
                // console.log(tasks);
            } catch (error) {
                console.log(`[TASKFETCHING-ERROR] There has been an error: ${error}`);
            }
        }
        fetchingTasks();
    }, []);

    return (
        <div className="tasks-wrapper" id="tasks-wrapper">
            <Sidebar />
            <div className="tasks-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleTask} />
                    <input type="submit" name="submit" className="taskbtn" />
                </form>
                <div className="tasks-display">
                    <RenderTasks tasks={tasks} />
                </div>
            </div>
        </div>
    )
}

export default Tasks