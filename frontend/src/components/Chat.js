import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';

function Chat() {
    const [data, setData] = useState(''); 
    const cookies = new Cookies();
    const _name = cookies.get('_name');
    const _token = cookies.get('_token');

    useEffect(() => {
        // getChat();
    })

    const getChat = async () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${_token}`,
            }
        }
        const url = 'http://localhost:8000/api/v1/chats/history?id='+_name;
        try {
            await axios.get(url, config).then(response=>{
                console.log(response)
                console.log('success')
                setData(response.data.data);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='container mt-5'>
            <h4 className='is-size-4'>Chat</h4>
            <table className='table'>
                <tr>
                    <td>
                        08565 <br/>
                        pesan
                    </td>
                </tr>
            </table>
            
        </div>
    )
}

export default Chat