import Axios from "axios";
import React, { useContext, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import UserContext from "../../context/userContext";
import ErrorMessage from "../misc/ErrorMessage";
import './AuthForm.scss';

function Login(){
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [errormessage, setErrorMessage] = useState(null);

    const {getUser} = useContext(UserContext);

    const history = useHistory();

    async function login(e){
        e.preventDefault();

        const loginData = {
            email: formEmail,
            password: formPassword,
        };
        try{
            await Axios.post("http://localhost:5000/auth/login", loginData);
        }catch(err){
            if(err.response){
                if(err.response.data.errormessage){
                    setErrorMessage(err.response.data.errormessage);
                }
            }
            return
        }

        await getUser();

        history.push("/");
    }

    return <div className="auth-form">
        <h2>Login</h2>
        {
            errormessage && <ErrorMessage message={errormessage} clear={() => setErrorMessage(null)}/>
        }
        <form className="form" onSubmit={login}>
            <label htmlFor="form-email">Email</label>
            <input 
                id="form-email"
                type="email" 
                value={formEmail} 
                onChange={(e) => setFormEmail(e.target.value)}
            />

            <label htmlFor="form-password">Password</label>
            <input 
                id="form-password"
                type="password" 
                value={formPassword} 
                onChange={(e) => setFormPassword(e.target.value)}
            />

            <button className="btn-submit" type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
    </div>
}

export default Login;