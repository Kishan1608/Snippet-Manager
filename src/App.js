import React from 'react';
import Axios from 'axios';
import Router from './Router';
import './style/index.scss';
import { UserContextProvider } from './context/userContext';

Axios.defaults.withCredentials = true;

function App(){
    return<>
    <UserContextProvider>
        <div className="container">
            <Router />
        </div>
    </UserContextProvider>
    </>
}

export default App;