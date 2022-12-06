import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

function Chat() {
    const [fetc, setFetc] = useState([]); 
    const cookies = new Cookies();
    const _name = cookies.get('_name');
    const _token = cookies.get('_token');

    useEffect(() => {
        getChat();
        setTimeout(() => { console.log(fetc); }, 10000);
    },[])

    const getChat = async () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${_token}`,
            }
        }
        const url = 'http://localhost:8000/api/v1/chats/history?id='+_name;
        try {
            await axios.get(url, config).then(response=>{
                setFetc(response.data.data);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='container mt-5'>
            <h4 className='is-size-4'>Chat</h4>
            <hr style={{
            color: '#000',
            backgroundColor: '#000',
        }}/>
            <table className='table is-fullwidth is-hoverable'>
                <tbody>
                    {fetc.map(data=>(
                    <tr key={data.id}>
                        <Link to={`/conversation/${data.id}`}>
                            <td>
                                <b>{data.id.replace('@s.whatsapp.net', '')}</b><br/>
                                {data.messages && data.messages.map(msg=>(
                                    <p key={msg.message.key.id}>{msg.message.messageTimestamp}</p>
                                ))} 
                            </td>
                        </Link>
                    </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Chat