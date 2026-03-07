import axios from 'axios'
import { AuthProvider } from './AuthContext';
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
    const res = await axios.post(
        `${URL}/api/taskcreate`,
        data,
        {
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

export async function getUsername(accessToken: string, UpdateToken?: (newToken: string) => void) {
    try {
        const res = await axios.get(
            `${URL}/api/getname`,
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
        console.log(res.data)
        console.log(res.status)
        return res.data.username;
    } catch (error: any) {
        console.log("You stupid gooner")
        console.log(error.toJSON().status)
        if (error.toJSON().status == 401 || error.toJSON().status == 403) {
            const resToken = await axios.post(
                `${URL}/api/token`,
                {

                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const newAccessToken = resToken.data.accessToken
            console.log(newAccessToken)
            if (UpdateToken) {
                UpdateToken(newAccessToken)
            }
            const res = await axios.get(
                `${URL}/api/getname`,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${newAccessToken}`
                    }
                }
            )
            return res.data.username
        }
    }
}

export async function getTask(accessToken: string, UpdateToken?: (newToken: string) => void) {
    try {
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
    } catch (error: any) {
        console.log(error.toJSON().status)
        if (error.toJSON().status == 401 || error.toJSON().status == 403) {
            const resToken = await axios.post(
                `${URL}/api/token`,
                {

                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const newAccessToken = resToken.data.accessToken
            console.log(newAccessToken)
            if (UpdateToken) {
                UpdateToken(newAccessToken)
            }
            const res = await axios.get(
                `${URL}/api/gettasks`,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${newAccessToken}`
                    }
                }
            )
            return res.data
        }
    }
}
