import dashboard from './assets/dashboard.svg'
import tasklist from './assets/tasklist.svg'
import calendar from './assets/calendar.svg'
import habits from './assets/habits.svg'
import analytics from './assets/analytics.svg'
import settings from './assets/settings.svg'

function Sidebar(){
    return (
        <aside id="sidebar">
            <button>
                <img src={dashboard} alt="dashboard logo" height={30}/>
            </button>
            <button>
                <img src={tasklist} alt="dashboard logo" height={30}/>
            </button>
            <button>
                <img src={calendar} alt="dashboard logo" height={30}/>
            </button>
            <button>
                <img src={habits} alt="dashboard logo" height={30}/>
            </button>
            <button>
                <img src={analytics} alt="dashboard logo" height={30}/>
            </button>
            <button>
                <img src={settings} alt="dashboard logo" height={30}/>
            </button>
        </aside>
    ) 
}

export default Sidebar