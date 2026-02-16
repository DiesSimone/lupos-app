import axios from 'axios'

export async function postRegisterAxios(data){
    console.log(`${import.meta.env.VITE_API_URL}/db/register`)
    //simple post request using axios
    const res = await axios.post( 
        `${import.meta.env.VITE_API_URL}/db/register`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    );
    return res.data;
}

export async function postLoginAxios(data){
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/db/login`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    );
    return res.data
}