const Job =require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req,res) =>{
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length})
}
const getJob = async (req,res) =>{
  res.send('Get Single Job')
}
const createJob = async (req,res) =>{
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
  
}
const updateJob = async (req,res) =>{
  res.send('update Job')
}
const deleteJob = async (req,res) =>{
  res.send('delete Job')
}
 module.exports = {getAllJobs,
  getJob,
  createJob,
updateJob,
deleteJob,
}