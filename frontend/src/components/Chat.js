import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';

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
                console.log(response.data.data[1]);
                console.log('success');
                // console.log(fetc);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='container mt-5'>
            <h4 className='is-size-4'>Chat</h4>
            <table className='table'>
                {fetc.map(data=>(
                <tr key={data.id}>
                    <td>
                        <b>{data.id.replace('@s.whatsapp.net', '')}</b><br/>
                        {data.messages && data.messages.map(msg=>(
                            <p key={msg.message.key.id}>{msg.message.key.id}</p>
                        ))} 
                    </td>
                </tr>
                ))}
            </table>
            
        </div>
    )
}

export default Chat