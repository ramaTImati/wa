import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Dashboard() {
    const token = useLocation();
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const cookies = new Cookies();
    cookies.set('_token', token.state, {path:'/'});

    useEffect(() => {
        user();
    })

    const user = async () => {
        try {
            await axios.get('http://localhost:8000/api/users/getMe', {
                headers: {"Authorization": `Bearer ${token.state}`}
            }).then(response=>{
                setName(response.data.data.username);
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            }
        }
    }


    return (
        <div className='container'>
            <h1>Welcome { name }</h1>
        </div>
    )
}

export default Dashboard