import React, { useState, useEffect } from 'react'

import AddButton from './AddButton';

import { Modal, Button } from 'react-bootstrap';

import { useDatabase } from './context/DatabaseContext'

function CurrentDate({ date: todayDate }) {

    const [showModal, setShowModal] = useState(false)

    const [data, setData] = useState([])

    const [totalCal, setTotalCal] = useState(0)
    const [noOfItems, setNoOfItems] = useState(0)

    const [itemCounts, setItemCounts] = useState([])

    const [protein, setProtein] = useState([])
    const [carb, setCarb] = useState([])
    const [fat, setFat] = useState([])

    const [macros, setMacros] = useState([])

    const { todayFood, addTodayReport, todayReport } = useDatabase()

    function saveChanges() {

        let temp_data = [...data]

        temp_data.forEach((item, index) => {
            temp_data[index]['count'] = itemCounts[index];
        })

        console.log(temp_data);
        console.log(data);
        const report = {
            date: todayDate,
            foodList: temp_data,
            totalCal: totalCal,
            macros: macros,
            itemCounts: itemCounts,
        }

        addTodayReport(report, todayDate)
        setShowModal(false)
    }


    useEffect(() => {
        // setData(todayFood)
        // console.log(todayFood);
        // const d = todayDate.toString().replaceAll('/', '-')

        const temp_data = todayFood?.breakfast?.foodList

        if(temp_data) {
            setData(temp_data)
            console.log(temp_data);
        }
    }, [todayFood])

    useEffect(() => {
        console.log(data.length);
        setNoOfItems(data.length)

        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(0);
        }
        setItemCounts(arr)
        setProtein(arr);
        setCarb(arr);
        setFat(arr);
    }, [data]);

    useEffect(() => {
        console.log(itemCounts);

        let total = 0;
        let temp_protein = protein;
        let temp_carb = carb;
        let temp_fat = fat;

        data.map((item, index) => {
            const count = itemCounts[index]
            total += item.cal * count

            // Protein, Carb, Fat Calculation
            temp_protein[index] = item.protein * count
            temp_carb[index] = item.carb * count
            temp_fat[index] = item.fat * count
            return;
        });

        setProtein(temp_protein)
        setCarb(temp_carb)
        setFat(temp_fat)

        let temp_macros = [0, 0, 0]
        temp_macros[0] = temp_protein.reduce(function(a, b) { return a + b; }, 0).toFixed(1);
        temp_macros[1] = temp_carb.reduce(function(a, b) { return a + b; }, 0).toFixed(1);
        temp_macros[2] = temp_fat.reduce(function(a, b) { return a + b; }, 0).toFixed(1);

        setMacros(temp_macros)
        setTotalCal(total);
    }, [itemCounts])


    return (
        <>
        {todayReport !== null && <div className="individual-card">
            <h3 className="date">{todayDate}</h3>


            <p>Total: {todayReport.totalCal}</p>
            <div className="macros">
                <p>P: {todayReport.macros[0]} </p>
                <p>C: {todayReport.macros[1]} </p>
                <p>F: {todayReport.macros[2]} </p>
            </div>
            <AddButton setShowModal={setShowModal} />



            <Modal show={showModal}>
                <Modal.Header closeButton onClick={() => setShowModal(false)}>
                    <Modal.Title>{todayDate}'s Calculation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {data.length !== 0 && data.map(function(item, index) {
                            
                            return <div className="single-item" key={item.id}>
                                        <div>
                                            <h4>{index + 1}] {item.name} </h4>
                                            <p>{item['measuring-unit']} - {item.cal} Calories</p>
                                            <p></p>
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(itemCounts[index] - 0.5 >= 0) {                                                    
                                                    let temp = [...itemCounts]
                                                    temp[index] -= 0.5
                                                    setItemCounts(temp)
                                                }
                                            }}>-</Button>
                                            <p>{itemCounts[index]}</p>
                                            <Button onClick={() => {
                                                let temp = [...itemCounts]
                                                temp[index] += 0.5
                                                setItemCounts(temp)
                                            }}>+</Button>
                                        </div>
                                    </div>;
                        })}

                    </>

                    <div>
                        <h3>
                            Total: {totalCal}
                        </h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        }

        {todayReport === null && 
        <div className="individual-card">
            <h3 className="date">{todayDate}</h3>


            <p>Total: {totalCal}</p>
            <div className="macros">
                <p>P: {macros[0]} </p>
                <p>C: {macros[1]} </p>
                <p>F: {macros[2]} </p>
        </div>
        <AddButton setShowModal={setShowModal} />



            <Modal show={showModal}>
                <Modal.Header closeButton onClick={() => setShowModal(false)}>
                    <Modal.Title>{todayDate}'s Calculation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {data.length !== 0 && data.map(function(item, index) {
                            
                            return <div className="single-item" key={item.id}>
                                        <div>
                                            <h4>{index + 1}] {item.name} </h4>
                                            <p>{item['measuring-unit']} - {item.cal} Calories</p>
                                            <p></p>
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(itemCounts[index] - 0.5 >= 0) {                                                    
                                                    let temp = [...itemCounts]
                                                    temp[index] -= 0.5
                                                    setItemCounts(temp)
                                                }
                                            }}>-</Button>
                                            <p>{itemCounts[index]}</p>
                                            <Button onClick={() => {
                                                let temp = [...itemCounts]
                                                temp[index] += 0.5
                                                setItemCounts(temp)
                                            }}>+</Button>
                                        </div>
                                    </div>;
                        })}

                    </>

                    <div>
                        <h3>
                            Total: {totalCal}
                        </h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </div>}
        </>
    )
}

export default CurrentDate


{/* <div className="individual-card">
            <h3 className="date">{todayDate}</h3>


            <p>Total: {totalCal}</p>
            <div className="macros">
                <p>P: {macros[0]} </p>
                <p>C: {macros[1]} </p>
                <p>F: {macros[2]} </p>
            </div>
            <AddButton setShowModal={setShowModal} />



            <Modal show={showModal}>
                <Modal.Header closeButton onClick={() => setShowModal(false)}>
                    <Modal.Title>{todayDate}'s Calculation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {data.length !== 0 && data.map(function(item, index) {
                            
                            return <div className="single-item" key={item.id}>
                                        <div>
                                            <h4>{index + 1}] {item.name} </h4>
                                            <p>{item['measuring-unit']} - {item.cal} Calories</p>
                                            <p></p>
                                        </div>
                                        <div className="single-item-count-section">
                                            <Button onClick={() => {
                                                if(itemCounts[index] - 0.5 >= 0) {                                                    
                                                    let temp = [...itemCounts]
                                                    temp[index] -= 0.5
                                                    setItemCounts(temp)
                                                }
                                            }}>-</Button>
                                            <p>{itemCounts[index]}</p>
                                            <Button onClick={() => {
                                                let temp = [...itemCounts]
                                                temp[index] += 0.5
                                                setItemCounts(temp)
                                            }}>+</Button>
                                        </div>
                                    </div>;
                        })}

                    </>

                    <div>
                        <h3>
                            Total: {totalCal}
                        </h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </div> */}


