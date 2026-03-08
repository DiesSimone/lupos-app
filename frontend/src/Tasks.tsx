import Sidebar from './Sidebar.js'
import { useState, useEffect } from 'react'
import { postTask, getTask, deleteTask } from './ApiReqs.js'
import { AuthContext } from './AuthContext.js'
import { useContext } from 'react'

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
                <p>{el.name}</p>
                <button onClick={() => eraseTask(el._id)}>Dolete</button>
            </li>
        )
    });
    return <ul>{taskList}</ul>
}

async function eraseTask(taskId: string) {
    try {
        await deleteTask({ task_id: taskId });
    } catch (error) {
        console.log(`[TASK-ERROR] There has been an error with deleting the task: ${error}`)
    }
}

function Tasks() {
    //using the AuthContext to get the tokens
    const context = useContext(AuthContext);
    const [submit, checkSubmit] = useState(0);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const { accessToken, setAccessToken, UpdateToken } = context!;

    //memorizes the user's input of the new task
    function handleTask(e: React.ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value);
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
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
        //hook used just to trigger the useEffect below
        checkSubmit(submit + 1);
        setTask("")
        sendTaskAxios();
    }

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
    }, [submit]);

    return (
        <div className="tasks-wrapper" id="tasks-wrapper">
            <Sidebar />
            <div className="tasks-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleTask} required />
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