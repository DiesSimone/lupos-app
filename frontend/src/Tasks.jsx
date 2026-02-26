import Sidebar from './Sidebar.jsx'
import { useState, useEffect } from 'react'
import { postTask, getTask } from './ApiReqs.jsx'

function RenderTasks({ tasks }) {
    const taskList = tasks.map((el) => {
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
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    function handleTask(e) {
        setTask(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(task);
        const sendTaskAxios = async () => {
            try {
                const sendTask = await postTask({
                    taskName: task
                })
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
                const data = await getTask();
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