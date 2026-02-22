import Sidebar from './Sidebar.jsx'
import { useState, useEffect } from 'react'
import { postTask, getTask } from './ApiReqs.jsx'

function Tasks() {
    const [task, setTask] = useState('');
    // const [tasks, setTasks] = useState('');
    let taskArray;

    function handleTask(e) {
        setTask(e.target.value)
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
                taskArray = data;
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

                </div>
            </div>
        </div>
    )
}

export default Tasks