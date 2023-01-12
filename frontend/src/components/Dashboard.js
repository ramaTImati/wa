import React, { useState, useEffect } from 'react'
import axios from "axios";

function Dashboard() {
    const _token = sessionStorage.getItem('_token');
    const [name, setName] = useState('');

    useEffect(() => {
        user();
    })

    const user = async () => {
        try {
            await axios.get('http://localhost:8000/api/users/getMe', {
                headers: {"Authorization": `Bearer ${_token}`}
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