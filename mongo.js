const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument please')
  process.exit(1)
}

const password = process.argv[2]

// Declare the MongoDB URI (like a URL but for Databases)

const url = 

`mongodb+srv://juboyet:${password}@cluster0.hmefn0y.mongodb.net/PhonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// Please figure out if "Number" is an actual data type 
// in Mongo

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// This is the hardcoded trial person, but you are 
// gonna make this into a variable later to comment it out
// pretty standar. It has been commented out
/*const person = new Person({
    name: 'Trial Name 3',
    number: '123-1234',
})*/

/* Declare the name and number*/
const typedName = process.argv[3]
const typedNum = process.argv[4]

const person = new Person ({
    name: typedName,
    number: typedNum
})

/* If there is no typed name then list all of the names in the database
else there was a typed name and so add a name to the database */
if (!typedName){
Person
.find({})
.then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})
} else {person.save().then(result => {
    console.log('name & number saved!')
    mongoose.connection.close()
})}
