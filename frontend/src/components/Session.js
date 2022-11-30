import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

function Session() {
    const [name, setName] = useState('');
    const cookies = new Cookies();
    const token = cookies.get('_token');
    const [msg, setMsg] = useState('');
    const [Qr, setQr] = useState('');
    const [stat, setStat] = useState('not found');

    useEffect(() => {
        status();
    })
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    const gen = async () => {
        try {
            await axios.post('http://localhost:8000/api/v1/add', {
                id: name, 
                isLegacy: false,
            },config).then(response =>{
                // console.log(response.data);
                setMsg(response.data.message);
                setQr(response.data.data.qr);
                cookies.set('_name', name, {path:'/'});
                // status();
            });
        } catch (error) {
            console.log(error.data);
        }
    }

    const _name = cookies.get('_name');
    const url = 'http://localhost:8000/api/v1/status/'+_name;

    const status = async () => {
        try {
            await axios.get(url, config).then(response => {
                console.log(response);
                setStat(response.data.data.status);
            })
        } catch (error) {
            console.log(error.data);
        }
    }

    return (
        <div className='container mt-5'>
            <div className="columns">
                <div className="column">
                    <h4 className='is-size-4'>Create Session</h4>
                    <div className="field mt-5">
                        <label className="label">Name</label>
                        <div className="controls">
                            <input type="text" className="input" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={gen} className='button is-primary'>Generate Session</button>
                    <hr/>
                    <img src={Qr}/>
                </div>
                <div className="column">
                    <h5 className='is-size-5'>Session Status : {stat}</h5>
                </div>
            </div>
        </div>
    )
}

export default Session