import React, {useEffect, useState} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'universal-cookie';
import axios from 'axios';

function Conversation() {
    const cookies = new Cookies();
    const _name = cookies.get('_name');
    const _token = cookies.get('_token');
    const {num} = useParams();
    const [msg, setMsg] = useState([]);

    useEffect(()=>{
        conv();
    }, [])

    const conv = async() => {
        const url = 'http://localhost:8000/api/v1/chats/getmessage/'+num+'?id='+_name;
        const config = {
            headers: {
                "Authorization": `Bearer ${_token}`,
            }
        }
        try {
            await axios.get(url, config).then(response=>{
                // console.log(response.data);
                setMsg(response.data.data);
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='container mt-5'>
            <div className='columns'>
                <Link to={`/chat`} className='button is-primary mr-5'><FontAwesomeIcon icon="fa-solid fa-left" />Back</Link>
                <h4 className='is-size-4'>{num.replace('@s.whatsapp.net', '')} Chat's</h4>
            </div>
            <hr style={{
            color: '#000',
            backgroundColor: '#000',
        }}/>
            {/* <table className='table'> */}
                {msg.map((data)=>{
                    if(data.messageStubType != 'CALL_MISSED_VOICE'){
                        if(data.key.fromMe == false){
                            return (
                            <div className='columns' key={data.messageTimestamp}>
                                <div className='column'>
                                    <span className="tag is-primary is-large">{data.message.conversation}</span>
                                </div>
                                <div className='column'></div>
                            </div>
                            )
                        }else{
                            return (
                            <div className='columns' key={data.messageTimestamp}>
                                <div className='column'></div>
                                <div className='column'>
                                    <span className="tag is-primary is-pulled-right	is-large">{data.message.conversation}</span>
                                </div>
                            </div>
                            )
                        }
                    }
                })}
            {/* </table> */}
        </div>
    )
}

export default Conversation