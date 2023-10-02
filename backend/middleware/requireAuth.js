const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req,res,next)=>{

    // verify Authentication

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).send({error:'Authorization token require'})
    }

    const token = authorization.split(' ')[1]

    try{
       const {_id} = jwt.verify(token,process.env.SECRET)

       req.user = await User.findOne({_id}).select('_id')

       next()
    }catch(error){
        console.log(error)
        res.status(401).send({error:'Request is not authorized'})
    }
}


module.exports = requireAuth