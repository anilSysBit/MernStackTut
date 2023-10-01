const express = require("express");
const cors = require("cors")
require('dotenv').config()


const mongoose = require("mongoose")
const app = express();

app.use(cors())
app.use(express.json())

const workoutRoutes = require("./routes/workout")
// to use middleware you can use app.use

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/workout',workoutRoutes)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Connected to Database and Listening on port 4000")
    })    
}).catch(err=>{
    console.log(err)
})
