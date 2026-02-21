import { useNavigate } from 'react-router-dom'
import dashboard from './assets/dashboard.svg'
import tasklist from './assets/tasklist.svg'
import calendar from './assets/calendar.svg'
import habits from './assets/habits.svg'
import analytics from './assets/analytics.svg'
import settings from './assets/settings.svg'

function Sidebar(){
    const navigate = useNavigate();

    function tasklistRoute(){
        navigate("/tasks");
    }

    function dashboardRoute(){
        navigate("/dashboard");
    }

    return (
        <aside id="sidebar">
            <button onClick={dashboardRoute}>
                <img src={dashboard} alt="dashboard logo" height={30}/>
            </button>
            <button onClick={tasklistRoute}>
                <img src={tasklist} alt="tasklist logo" height={30}/>
            </button>
            <button>
                <img src={calendar} alt="calendar logo" height={30}/>
            </button>
            <button>
                <img src={habits} alt="habits logo" height={30}/>
            </button>
            <button>
                <img src={analytics} alt="analytics logo" height={30}/>
            </button>
            <button>
                <img src={settings} alt="settings logo" height={30}/>
            </button>
        </aside>
    ) 
}

export default Sidebar