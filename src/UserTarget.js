import React, { useRef } from 'react'

function UserTarget({ target, setTarget }) {

    const targetRef = useRef(target);

    return (
        <div>
            My Target: {target}

            <input ref={targetRef} type="number"></input>
            <button onClick={() => {

                const temp = targetRef.current.value
                if(temp > 3000 || temp < 1000) {
                    alert('Should be greater than 1000 and not more than 5000');
                } else {
                    setTarget(temp)
                    targetRef.current.value = 0
                }
            }}>Save</button>
        </div>
    )
}

export default UserTarget
