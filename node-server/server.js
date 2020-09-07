const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = 3000

const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

// parse application/json
app.use(bodyParser.json())
// this sets response headers to allow cross origin requests
app.use(cors())

// start listening for requests
app.listen(port, () => console.log(`Todo app listening on port ${port}!`))

const connectionURL = 'mongodb://127.0.0.1:27017/todo-app'



mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const Task = mongoose.model('Task', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// API routes

// get all todos
app.get('/todos', (req, res) => {
  Task.find().then((todos) => {
    res.send(todos)
  }).catch((error) => {
    throw (error)
  })
})

// create a todo
app.post('/todo', (req, res) => {
  var name = req.body.name;

  const task = new Task({
    name: name
  })

  task.save().then(() => {
    res.send(task)
  }).catch((error) => {
    throw(error)
  })
})

// delete a todo given its id
app.delete('/todo/:id', (req, res) => {
  var id = req.params.id;
  Task.deleteOne({ _id: id }, (err) => { })
})

// update a todo's name, completion status given its id
app.put('/todo', (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var completed = req.body.completed;
  Task.updateOne({ _id: id }, { name: name, completed: completed }, (err) => { })
})
