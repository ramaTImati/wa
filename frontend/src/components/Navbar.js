import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const _token = sessionStorage.getItem('_token');
    const [stat, setStat] = useState('not found');
    const navigate = useNavigate();

    useEffect(() => {
        status();
    })
    
    const config = {
        headers: {
            "Authorization": `Bearer ${_token}`,
        }
    }
    
    const _name = sessionStorage.getItem('_name');
    
    const status = async () => {
        const url = 'http://localhost:8000/api/v1/status/'+_name;
        try {
            await axios.get(url, config).then(response => {
                // console.log(response);
                setStat(response.data.data.status);
            })
        } catch (error) {
            console.log(error.data);
        }
    }

    const logout = async () => {
        const delUrl = 'http://localhost:8000/api/v1/delete/'+_name;
        if (stat == 'not found') {
            sessionStorage.clear();
            navigate('/');
        }else{
            try {
                await axios.delete(delUrl, config).then(response => {
                    sessionStorage.clear();
                    navigate('/');
                })
            } catch (error) {
                
            }
        }
    }

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>
 
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/dashboard" className="navbar-item">
                            Home
                        </a>
                        <a href="/session" className="navbar-item">
                            Session
                        </a>
                        <a href="/chat" className="navbar-item">
                            Chat
                        </a>
                        <a href="/send" className="navbar-item">
                            Send
                        </a>
                    </div>
 
                    <div className="navbar-end">
                        <div className="navbar-item">
                            Status : {stat}
                        </div>
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar