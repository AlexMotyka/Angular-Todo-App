const express = require('express');
var cors = require('cors')
// this require statement starts the db connection
require('./db/mongoose')
const Task = require('./models/task')
const Task = require('./models/user')

const app = express();
const port = process.env.PORT || 3000

// parse application/json
app.use(express.json())
// allow cross origin requests
app.use(cors())

app.listen(port, () => console.log(`Todo app listening on port ${port}!`))

// API routes

// get all todos
app.get('/todos', (req, res) => {
  Task.find().then((todos) => {
    res.send(todos)
  }).catch((error) => {
    res.status(400).send(error)
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
    res.status(400).send(error)
  })
})

// delete a todo given its id
app.delete('/todo/:id', (req, res) => {
  var id = req.params.id;
  Task.findByIdAndDelete(id, (err) => { })
})

// update a todo's name, completion status given its id
app.put('/todo', (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var completed = req.body.completed;
  Task.updateOne({ _id: id }, { name: name, completed: completed }, (err) => { })
})
