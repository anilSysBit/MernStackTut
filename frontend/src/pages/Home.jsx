import React, { useState, useEffect, useContext } from 'react'
// import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

import {useWorkoutContext} from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'


const Home = () => {
    // const [workout,setWorkout] = useState([]);

    const {workouts,dispatch} = useWorkoutContext()
    const {user} = useAuthContext()
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch("http://localhost:4000/api/workout",{
                method:'GET',
                headers:{
                    'Authorization':`dhfopwiebcbcbsdowuwydj ${user.token}`
                }
            })
            const data = await response.json()
            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload:data})
            }
        }
        if(user){
            fetchWorkouts()
        }
    },[dispatch,user])
    // console.log(workouts)

  return (
    <div className='home'>
        <h2>Total Workouts -{workouts.length}</h2>
        <div className="workouts">
            <div className="main_workout">
            {workouts && workouts.map((workout,index)=>(
                <WorkoutDetails key={index} workout={workout}/>
            ))}
            </div>
            <WorkoutForm/>
        </div>
    </div>
  )
}

export default Home