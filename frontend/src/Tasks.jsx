import Sidebar from './Sidebar.jsx'

function Tasks(){
    return (
        <div className="tasks-wrapper" id="tasks-wrapper">
            <Sidebar />
            <div className="tasks-container">
                <form>
                    <input type="text" />
                    <input type="submit" name="submit"/>
                </form>
            </div>
        </div>
    )
}

export default Tasks