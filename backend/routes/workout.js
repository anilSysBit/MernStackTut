const express = require("express")
const router = express.Router()
const {
    GetWorkouts,
    GetWorkout,
    CreateWorkout,
    UpdateWorkout,
    DeleteWorkout
} = require('../controllers/workoutController')


// Get All Workouts
router.get("/",GetWorkouts)

// Get single workout
router.get("/:id",GetWorkout)


router.post("/",CreateWorkout)


router.delete("/:id",DeleteWorkout)
    


router.patch("/:id",UpdateWorkout)
module.exports = router