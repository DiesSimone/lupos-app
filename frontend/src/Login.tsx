import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postLoginAxios } from './ApiReqs.js'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dataLogin, setDataLogin] = useState("");
    const navigate = useNavigate();

    //React.ChangeEvent<HTMLInputElement> type, is for input elements

    function handleMail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        // alert(`Email: ${email}, Password: ${password}`);
        const postWithAxios = async () => {
            try {
                const postData = await postLoginAxios({
                    email: email,
                    password: password,
                });
                setDataLogin(postData.data)
                console.log("Login submitted");
            } catch (error) {
                console.log(`[LOGIN-ERROR] There has been an error with the login: ${error}`)
            }
        }
        postWithAxios().then(() => {
            navigate('/dashboard')
        })
    }

    return (
        <div className="formWrapper">
            <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="form-title">LUPOS APP</h1>
            <p className='form-ph'>Sign up into your account.</p>
            <input type="email" className="form-input" value={email} id="email" onChange={handleMail} placeholder='Enter your email' /><br />
            <input type="password" className="form-input" value={password} id="password" onChange={handlePassword} placeholder='Enter your password' /><br />
            <input type="submit" className="form-submit" id="submit" value="Login" />
            <label className="form-label">Not an user yet? <Link className="auth-link" to="/register">Click here</Link></label>
        </form>
        </div>
    )
}

export default Login