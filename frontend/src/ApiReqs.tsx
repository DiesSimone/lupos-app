import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from './LevelContext';
const URL = import.meta.env.VITE_API_URL;

export async function postRegisterAxios(data: Object) {
    console.log(`${URL}/db/register`)
    //simple post request using axios
    const res = await axios.post(
        `${URL}/api/register`,
        {

            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    );
    return res.data;
}

export async function postLoginAxios(data: Object) {
    console.log(`${URL}/api/login`)
    const res = await axios.post(
        `${URL}/api/login`,
        // `http://localhost:5173/api/login`,
        {
            data,
            headers: {
                'Content-Type': 'application/json'
            },
        },
        {
            withCredentials: true,
        }
    );
    return res.data;
}

export async function postTask(data: Object, accessToken: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
    const res = await axios.post(
        // `${URL}/api/taskcreate`,
        // {
        //     data,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${accessToken}`
        //     }
        //     // headers
        // },
        // {
        //     withCredentials: true,
        // }
        `${URL}/api/taskcreate`,
        data, // <--- Secondo parametro: il CORPO della richiesta (senza header dentro!)
        {     // <--- Terzo parametro: la CONFIGURAZIONE
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        }
    );
    return res.data;
}

export async function getStatusAxios() {
    const res = await axios.get(
        `${URL}/api/status`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );
    return res.data;
}

export async function getUsername(accessToken: string) {
    const res = await axios.get(
        `${URL}/api/getname`,
        {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    console.log(res.data.username)
    return res.data.username;
}

export async function getTask(accessToken: string) {
    const res = await axios.get(
        `${URL}/api/gettasks`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        },
    );
    return res.data
}
