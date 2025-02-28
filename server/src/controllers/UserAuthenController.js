const {User} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function jwtSignUser (user){
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret,{
        expiresIn:ONE_WEEK
    })
}

module.exports ={
    async register (req,res){
        try{
            const user = await User.create(req.boby)
            res.send(user.toJSON())
        }catch (error){
            res.status(400).send({
                error:'The content information was incorrect'
            })
        }
    },
    async login (req ,res){
        try{
            const {email,password} = req.boby
            const user = await User.findOne({
                where:{
                    email:email
                }
            })

            if(!user){
                return res.status(403).send({
                    error:'User/password not correct'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid){
                return res.status(403).send({
                    error:'User/Password not correct'
                })
            }

            const userJSON = user.toJSON()
            res.send(userJSON)

        }catch (error){
            res.status(500).send({
                error:'error! from get user'
            })
        }
        
    }
}