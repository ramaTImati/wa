import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'universal-cookie';

function Send() {
    const [receiver, setReceiver] = useState();
    const [msg, setMsg] = useState();
    const _name = sessionStorage.getItem('_name');
    const _token = sessionStorage.getItem('_token');

    const body = {
        receiver: receiver, 
        message: {
            text: msg
        }
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${_token}`,
        }
    }

    const send = async () => {
        const url = 'http://localhost:8000/api/v1/chats/send?id='+_name;
        try {
            axios.post(url, body, config).then(response=>{
                console.log('success');
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='container mt-5'>
            <h4 className='is-size-4'>Send Message</h4>
            <div className="field mt-5">
                <label className="label">Receiver</label>
                <div className="controls">
                    <input type="text" className="input" onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver" />
                </div>

                <label className="label">Message</label>
                <div className="controls">
                    <input className="input" onChange={(e) => setMsg(e.target.value)} placeholder="Message" />
                </div>
                <button onClick={send} className='button is-primary mt-2'>Send</button>
            </div>
        </div>
    )
}

export default Send