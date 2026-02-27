import axios from 'axios'
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

export async function postTask(data: Object){
    const res = await axios.post(
        `${URL}/api/taskcreate`,
        {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        },
        {
            withCredentials: true,
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

export async function getUsername(){
    const res = await axios.get(
        `${URL}/api/getname`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res.data.username;
}

export async function getTask(){
    const res = await axios.get(
        `${URL}/api/gettasks`,
        {
            withCredentials: true,
            headers: {
                'Content-Type' : 'application/json'
            }
        },
    );
    return res.data
}
