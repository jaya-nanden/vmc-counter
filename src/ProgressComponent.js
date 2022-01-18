import React from 'react'


import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'

function ProgressComponent({ value, maxValue }) {


    return (
        <>
            {/* <CircularProgressbar 
                value={value} 
                minValue={0} 
                maxValue={maxValue}  
                styles={buildStyles({
                textColor: "red",
                pathColor: "turquoise",
                trailColor: "gold"
                })}
            /> */}

            <div className='progress-tracker'>
                <CircularProgressbarWithChildren value={value} minValue={0} maxValue={maxValue}>
                    {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                    {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                    <div style={{ fontSize: 12, marginTop: -5 }}>
                        <strong>{value}/{maxValue}</strong>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        </>
    )
}

export default ProgressComponent
