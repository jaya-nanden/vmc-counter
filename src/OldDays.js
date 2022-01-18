import React, { useState, useEffect } from 'react'
import { useDatabase } from './context/DatabaseContext'

function OldDays({ date }) {

    const { foods } = useDatabase()

    const [reportDates, setReportDates] = useState([])

    const [noOfDays, setnoOfDays] = useState(0)

    useEffect(() => {
        // console.log(Object.keys(foods).length);
        setnoOfDays(Object.keys(foods).length)

        const keys = Object.keys(foods);
        // console.log(keys);
        setReportDates(keys)
    }, [foods])

    useEffect(() => {

        console.log(reportDates);

    }, [reportDates])



    return (
        <>
            {reportDates && reportDates.forEach(function (key, index) {
                const report = foods[key]
                console.log(report);

                return <div className="individual-card">
                    <h3 className="date">{report.date}</h3>


                    <p>Total: {report.totalCal}</p>
                    <div className="macros">
                        <p>P: {report.macros[0]} </p>
                        <p>C: {report.macros[0]} </p>
                        <p>F: {report.macros[0]} </p>
                    </div>
                </div>

            })
                
            }
        </>
    )
}

export default OldDays
