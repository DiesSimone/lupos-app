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

export async function postTask(data: Object, accessToken: string, UpdateToken?: (newToken: string) => void) {
    try {
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
    } catch (error: any) {
        //checks if error is about unauthorization (invalid token)
        if (error.toJSON().status == 401 || error.toJSON().status == 403) {
            const resToken = await axios.post(
                `${URL}/api/token`,
                {
                    //data payload
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const newAccessToken = resToken.data.accessToken
            if (UpdateToken) {
                UpdateToken(newAccessToken)
            }
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
    }
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
        //checks if the error is about unauthorization (invalid token)
        if (error.toJSON().status == 401 || error.toJSON().status == 403) {

            //getting a new accessToken
            const resToken = await axios.post(
                `${URL}/api/token`,
                {
                    //data payload
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const newAccessToken = resToken.data.accessToken

            //memorizes the new token, only if the method UpdateToken is passed into the function
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

        //checks if error is about unauthorization (invalid token)
        if (error.toJSON().status == 401 || error.toJSON().status == 403) {
            const resToken = await axios.post(
                `${URL}/api/token`,
                {
                    //data payload
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const newAccessToken = resToken.data.accessToken
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

export async function deleteTask(data: Object){
    try {
        console.log('sending req to delete task');
        console.log(data);
        const res = await axios.post(
            `${URL}/api/deletetask`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error: any) {
        console.log(`There has been an error with deleting the task: ${error}`);
    }
}

export async function checkTask(data: Object){
    try {
        const res = await axios.post(
            `${URL}/api/checktask`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error: any) {
        console.log(`There has been an error with checking the task: ${error}`);
    }
}
