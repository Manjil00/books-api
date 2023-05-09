const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { hash } = require('bcryptjs')


//for register
router.post('/register',(req, res,next) =>{

    res.json("OK")
    const {username, password, fullname,email}= req.body
    User.findOne({username: req.body.username})
    .then ((user) => {
        if(!user) return res.status(400).json({error: 'duplicate username'})
        bcrypt.hash(password, 10, (err, hash) =>{
            if(err) return res.status(500).json({error: 'err.message'})
            User.create({username, password: hash, fullname,email})
            .then((user)=>{
                res.status(201).json(user)
            }).catch(next)
        })
    }).catch(next)
})

//for login
router.post('/login',(req,res,next)=>{
    console.log(req.body)
    User.findOne({username:req.body.username})
    .then((user)=>{
        if(!user)return res.status(400).json({error:'user is not registered'})
        console.log(user)
        bcrypt.compare(req.body.password, user.password,(err,success)=>{
            if(err) return res.status(500).json(next(err))
            if(!success) return res.status(400).json({error: 'password is match'})
            const payload ={
                id:user.id,
                username:user.username,
                fullname:user.fullname,
                role: user.role
            }
             jwt.sign(payload,
                process.env.SECRET,
                {expiresIn: '1d'},
                (err,token)=>{
                    if(err) return res.status(500).json({error:err.message})
                    res.json({status: 'success', token:token})
                })
        })

    }).catch(next)


})

module.exports = router