import Sidebar from './Sidebar.jsx'
import { useState } from 'react'
import { postTask } from './ApiReqs.jsx'

function Tasks() {
    const [task, setTask] = useState('');

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