const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

const stringMorgan = ':method :url :status :res[content-length] - :response-time ms'

//Pathway & URL for web-app
  // Pathway
  // cd /Users/ubelejit/Documents/React-Apps/Phonebook-app

  //url 
  // http://localhost:3001/api/persons

const http = require ('http')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Get the contacts from our variable and display the at the URL
app.get('/api/persons',(req,res) => {
    res.json(persons)
})

// Info Page 

app.get('/info', (req,res) => {
  const date = Date()
  const phrase_1 =   
  ` <h1>Info Page</h1><br/> 
    <p> Phonebook has the info for ${persons.length} people.</p>
    <p>${date}</p>
    `
  res.send(phrase_1)
})

// Functionality for Get request of specific ID's as a request parameter

  // URL for the get request below
// http://localhost:3001/api/persons/2

app.get('/api/persons/:id', (req,res) =>{
  // Tell express that I want to base the id that it is routing
  // from what is put in the URL
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  // log the person to be displayed
  // console.log(person)

  // Since person is a js constant it is "truthy" let's put in an if statement
  if (!person){
    res.statusMessage = 'this was a mistake'
    res.status(404).end()
  }

  res.json(person)
})

// Functionallity to delete an entry based on its id

app.delete('/api/persons/:id',(req,res) => {
  // Get the id of the person you are deleting
    // be sure to make it into a number since you will be using
    // functional programming
  const id = Number(req.params.id)
  
  // Notice that we tell express a new persons value and do
    // not make it a constant. It was already declared as a 
    // global constant 
  
  persons = persons.filter(
            person => persons.id !== id)
  // Log the persons array
  console.log(`"index.js" this is persons ${persons}`)

  res.status(204).end()          
})

// Functionality for adding a name

app.post(('/api/persons'), morgan(stringMorgan + ' :info'), (req,res) => {
  // Tell express what to take the text
  // from the body of the request

  const body = req.body
  
  // Make some variables to check for the existence of name & num
  const enteredName = body.name
  // Log the name
  // console.log (`"index.js" this is the name that is to be appended ${enteredName}`)
  const enteredNum = body.number

  // Make some variables to check for repeats
  // this should traverse the persons array and find what equals name,
  // then make another one that does the same but looks for the number

  const nameMatch = persons
    .find(nameMatch => 
          nameMatch.name === enteredName)

  const numMatch = persons
    .find(numMatch => 
      numMatch.number === enteredNum)

    // log the nameMatch variable
    // console.log(`this is nameMatch ${nameMatch}`)
  
  // If statement to test if the name exists
  if (enteredName && enteredNum){   
    
    // if statement to test if there are matching names or numbers
    if(nameMatch){
      // The name matches soo..
      res.status(404).send( {error: 'you have a repeated name' }).end
    }else if (numMatch){
      // The number matches soo..
      res.status(404).send( {error: 'you have a repeated phonenumber' }).end
    }else{
      // the name does not match sooo... 
      const person =  {
        id: Math.floor(Math.random()*1E4),
        name: enteredName,     
        number: enteredNum  
      }
      persons = persons.concat(person)
      res.json(person).end
    }

  }else {
  res.status(404).send( {error: 'You must have both a name & number' }).end
  }
  })

  // Now make the logger for the app with Morgan
  

//  Test random number generator
//  console.log(`this is a random number`, Math.floor(Math.random()*1E4))
const PORT = process.env.PORT || 3001
app.listen(PORT, () => { 
    console.log(`Server running on Port ${PORT}`)
})