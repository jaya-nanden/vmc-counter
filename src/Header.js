import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'

import { useAuth } from './context/AuthContext'
import { useDatabase } from './context/DatabaseContext'

import { FaUserAlt } from 'react-icons/fa';

import './Header.css'


function Header({ setShowModal, setDate }) {

    const { userSignOut } = useAuth()

    const { calGoal, d, dateList } = useDatabase() 
    
    return (
        <div className="header">
            <h1>Vallalar Maiyam Calorie Counter</h1>

            <div className="header-nav">
                <div className='date'>
                    <select className='date-selection' onChange={(e) => {
                        // console.log(e.target.value);
                        setDate(e.target.value)
                    }} >
                        <option value={d}>{d}</option>
                        {dateList.length !== 0 && dateList.map((item, ind) => {
                            // console.log(item);
                            return <option key={ind} value={item}>{item}</option>;
                        })}
                    </select>
                </div>
                
                <div>
                    <Dropdown  className='user' >
                        <Dropdown.Toggle bsPrefix="super-btn" id='my-dropdown-toggle'>
                            <FaUserAlt id='user-icon'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <div className='goal'>
                                    <p> Your Goal: {calGoal === -1 ? 0 : calGoal}</p>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className='drop-item'>
                                <Button onClick={setShowModal}>Change Goal</Button>
                            </Dropdown.Item>
                            <Dropdown.Item className='drop-item'>
                                <Button onClick={() => userSignOut()}>Sign out</Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* <UserTarget target={target} setTarget={setTarget} /> */}

            {/* <h2>Your Current Progress is : ABCD/{target}</h2> */}
            {/* <Button onClick={() => userSignOut()}>Sign out</Button> */}
        </div>
    )
}

export default Header
