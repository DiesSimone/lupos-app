import Sidebar from './Sidebar.js'
import { useState, useEffect } from 'react'
import { postTask, getTask, deleteTask, checkTask } from './ApiReqs.js'
import { AuthContext, RenderContext } from './Contexts.js'
import { useContext } from 'react'
import submitLogo from './assets/submit.svg'
import trashcan from './assets/trashcan.svg'

type Task = {
    _id: string,
    user_id: string,
    name: string,
    completed: boolean,
    date: Date
}

function TaskItem({ task, eraseTask }: any) {
    const [isChecked, setIsChecked] = useState(task.completed);

    function checkHandler() {
        setIsChecked(!isChecked);
        checkTask({
            "task_id": task._id
        });
    }

    return (
        <li key={task._id}>
            <input type="checkbox" checked={isChecked} onChange={checkHandler} />
            <p>{task.name}</p>
            <button onClick={() => eraseTask(task._id)}><img src={trashcan} alt="delete logo" /></button>
        </li>
    )
}

function RenderTasks({ tasks, eraseTask }: any) {

    //mapping the task parameter, to create a list element for each task inside of the task array, the array will be a collection of lists
    const taskList = tasks.map((el: Task) => {
        return (
            <TaskItem key={el._id} task={el} eraseTask={eraseTask} />
        )
    });
    return <ul>{taskList}</ul>
}

function Tasks() {
    //using the AuthContext to get the tokens
    const authContext = useContext(AuthContext);
    const renderContext = useContext(RenderContext);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const { accessToken, setAccessToken, UpdateToken } = authContext!;
    const { render, checkRender } = renderContext!

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
        checkRender(render + 1);
        console.log(render);
        setTask("")
        sendTaskAxios();
    }

    async function eraseTask(taskId: string) {
        try {
            await deleteTask({ task_id: taskId });
            checkRender(render + 1);
        } catch (error) {
            console.log(`[TASK-ERROR] There has been an error with deleting the task: ${error}`)
        }
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
    }, [render]);

    return (
        <div className="tasks-wrapper" id="tasks-wrapper">
            <Sidebar />
            <div className="tasks-container">
                <h1>Today's Tasks</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleTask} required placeholder='Enter your new task here' />
                    <input type="image" src={submitLogo} alt="submit-img" name="submit" className="taskbtn" />
                </form>
                <div className="tasks-display">
                    <RenderTasks tasks={tasks} eraseTask={eraseTask} />
                </div>
            </div>
        </div>
    )
}

export default Tasks