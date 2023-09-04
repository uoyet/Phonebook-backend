require('dotenv').config()
const mongoose = require('mongoose')

// Code to get the model from MongoDB

/* Tell the app all of the Required info for Mongoose */

const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// Tell Mongoose the Schema 
/**  We note that you also tell Mongoose that there are constraints
 * on the data type on minimum length of the name
 */

const personSchema = new mongoose.Schema({
name: {
  type: String,
  minLength: 3,
  required: true
},

number: {
  type: String,
  minLength: 3,
  required: true
}})

/*  Tell Mongoose the schema fields to return to the backend */

personSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

module.exports = mongoose.model('Person', personSchema)



 
