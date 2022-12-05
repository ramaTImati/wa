import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

function Navbar() {
    const cookies = new Cookies();
    const token = cookies.get('_token');
    const [stat, setStat] = useState('not found');

    useEffect(() => {
        status();
    })
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    const _name = cookies.get('_name');
    const url = 'http://localhost:8000/api/v1/status/'+_name;

    const status = async () => {
        try {
            await axios.get(url, config).then(response => {
                // console.log(response);
                setStat(response.data.data.status);
            })
        } catch (error) {
            console.log(error.data);
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
                        <a href="/" className="navbar-item">
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
                                <button className="button is-light">
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