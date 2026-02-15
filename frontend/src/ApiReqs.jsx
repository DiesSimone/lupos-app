import axios from 'axios'

export async function postRegisterAxios(data){
    //simple post request using axios
    const res = await axios.post( 
        `http://localhost:3000/db/register`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    );
    return res.data;
}