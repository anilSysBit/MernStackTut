import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const WorkoutForm = () => {
  const [title,setTitle] = useState('')
  const [load,setLoad] = useState("")
  const [reps,setReps] = useState("")
  const [err,setErr] = useState(null)
  const [emptyFields,SetEmptyFields] = useState([])
  const {dispatch} = useWorkoutContext()

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const workout = {title,load,reps}

    const response = await fetch('http://localhost:4000/api/workout',{
        method:'POST',
        body: JSON.stringify(workout),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json = await response.json();

    if (!response.ok){
        setErr(json.error);
        SetEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle("");
        setLoad("");
        setReps("");
        setErr(null);
        SetEmptyFields([])
        console.log("New Workout added",json)
        dispatch({type:"CREATE_WORKOUT",payload:json})
    }

  }
  return (
    <div className="workoutform">
      <Form onSubmit={handleSubmit}>
        <h3>Add a Workout</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="your title.." 
            onChange={(e)=> setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Load</Form.Label>
          <Form.Control 
              type="number" 
              placeholder="Your Load..." 
              onChange={(e)=> setLoad(e.target.value)} 
              value={load}
              className={emptyFields.includes('load') ? 'error' : ''}

              />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Reps</Form.Label>
          <Form.Control 
              type="number" 
              placeholder="your total reps..." 
              onChange={(e)=> setReps(e.target.value)} 
              value={reps}
              className={emptyFields.includes('reps') ? 'error' : ''}

              />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {err && <p>{err}</p>}
      </Form>
    </div>
  );
};

export default WorkoutForm;
