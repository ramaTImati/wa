import axios from 'axios';
import React, { useState } from 'react'

function Session() {
    const [name, setName] = useState('');

    const gen = async () => {
        axios.post('http://localhost:8000/api/v1/add', {
            headers: {"Authorization" : `Bearer ${token.state}`},
            name: name,
            isLegacy: false,
        })
    }

    return (
        <div className='container mt-5'>
            <div class="columns">
                <div class="column">
                    <h4 className='is-size-4'>Create Session</h4>
                    <form>
                        <div className="field mt-5">
                            <label className="label">Name</label>
                            <div className="controls">
                                <input type="text" className="input" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' className='button is-primary'>Generate Session</button>
                    </form>
                </div>
                <div class="column">
                    Second column
                </div>
            </div>
        </div>
    )
}

export default Session