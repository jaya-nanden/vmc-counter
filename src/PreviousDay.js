import React, { useState, useEffect } from 'react'

import AddButton from './AddButton';

import { Modal, Button } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

import './SingleDay.css'

import { useDatabase } from './context/DatabaseContext'
import ProgressComponent from './ProgressComponent';


function PreviousDay({ date, report }) {

    const [toEat, setToEat] = useState(0)
    const [motiText, setMotiText] = useState("Let's Go !")

    const [data, setData] = useState({})

    const [breakfastList, setBreakfastList] = useState([])
    const [breakfastCount, setBreakfastCount] = useState([])
    const [breakfastCal, setBreakfastCal] = useState({
        'total-cal': 0,
        'total-p': 0,
        'total-c': 0,
        'total-f': 0,
    })

    const [lunchList, setLunchList] = useState([])
    const [lunchCount, setLunchCount] = useState([])
    const [lunchCal, setLunchCal] = useState({
        'total-cal': 0,
        'total-p': 0,
        'total-c': 0,
        'total-f': 0,
    })

    const [dinnerList, setDinnerList] = useState([])
    const [dinnerCount, setDinnerCount] = useState([])
    const [dinnerCal, setDinnerCal] = useState({
        'total-cal': 0,
        'total-p': 0,
        'total-c': 0,
        'total-f': 0,
    })

    // Total State
    const [calcul, setCalcul] = useState({
        'total-cal': 0,
        'total-p': 0,
        'total-c': 0,
        'total-f': 0,
    })

    const { todayFood, addTodayReport, calGoal, d } = useDatabase()

    function saveChanges() {
        
        const report = {
            'breakfastList': breakfastList,
            'breakfastCount': breakfastCount,
            'breakfastCal': breakfastCal,

            'lunchList': lunchList,
            'lunchCount': lunchCount,
            'lunchCal': lunchCal,

            'dinnerList': dinnerList,
            'dinnerCount': dinnerCount,
            'dinnerCal': dinnerCal,
            
            'calcul': calcul,
            'food': data
        } 
        // Insertion into database
        addTodayReport(report, date)
        window.location.reload()
    }

    // Breakfast
    useEffect(() => {

        let temp_cal_list = []
        let temp_p_list = []
        let temp_c_list = []
        let temp_f_list = []

        for(let i = 0; i < breakfastList.length; i++) {
            const count = breakfastCount[i]
            temp_cal_list[i] = (count * breakfastList[i].cal)
            temp_p_list[i] = (count * breakfastList[i].protein)
            temp_c_list[i] = (count * breakfastList[i].carb)
            temp_f_list[i] = (count * breakfastList[i].fat)
        }

        let sumCal = 0
        let sumP = 0
        let sumC = 0
        let sumF = 0
        for(let i = 0; i < temp_cal_list.length; i++) {
            sumCal += temp_cal_list[i]
            sumP += temp_p_list[i]
            sumC += temp_c_list[i]
            sumF += temp_f_list[i]
        }

        var temp_calculation = Object.assign({}, breakfastCal)
        temp_calculation['total-cal'] = sumCal
        temp_calculation['total-p'] = sumP
        temp_calculation['total-c'] = sumC
        temp_calculation['total-f'] = sumF

        // console.log(temp_calculation);
        // console.log(breakfastList);
        // console.log(breakfastCount);
        setBreakfastCal(temp_calculation)
    }, [breakfastCount])

    // Lunch
    useEffect(() => {
        
        let temp_cal_list = []
        let temp_p_list = []
        let temp_c_list = []
        let temp_f_list = []

        for(let i = 0; i < lunchList.length; i++) {
            const count = lunchCount[i]
            temp_cal_list[i] = (count * lunchList[i].cal)
            temp_p_list[i] = (count * lunchList[i].protein)
            temp_c_list[i] = (count * lunchList[i].carb)
            temp_f_list[i] = (count * lunchList[i].fat)
        }

        let sumCal = 0
        let sumP = 0
        let sumC = 0
        let sumF = 0
        for(let i = 0; i < temp_cal_list.length; i++) {
            sumCal += temp_cal_list[i]
            sumP += temp_p_list[i]
            sumC += temp_c_list[i]
            sumF += temp_f_list[i]
        }

        var temp_calculation = Object.assign({}, lunchCal)
        temp_calculation['total-cal'] = sumCal
        temp_calculation['total-p'] = sumP
        temp_calculation['total-c'] = sumC
        temp_calculation['total-f'] = sumF

        // console.log(temp_calculation);
        // console.log(breakfastList);
        // console.log(breakfastCount);
        setLunchCal(temp_calculation)
    }, [lunchCount])

    // Dinner
    useEffect(() => {

        let temp_cal_list = []
        let temp_p_list = []
        let temp_c_list = []
        let temp_f_list = []

        for(let i = 0; i < dinnerList.length; i++) {
            const count = dinnerCount[i]
            temp_cal_list[i] = (count * dinnerList[i].cal)
            temp_p_list[i] = (count * dinnerList[i].protein)
            temp_c_list[i] = (count * dinnerList[i].carb)
            temp_f_list[i] = (count * dinnerList[i].fat)
        }

        let sumCal = 0
        let sumP = 0
        let sumC = 0
        let sumF = 0
        for(let i = 0; i < temp_cal_list.length; i++) {
            sumCal += temp_cal_list[i]
            sumP += temp_p_list[i]
            sumC += temp_c_list[i]
            sumF += temp_f_list[i]
        }

        var temp_calculation = Object.assign({}, dinnerCal)
        temp_calculation['total-cal'] = sumCal
        temp_calculation['total-p'] = sumP
        temp_calculation['total-c'] = sumC
        temp_calculation['total-f'] = sumF

        // console.log(temp_calculation);
        // console.log(breakfastList);
        // console.log(breakfastCount);
        setDinnerCal(temp_calculation)
    }, [dinnerCount])

    // Total Calculation
    useEffect(() => {
        // console.log(breakfastCal);
        // console.log(lunchCal);
        // console.log(dinnerCal);

        let sumCal = breakfastCal['total-cal'] + lunchCal['total-cal'] + dinnerCal['total-cal']
        let sumP = breakfastCal['total-p'] + lunchCal['total-p'] + dinnerCal['total-p']
        let sumC = breakfastCal['total-c'] + lunchCal['total-c'] + dinnerCal['total-c']
        let sumF = breakfastCal['total-f'] + lunchCal['total-f'] + dinnerCal['total-f']

        var temp_calculation = Object.assign({}, calcul)
        temp_calculation['total-cal'] = sumCal
        temp_calculation['total-p'] = sumP
        temp_calculation['total-c'] = sumC
        temp_calculation['total-f'] = sumF

        setCalcul(temp_calculation)

    }, [breakfastCal, lunchCal, dinnerCal])

    // Creating individual session foodlist and countlist
    useEffect(() => {

        // console.log(data);
        // if(Object.keys(data).length === 0) {
        //     if(data.hasOwnProperty('breakfast')) {
        //         // console.log(data['breakfast']);
        //         const temp = data['breakfast']['food']
        //         const l = Object.keys(temp).length
        //         // console.log(l);
        //         // console.log(temp);
    
        //         let temp_breakfastList = []
        //         let temp_count = []
        //         for (let i = 0; i < l-1; i++) {
        //             temp_breakfastList[i] = temp[i.toString()]
        //             temp_count[i] = 0
        //         }
    
        //         // console.log(temp_breakfastList);
        //         setBreakfastList(temp_breakfastList)
        //         setBreakfastCount(temp_count)
        //     } 
    
        //     if(data.hasOwnProperty('lunch')) {
        //         // console.log(data['breakfast']);
        //         const temp = data['lunch']['food']
        //         const l = Object.keys(temp).length
        //         // console.log(l);
        //         // console.log(temp);
    
        //         let temp_lunchList = []
        //         let temp_count = []
        //         for (let i = 0; i < l-1; i++) {
        //             temp_lunchList[i] = temp[i.toString()]
        //             temp_count[i] = 0
        //         }
    
        //         // console.log(temp_breakfastList);
        //         setLunchList(temp_lunchList)
        //         setLunchCount(temp_count)
        //     }
    
        //     if(data.hasOwnProperty('dinner')) {
        //         // console.log(data['breakfast']);
        //         const temp = data['dinner']['food']
        //         const l = Object.keys(temp).length
        //         // console.log(l);
        //         // console.log(temp);
    
        //         let temp_dinnerList = []
        //         let temp_count = []
        //         for (let i = 0; i < l-1; i++) {
        //             temp_dinnerList[i] = temp[i.toString()]
        //             temp_count[i] = 0
        //         }
    
        //         // console.log(temp_breakfastList);
        //         setDinnerList(temp_dinnerList)
        //         setDinnerCount(temp_count)
        //     }
        // }
    }, [data])

    // Main UseEffect for data
    useEffect(() => {
        // If already data exists in database
        // console.log(userDReport);
        // console.log(todayFood[d]);

        if(report) {

            if(report.hasOwnProperty('food')) {
                // console.log('yes')
                setData(report.food)
                            
                const temp = {
                    'total-cal': 0,
                    'total-p': 0,
                    'total-c': 0,
                    'total-f': 0,
                }
                setBreakfastList(report.breakfastList ? report.breakfastList : [])
                setBreakfastCount(report.breakfastCount ? report.breakfastCount : [])
                setBreakfastCal(report.breakfastCal ? report.breakfastCal : temp)
    
                setLunchList(report.lunchList ? report.lunchList : [])
                setLunchCount(report.lunchCount ? report.lunchCount : [])
                setLunchCal(report.lunchCal ? report.lunchCal : temp)
    
                setDinnerList(report.dinnerList ? report.dinnerList : [])
                setDinnerCount(report.dinnerCount ? report.dinnerCount : [])
                setDinnerCal(report.dinnerCount ? report.dinnerCount : temp)
    
                setCalcul(report.calcul)
            } 
            
        }

        // setCalcul() // get and set from old user data
    }, [report, todayFood, date])

    useEffect(() => {
        const eaten = calcul['total-cal']
        const toEat = calGoal - eaten
        setToEat(toEat)

        if(eaten < calGoal/2) {
            setMotiText("Let's get healthier by eating ")
        } else if(eaten === calGoal) {
            setMotiText("Good Job !")
        } else if(eaten > calGoal - 250 && eaten < calGoal) {
            setMotiText("Close To Daily Goal ! Let's Go")
        } else if(eaten > calGoal){
            setMotiText("Daily Goal Completed !")
        } else {
            setMotiText("Let's Go !")
        }


    }, [calcul, calGoal])

    return (
        <>
        {calcul !== null && 
            <div id="day-container">
                <div className='calculation-card'>
                    <h3>{motiText}</h3>
                    {toEat > 0 && <h3>{toEat} calories to go!!!</h3> }
                    <div id='progress-tracker'>
                        <ProgressComponent value={calcul['total-cal'] ? calcul['total-cal'] : 0} maxValue={calGoal} />
                    </div>
                    <h5>Macros Taken</h5>
                    <div className="macros">
                        <div className="macro">
                            <p>Proteins:</p>
                            <p>{calcul['total-p']} gms</p>
                        </div>
                        <div className="macro">
                            <p>Carbs:</p>
                            <p>{calcul['total-c']} gms</p>
                        </div>
                        <div className="macro">
                            <p>Fats:</p>
                            <p>{calcul['total-f']} gms</p>
                        </div>
                    </div>
                </div>

                <div className='food-item-card'>
                    {/* Breakfast */}
                    <h3>Breakfast</h3>
                    {breakfastList.length !== 0 
                    ? <>
                        {breakfastList.map((item, ind) => {
                            return <div className="single-item" key={item.id}>
                                        <div className="food">
                                            <h4>{ind + 1}. {item.name} </h4>
                                            <p className='food-descrip'>{item.cal} Calories in {item['measuring-unit'] === '1 CUP' ? '1 cup' : '1 item'}</p>
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(breakfastCount[ind] - 0.5 >= 0) {                                                    
                                                    let temp = [...breakfastCount]
                                                    temp[ind] -= 0.5
                                                    setBreakfastCount(temp)
                                                }
                                            }}>
                                                <FaMinusCircle className='food-icon'/>
                                            </Button>
                                            <p>{breakfastCount[ind]}</p>
                                            <Button onClick={() => {
                                                let temp = [...breakfastCount]
                                                temp[ind] += 0.5
                                                setBreakfastCount(temp)
                                            }}>
                                                <FaPlusCircle />
                                            </Button>
                                        </div>
                                    </div>;
                        })}
                    </>
                    : <h5>Food not yet updated. Try again later</h5>}

                    {/* Lunch */}
                    <h3>Lunch</h3>
                    {lunchList.length !== 0 
                    ? <>
                        {lunchList.map((item, ind) => {
                            return <div className="single-item" key={item.id}>
                                        <div className="food">
                                            <h4>{ind + 1}. {item.name} </h4>
                                            <p className='food-descrip'>{item.cal} Calories in {item['measuring-unit'] === '1 CUP' ? '1 cup' : '1 item'}</p>                                            
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(lunchCount[ind] - 0.5 >= 0) {                                                    
                                                    let temp = [...lunchCount]
                                                    temp[ind] -= 0.5
                                                    setLunchCount(temp)
                                                }
                                            }}>
                                                <FaMinusCircle />
                                            </Button>
                                            <p>{lunchCount[ind]}</p>
                                            <Button onClick={() => {
                                                let temp = [...lunchCount]
                                                temp[ind] += 0.5
                                                setLunchCount(temp)
                                            }}>
                                                <FaPlusCircle />
                                            </Button>
                                        </div>
                                    </div>;
                        })}
                    </>
                    : <h5>Food not yet updated. Try again later</h5>}                    
                    
                    {/* Dinner */}
                    <h3>Dinner</h3>
                    {dinnerList.length !== 0 
                    ? <>
                        
                        {dinnerList.map((item, ind) => {
                            return <div className="single-item" key={item.id}>
                                        <div className="food">
                                            <h4>{ind + 1}. {item.name} </h4>
                                            <p className='food-descrip'>{item.cal} Calories in {item['measuring-unit'] === '1 CUP' ? '1 cup' : '1 item'}</p>
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(dinnerCount[ind] - 0.5 >= 0) {                                                    
                                                    let temp = [...dinnerCount]
                                                    temp[ind] -= 0.5
                                                    setDinnerCount(temp)
                                                }
                                            }}>
                                                <FaMinusCircle />
                                            </Button>
                                            <p>{dinnerCount[ind]}</p>
                                            <Button onClick={() => {
                                                let temp = [...dinnerCount]
                                                temp[ind] += 0.5
                                                setDinnerCount(temp)
                                            }}>
                                                <FaPlusCircle />
                                            </Button>
                                        </div>
                                    </div>;
                        })}
                    </>
                    : <h5>Food not yet updated. Try again later</h5>}  
                    <div>
                        <h3>
                            Total: {calcul['total-cal']}
                        </h3>
                    </div>

                    <Button disabled={breakfastList.length === 0} onClick={saveChanges}>
                        Save
                    </Button>
                </div>
            </div>

        }
        </>
    )
}

export default PreviousDay
