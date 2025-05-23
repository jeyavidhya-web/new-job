
const User = require('../models/User') //importing the model User
const { StatusCodes } = require ('http-status-codes')  //importing status codes
const { BadRequestError, UnauthenticatedError }  = require('../errors')
//const bcrypt = require('bcryptjs')// importing bcrypt for hashing passwords 


const register= async (req,res) => {
  
  
  const user = await User.create({...req.body }) 
  const token = user.createJWT() 
  
  res
  .status(StatusCodes.CREATED)
  .json({ user: {name:user.name }, token })
} 
//sending the response with status code 201


  
const login = async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
    const user = await User.findOne({ email })
 if(!user) {
  throw new UnauthenticatedError('Invalid Credentials')
 } 

const isPasswordCorrect = await user.comparePassword(password)

 if(!isPasswordCorrect){
  throw new UnauthenticatedError('Invalid Credentials')
 }
 

const token = user.createJWT()
res.status(StatusCodes.OK).json({ user: { name: user.name }, token})
};


 //campare password
 
 module.exports={
  register,login,
}