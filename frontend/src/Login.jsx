import { useState } from 'react'
import {Link} from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleMail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Email: ${email}, Password: ${password}`);
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