import React, { useState, useRef, useEffect } from 'react'
import { Alert, Button } from 'react-bootstrap'

import { useDatabase } from './context/DatabaseContext'
import { useAuth } from './context/AuthContext'

import './AdminPage.css'

function AdminPage() {

    
    
    const [session, setSession] = useState("breakfast")
    const [noOfItems, setNoOfItems] = useState(null)
    const [show, setShow] = useState(false)
    
    const [items, setItems] = useState([]);
    
    const noOfItemsRef = useRef(0)
    
    const { addFoodItems, addingStatus, todayFood, d } = useDatabase()
    // const { currentUser } = useAuth()

    const [foodCopy, setFoodCopy] = useState({})

    useEffect(() => {
        // console.log(todayFood)
        if(todayFood[d]) {
            setFoodCopy(todayFood[d])
        }

        // setCalcul() // get and set from old user data
    }, [todayFood, d])

    function handleCreation(e) {
        e.preventDefault()

        // console.log(noOfItemsRef.current.value);
        // console.log(session);
        setNoOfItems(noOfItemsRef.current.value)
        setShow(!show)
    }

    function handleAdding(e) {
        e.preventDefault()

        // console.log(items);

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        
        if(items.length !== 0) {
            addFoodItems(date, session, items)
        }

        setItems([])
        noOfItemsRef.current.value = null
    }

    useEffect(() => {
        var arr = [];
        for (var i = 0; i < noOfItems; i++) {
            arr.push({
                'id':i+1,
                'name': '',
                'cal': 0,
                'measuring-unit': '1 CUP',
                'protein': 0,
                'carb': 0,
                'fat': 0,
                'userTakenCount': 0,
            });
        }

        setItems(arr)

    }, [noOfItems])

    useEffect(() => {
        // console.log(addingStatus);
        if(addingStatus === "added-successfully") {
            window.location.reload()
        }
    }, [addingStatus])

    return (
        <div className='admin-page'>
            <h2>Welcome Admin!</h2>

            <div className='initial-entry'>
                <div>
                    <form onSubmit={handleCreation}>
                        <h4>Choose Session: </h4>
                        <select className='session-select' onChange={e => {
                                // console.log(e.target.value)
                                setSession(e.target.value)
                            }}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        
                        <label>
                            No of Items:
                            <input className="items-num-input" ref={noOfItemsRef} min="0" type="number"></input>
                        </label>
                        <Button disabled={foodCopy[`${session}`] ? true: false} type="submit">Create Items to Add</Button>
                    </form>
                </div>
            </div>

            {foodCopy[`${session}`] && <Alert>Items for this session already exists</Alert>}
            {show && 
            <div className="blank-items">
                <form onSubmit={handleAdding}>
                        {items.map(function(item, index) { 
                            let temp = items

                            return <div className="item" key={item.id}>
                                        <p>Food Item No: {index+1}</p>
                                        <div className='horzi-line'></div>
                                        <div className='indivi-entry'>
                                            <span>
                                                Name:
                                            </span>
                                            <input autoComplete="off" id='item-name' onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index].name = e.target.value
                                            }} value={items.name} type="text" placeholder="Food Item Name" required></input>
                                        </div>
                                        <div className='indivi-entry'>
                                            <span>Measuring Quantity:</span>
                                            <select onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index]['measuring-unit'] = e.target.value
                                            }} value={items.name}>
                                                <option>1 CUP</option>
                                                <option>1 No</option>
                                            </select>
                                        </div>
                                        <div className='indivi-entry'>
                                            <span>
                                                No Of Calories:
                                            </span>
                                            <input onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index].cal = e.target.value
                                            }} value={items.name} min="0" type="number" placeholder="" required></input>
                                        </div>
                                        <div className='indivi-entry'>
                                            <span>
                                                Proteins(in gms):
                                            </span>
                                            <input onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index].protein = e.target.value
                                            }} value={items.name} min="0" type="number" placeholder="" required></input>
                                        </div>
                                        <div className='indivi-entry'>
                                            <span>
                                                Carbs(in gms):
                                            </span>
                                            <input onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index].carb = e.target.value
                                            }} value={items.name} min="0" type="number" placeholder="" required></input>
                                        </div>
                                        <div className='indivi-entry'>
                                            <span>
                                                Fat(in gms):
                                            </span>
                                            <input onChange={(e) => {
                                                // console.log(e.target.value);
                                                temp[index].fat = e.target.value
                                            }} value={items.name} min="0" type="number" placeholder="" required></input>
                                        </div>
                                    </div>
                        })
                        }

                        <Button type="submit">Add Above Items</Button>
                </form> 
            </div>
            }


            {addingStatus && <p>{addingStatus}</p>}

        </div>
    )
}

export default AdminPage


