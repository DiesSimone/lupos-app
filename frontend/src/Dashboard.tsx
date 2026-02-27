import { getStatusAxios, getUsername } from "./ApiReqs";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.js";

function Dashboard() {
    const [data, setData] = useState('');
    const [name, setName] = useState('');

    const getStatus = async () => {
        try {
            const getData = await getStatusAxios();
            setData(getData);
        } catch (error) {
            console.log(`[STATUS-ERROR] There has been an error with the status checker: ${error}`);
        }
        console.log(data);
    }

    useEffect(() => {
        const getName = async () => {
            try {
                const username = await getUsername();
                setName(username);
            } catch (error) {
                console.log(`[GETNAME-ERROR] There has been an error with getting the name: ${error}`);
            }
            console.log("Fetching done");
            console.log(name);
        }
        getName();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome back, {name}</h1>
                <button onClick={getStatus}>Check status</button>
                <h3>PORCO BUTANO</h3>
            </div>
        </>
    )
}

export default Dashboard