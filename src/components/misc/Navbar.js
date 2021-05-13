import Axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import './Navbar.scss';

function Navbar(){

    const { user, getUser } = useContext(UserContext);

    async function logout(){
        await Axios.get("http://localhost:5000/auth/logOut");

        await getUser();
    }

    return(
        <div className="navbar">
            <Link to="/">
            <h1>Snippet Manager</h1>
            </Link>
            {user === null ? (
                <Link to="/register"><button>Sign Up</button></Link>
            ) : (
                <button onClick={logout}>Logout</button>
            )
            }
        </div>
    )
}

export default Navbar;