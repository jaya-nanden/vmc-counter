import React, { useState, useRef, useEffect } from 'react';

import { Modal, Button, Spinner } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import PresentDay from './PresentDay';
import PreviousDay from './PreviousDay';

import { useDatabase } from './context/DatabaseContext';
import { useAuth } from './context/AuthContext';

import './Home.css'

function Home() {
    const [loading, setloading] = useState(true)

    const calGoalRef = useRef(0)

    const [showModal, setShowModal] = useState(false)
    
    const { calGoal, addUserGoal, d, reports } = useDatabase()

    const { status } = useAuth()

    const [date, setDate] = useState(d)

    function setGoal(e) {
        e.preventDefault()
        const temp = calGoalRef.current.value
        if(temp >= 500 && temp <= 5000) {
            addUserGoal(calGoalRef.current.value)
            setShowModal(false)
        } else {
            alert("Value should be b/w 500 to 5000")
        }

    }


    useEffect(() => {
        // console.log(calGoal);
        if(calGoal === -1) {
            // setTarget(calGoal)
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [calGoal])

    useEffect(() => {

        if(status === "error") {
            alert("Check for internet connection. Refresh the page")
            setloading(false)
        } else {
            
            setloading(true)
            function sleep (time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            }
            
            // Usage!
            sleep(500).then(() => {
                // Do something after the sleep!
                setloading(false)
                // console.log(reports);
            });
        }

    }, [date, reports, status])


    return (
        <div className='my-container'>
            
            <Header className="header" setShowModal={setShowModal} setDate={setDate} />
            <div className="main-section">
                
                <>
                {loading === false ? 
                    <>
                        {date === d
                            ?
                            <PresentDay date={date} report={reports[`${date}`]} />
                            :
                            <PreviousDay date={date} report={reports[`${date}`]} />
                        }
                    </>
                    : <Spinner id='spinner' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                </>

            </div>
            
           
        
            <Footer /> 
            
            {/* User Calorie Setting */}
            <Modal show={showModal}>
                <Modal.Header closeButton onClick={() => setShowModal(false)}>
                    <Modal.Title>Set Your Current Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h3>
                            Daily Calorie Intake: 
                        </h3>
                        <input style={{ width:'100px'}} className="items-num-input" min="0" ref={calGoalRef} type="number"></input>
                    </div>
                    <a href='https://www.calculator.net/calorie-calculator.html' target="_blank" rel="noreferrer">If you don't know, calculate here</a>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <div className='goal-modal'>
                        <Button  variant="primary" onClick={setGoal}>
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
