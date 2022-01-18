import React, { useContext, useState, useEffect } from "react";

import { database } from '../firebase-config'
import { 
    set, 
    ref,
    child,
    onValue,
    get,
    remove,
    update,
} from "firebase/database"

import { useAuth } from "./AuthContext";

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const d = date.toString().replaceAll("/", "-")
    
    const { currentUser } = useAuth()
    // console.log(currentUser);

    const [addingStatus, setaddingStatus] = useState("")
    const [todayFood, settodayFood] = useState([])
    const [todayReport, setTodayReport] = useState(null)
    const [foods, setFoods] = useState({})

    const [reports, setReports] = useState({})
    const [userDReport, setUserDReport] = useState({})
    const [calGoal, setCalGoal] = useState(null)
    const [dateList, setDateList] = useState([])


    function getTodayFood(date) {
        const d = date.toString().replaceAll("/", "-")
        const unsub = get(child(ref(database), d + '/')).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("Data for this session and data already exists");
                // console.log(snapshot.val());
                // setaddingStatus("data-exists")
                settodayFood(snapshot.val())
            } else {
                console.log("no data for this date", d);
            }
          }).catch((error) => {
            console.error(error);
          });

        return unsub
    }


    function addFoodItems(date, session, items) {
        // console.log(date, session, items)

        const d = date.toString().replaceAll('/', '-')

        items['user-data'] = {
            'session-cal': 0,
            'session-p': 0,
            'session-c': 0,
            'session-f': 0,
        }        

        const unsub = get(child(ref(database), d + '/' + session + '/')).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("Data for this session and data already exists");
                // console.log(snapshot.val());
                setaddingStatus("data-exists")
            } else {
            //   console.log("No data available, Making new entry");

                set(ref(database, d + '/' + session + '/'), {
                    food: items,
                });


                
                setaddingStatus("added-successfully")
            }
          }).catch((error) => {
            console.error(error);
          });

        

        return unsub
    }

    function addTodayReport(report, report_date) {
        set(ref(database, currentUser.uid + '/' + report_date + '/' ), report)
    }

    function addUserGoal(target) {
        set(ref(database, currentUser.uid + '/currentTarget/'), target)
    }

    // Getting total and today user data
    useEffect(() => {

        if(currentUser) {
            const unsub = get(child(ref(database), currentUser.uid + '/')).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log("Data for this session and data already exists");
                    // console.log(snapshot.val());
                    // For one date - d
                    setReports(snapshot.val())
                    setUserDReport(snapshot.val()[`${d}`] ? snapshot.val()[`${d}`] : {})
                } else {
                    // console.log("no data");
                }
              }).catch((error) => {
                console.error(error);
              });
    
            return unsub
        }
    }, [])

    useEffect(() => {
        const current = new Date();
        
        // don't consider present date
        // let datesList = []
        // const len = Object.keys(reports).length;
        
        // for(let i = 1; i < len-1; i++) {
        //     const temp = `${current.getDate() - i}/${current.getMonth()+1}/${current.getFullYear()}`;
        //     datesList[i-1] = temp.toString().replaceAll("/", "-")
        // }

        // datesList.reverse() // for descending order
        // console.log(datesList);
        // console.log(reports);

        // setDateList(datesList)

        let date_list = Object.keys(reports)
        // console.log(date_list);
        let rem_ind = date_list.indexOf('currentTarget')
        if(rem_ind > -1) {
            date_list.splice(rem_ind, 1);
        }

        // Remove current date also
        rem_ind = date_list.indexOf(d);
        if(rem_ind > -1) {
            date_list.splice(rem_ind, 1);
        }

        // console.log(date_list);
        date_list.reverse()
        setDateList(date_list)

    }, [reports])

    // Getting report for d
    useEffect(() => {
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        
        const d = date.toString().replaceAll('/', '-')

        // const unsub =  onValue(child(ref(database), currentUser.uid + '/' + d)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         // console.log("Data for this session and data already exists");
        //         console.log(snapshot.val());
        //         setTodayReport(snapshot.val())
        //     } else {
        //         setTodayReport(null)
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // })

        if(currentUser) {
            const dbRef = ref(database, currentUser.uid + '/' + d);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                // console.log(data);
                setTodayReport(data)
            });
        }

        // return unsub
    }, [])

    useEffect(() => {
        if(currentUser) {
            const dbRef = ref(database, currentUser.uid + '/currentTarget' );
            onValue(dbRef, (snapshot) => {
                if(snapshot.exists()) {
                    const data = snapshot.val();
                    // console.log(data);
                    setCalGoal(data)
                } else {
                    setCalGoal(-1)
                }
            });
        }
    }, [])

    // Getting today food
    useEffect(() => {
        const d = date.toString().replaceAll("/", "-")
        const unsub = get(child(ref(database), '/')).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("Data for this session and data already exists");
                // console.log(snapshot.val());
                // setaddingStatus("data-exists")
                settodayFood(snapshot.val())
            } else {
                console.log("no data for this date", d);
            }
          }).catch((error) => {
            console.error(error);
          });

        return unsub
    }, [])

    // Creating Date List

    const value = {
        database,
        addFoodItems,
        addingStatus,
        getTodayFood,
        todayFood,
        addTodayReport,
        foods,
        todayReport,
        date,
        d,
        userDReport,
        reports,
        addUserGoal,
        calGoal,
        dateList,
    }


    return (
        <DatabaseContext.Provider value={value}>
            { children }
        </DatabaseContext.Provider>
    )
}