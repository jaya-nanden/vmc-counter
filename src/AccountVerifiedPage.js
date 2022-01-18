import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

import './LoginPage.css'

function AccountVerifiedPage() {

    // useEffect(() => {
    //     // sleep time expects milliseconds
    //     function sleep (time) {
    //         return new Promise((resolve) => setTimeout(resolve, time));
    //     }
        
    //     // Usage!
    //     sleep(5000).then(() => {
    //         // Do something after the sleep!
    //     });
    // }, [])

    return (
        <div className='verification'>
            <h1>    
                Your Account has been verified.
            </h1>
            <p>Please wait for redirection or refresh</p>
            {/* <Button>
                <a  className='website-button' href='https://vmc-counter.web.app'>Head to Website</a>
            </Button> */}
        </div>
    )
}

export default AccountVerifiedPage