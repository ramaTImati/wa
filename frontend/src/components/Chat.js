import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { json, Link } from 'react-router-dom';

function Chat() {
    const [fetc, setFetc] = useState([]); 
    const [str, setStr] = useState('');
    const _name = sessionStorage.getItem('_name');
    const _token = sessionStorage.getItem('_token');

    useEffect(() => {
        getChat();
        setTimeout(() => { console.log(str); }, 10000);
    },[])

    const getChat = async () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${_token}`,
            }
        }
        const url = 'http://localhost:8000/api/v1/chats/history?id='+_name;
        try {
            await axios.get(url, config).then((json)=>{
                let coba = JSON.stringify(json.data.data[1].messages[0].message);
                // console.log(coba);
                setFetc(json.data.data);
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
                    {fetc.map((data)=>{
                        return (
                            <tr key={data.id}>
                                <Link to={`/conversation/${data.id}`}>
                                    <td>
                                        <b>{data.id.replace('@s.whatsapp.net', '')}</b><br/>
                                        {data.messages && data.messages.map((msg)=>{
                                            const string = JSON.stringify(msg.message);
                                            const pesan = JSON.parse(string);
                                            if (pesan.hasOwnProperty('message')) {
                                                const psn = pesan.message;
                                                if (psn.hasOwnProperty('extendedTextMessage')) {
                                                    return (
                                                        <pre>{psn.extendedTextMessage.text}</pre>
                                                    )
                                                }else{
                                                    return (
                                                        <pre>{psn.conversation}</pre>
                                                    )                                                
                                                }
                                            }else{
                                                return (
                                                    <pre>{pesan.messageStubType}</pre>
                                                )
                                            }
                                        })} 
                                    </td>
                                </Link>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Chat