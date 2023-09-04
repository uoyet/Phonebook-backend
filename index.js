require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/Persons')

// Tell the app to use the .json parser
app.use(express.json())

// Tell the app to use cors so you can make the front end have the same origin
app.use(cors()) 

// Tell the app that it should use the middleware static so we can see static content
app.use(express.static('build'))

// Make the token for Morgan and a string to send to it
morgan.token('info', (req,res) => {
  return JSON.stringify(req.body)
})

/** Declare the Error Handler */

const errorHandler = (error, req , res, next) => {
  console.error(error.message)

  if (error.name === 'Cast Error'){
    return res.status(400).send({error: 'malformatted id'})
  } 
  
  if (error.name === 'ValidationError'){
    return res.status(400).send({error: error.message })
  }
  next (error)
}

/** Recall that this must be the last middleware that is declared */
app.use(errorHandler)

const stringMorgan = ':method :url :status :res[content-length] - :response-time ms'

//Pathway & URL for web-app
  // Pathway
  // cd /Users/ubelejit/Documents/React-Apps/Phonebook-app

  //url 
  // http://localhost:3001/api/persons

const http = require ('http')
const Persons = require('./models/Persons')
const { trusted } = require('mongoose')

// Get the contacts from our database and display the at the URL
app.get('/api/persons',(req,res) => {
    Person
      .find({})
      .then(persons => {
        res.json(persons)
        // console.log(`fetched from MongoDB :)`)
      })
})

// Info Page 
app.get('/info', (req,res) => {
  
  Persons
    .countDocuments({})
    .then(NumofDocuments => {

        // Tell Express the phrase to use for the info page
        const date = Date()

        const phrase_1 =   
        `<h1>Info Page</h1><br/> 
        <p> Phonebook has the info for ${NumofDocuments} people.</p>
        <p>${date}</p>`

        // Send over the phrase
        res.send(phrase_1)
      }
    )
    .catch(error => {
      console.log(error)
      res.status(400).send('something bad occured with counting documents')
    })
    })
  

// Functionality for Get request of specific ID's as a request parameter
app.get('/api/persons/:id', (req,res,next) =>{
  Person
    .findById(req.params.id)
    .then(
      person => {
        if(person){
        res.json(note)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
})

// Functionallity to delete an entry based on its id

app.delete('/api/persons/:id',(req,res,next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(
      result => {
        res.status(204).end()
      }) 
    .catch(error => next(error))         
})

// Functionality for adding a name
app.post(('/api/persons'), morgan(stringMorgan + ' :info'), (req,res,next) => {
  // Tell express what to take the text
  // from the body of the request

  const body = req.body
  
  // Make some variables to check for the existence of name & num
  const enteredName = body.name
  // Log the name
  // console.log (`"index.js" this is the name that is to be appended ${enteredName}`)
  const enteredNum = body.number

  /** initial check for number and name existence */
  if(enteredName === undefined){
    return res.status(400).json({error: 'you are missing a name'})
  }

  if(enteredNum === undefined){
    return res.status(400).json({error: 'you are missing a number'})
  }

  const person = new Person({
    name: enteredName,
    number: enteredNum
  })

  /** Tell express to save the person's info to MongoDB */
  person 
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))

})

// Functionality to change number for person who is already in the book
app.put(('/api/persons/:id'), morgan(stringMorgan + ' :info'), (req,res,next) => {
  
  const {name, number} = req.body

  Person
    .findByIdAndUpdate(
      req.params.id, 
      {name, number},
      {new: true, runValidators: true, context: 'query'} )
    .then(result => {

      updatedInfo => {res.json(updatedInfo)}

      /** We CAN retrieve the person's info via id within the then method */
      Person
        .findById(req.params.id)
        .then(LogPUTperson => {
          console.log(`${LogPUTperson.name}'s number has been changed to ${LogPUTperson.number}`)
        })
      .catch(error => next(error))
        
    })
})

const PORT = process.env.PORT 
app.listen(PORT, () => { 
    console.log(`Server running on Port ${PORT}`)
})