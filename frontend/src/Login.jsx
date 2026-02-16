import { useState } from 'react'
import {Link} from 'react-router-dom'
import {postLoginAxios} from './ApiReqs.jsx'

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");


    function handleMail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // alert(`Email: ${email}, Password: ${password}`);
        const postWithAxios = async () => {
            try {
                const postData = postLoginAxios({
                    email: email,
                    password: password,
                });
                setData(postData.data)
                console.log("Login submitted");
            } catch (error) {
                console.log(`[LOGIN-ERROR] There has been an error with the login: ${error}`)
            }
        }
        postWithAxios();
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="form-title">LUPOS APP</h1>
            <p className='form-ph'>Sign up into your account.</p>
            <input type="email" className="form-input" value={email} id="email" onChange={handleMail} placeholder='Enter your email'/><br />
            <input type="password" className="form-input" value={password} id="password" onChange={handlePassword} placeholder='Enter your password'/><br />
            <input type="submit" className="form-submit" id="submit" value="Login" />
            <label className="form-label">Not an user yet? <Link className="auth-link" to="/register">Click here</Link></label>
        </form>
    )
}

export default Login