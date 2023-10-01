import React from 'react'
import Button from 'react-bootstrap/Button'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// date fns

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


// react confirm alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const WorkoutDetails = ({workout}) => {
  
  const {dispatch} = useWorkoutContext()

  const handleClick =()=>{
    let response;
    confirmAlert({
      title: `Confirm to Delete workout (${workout.title})`,
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            response = await fetch('http://localhost:4000/api/workout/' + workout._id,{
            method:'DELETE'})
            const data = await response.json()
      
            if(response.ok){
              dispatch({type:'DELETE_WORKOUT',payload:data})
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load(kg): </strong>{workout.load}</p>
        <p><strong>Reps:</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        {/* <hr/> */}
        {/* <br/> */}
        <Button variant='danger' onClick={handleClick}>Delete</Button>
    </div>
  )
}

export default WorkoutDetails