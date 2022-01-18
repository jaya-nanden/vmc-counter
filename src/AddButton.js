import React from 'react'

// or less ideally
import { Button } from 'react-bootstrap';

function AddButton({ setShowModal }) {
    return (
        <div className="add-button-section">
            <Button onClick={ () => setShowModal(true)}>+</Button>
        </div>
    )
}

export default AddButton
