import Axios from "axios";
import React, { useContext, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import UserContext from "../../context/userContext";
import './AuthForm.scss';

function Register(){
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formPasswordVerify, setFormPasswordVerify] = useState("");

    const {getUser} = useContext(UserContext);

    const history = useHistory();

    async function register(e){
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword,
            passwordVerify: formPasswordVerify,
        };

        await Axios.post("http://localhost:5000/auth/", registerData);

        await getUser();

        history.push("/");
    }

    return <div className="auth-form">
        <h2>Register a new account</h2>
        <form className="form" onSubmit={register}>
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

            <label htmlFor="form-passVerify">Verify Password</label>
            <input 
                id="form-passVerify"
                type="password" 
                value={formPasswordVerify} 
                onChange={(e) => setFormPasswordVerify(e.target.value)}
            />

            <button className="btn-submit" type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
}

export default Register;