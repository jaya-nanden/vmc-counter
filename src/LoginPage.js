import React, { useState, useRef, useEffect } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'

import { useAuth } from './context/AuthContext'

import './LoginPage.css'

function LoginPage() {

    const [loading, setloading] = useState(false)

    const emailRef = useRef(null)

    const { sendLink, showAlert } = useAuth()

    function handleSignIn(e) {
        e.preventDefault()
        // console.log(emailRef.current.value);
        sendLink(emailRef.current.value)
        emailRef.current.value = null
    }

    return (
        <div className='login-page'>
            <Form className='login-form' onSubmit={handleSignIn}>
                <h1>Vallalar Maiyam Calorie Counter</h1>
                <input type="email" ref={emailRef} required placeholder="example@gmail.com"></input>
                <Button type="submit" variant="primary">Send Link</Button>
                <p>Sign in link will be sent to this email for verification</p>
                <Alert  variant='success' show={showAlert}>Check email for link</Alert>
                <Alert  variant='seconday' show={showAlert}>You can close this tab now</Alert>
            </Form>
        </div>
    )
}

export default LoginPage
