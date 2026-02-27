import { useState} from 'react'
import { Link } from 'react-router-dom'
import { postRegisterAxios } from './ApiReqs.js'

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");

    function handleName(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleMail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        // alert(`Name: ${name}, Email: ${email}, Password: ${password}`);

        const postWithAxios = async () => {
            try {
                const postData = await postRegisterAxios({
                    username: name,
                    email: email,
                    password: password
                });
                setData(postData.data);
                console.log("Registration completed!");
            } catch (error) {
                console.log('There has been an error: ' + error);
            }
        }
        postWithAxios();
    }

    return (
        <div className='formWrapper'>
            <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="form-title">LUPOS APP</h1>
            <p className="form-ph">Sign up today.</p>
            <input type="text" className="form-input" value={name} id="username" onChange={handleName} placeholder='Enter your username' /><br />
            <input type="email" className="form-input" value={email} id="email" onChange={handleMail} placeholder='Enter your email' /><br />
            <input type="password" className="form-input" value={password} id="password" onChange={handlePassword} placeholder='Enter your password' /><br />
            <input type="submit" className="form-submit" id="submit" value="Register" />
            <label className="form-label">Already an user? <Link className="auth-link" to="/login">Click here</Link></label>
        </form>
        </div>
    )
}

export default Register