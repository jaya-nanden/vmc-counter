import React, { useState, useEffect }from 'react'

import { useDatabase } from './context/DatabaseContext'

import PresentDay from './PresentDay'
import PreviousDay from './PreviousDay'


function MainSection() {

    const [dateList, setDateList] = useState([])

    const { d, userDReport, reports } = useDatabase()

    
    useEffect(() => {
        const current = new Date();
        
        // don't consider present date
        let datesList = []
        const len = Object.keys(reports).length;
        for(let i = 1; i < len-1; i++) {
            const temp = `${current.getDate() - i}/${current.getMonth()+1}/${current.getFullYear()}`;
            datesList[i-1] = temp.toString().replaceAll("/", "-")
        }

        datesList.reverse()
        // console.log(datesList);
        // console.log(reports);

        setDateList(datesList)

    }, [reports])

    return (
        <div className="main-section">
            {/* Month */}

            {/* Individual Days */}
            {/* <OldDays date={date} /> */}
            {dateList.length !== 0 && dateList.map((date, ind) => {
                // console.log(date);
                return <PreviousDay key={ind} d={date} userDReport={reports[`${date}`]} />
            })}
            {/* <PreviousDay d={previousD} userDReport={reports[`${previousD}`]} /> */}
            <PresentDay d={d} userDReport={userDReport} />
        </div>
    )
}

export default MainSection
