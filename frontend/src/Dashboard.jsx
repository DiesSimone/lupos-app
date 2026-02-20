import { getStatusAxios } from "./ApiReqs";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";

function Dashboard() {
    const [data, setData] = useState('');

    const getStatus = async () => {
        try {
            const getData = await getStatusAxios();
            setData(getData.data);
        } catch (error) {
            console.log(`[STATUS-ERROR] There has been an error with the status checker: ${error}`)
        }
    }

    return (
        <>
            <Sidebar />
            <div className="dashboard-content">
                <h1>Dashboard Page</h1>
                <button onClick={getStatus}>Check status</button>
            </div>
        </>
    )
}

export default Dashboard