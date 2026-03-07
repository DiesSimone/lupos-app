import { getUsername } from "./ApiReqs";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { AuthContext } from './AuthContext.js';
import { useContext } from 'react';

function Dashboard() {
    //defining which context to use (the wrapper AuthContext)
    const context = useContext(AuthContext)
    const [name, setName] = useState('');
    const {accessToken, setAccessToken, UpdateToken} = context!

    //when the page loads, executes everything inside useEffect()
    useEffect(() => {
        const getName = async () => {
            try {
                const username = await getUsername(accessToken, UpdateToken);
                setName(username);
            } catch (error) {
                console.log(`[GETNAME-ERROR] There has been an error with getting the name: ${error}`);
            }
        }
        getName();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome back, {name}</h1>
                <h3>PORCO BUTANO</h3>
            </div>
        </>
    )
}

export default Dashboard