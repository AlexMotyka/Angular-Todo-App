const express = require('express');
var cors = require('cors')
// this require statement starts the db connection
require('./db/mongoose')
const Task = require('./models/task')
const User = require('./models/user')

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
    res.status(500).send()
  })
})

// get todo by id
app.get('/todo/:id', (req, res) => {
  const _id = req.params.id

  Task.findById(_id).then((todo) => {
      if (!todo) {
          return res.status(404).send()
      }

      res.send(todo)
  }).catch((error) => {
      res.status(500).send(error)
  })
})

// get all users
app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send(users)
  }).catch((error) => {
    res.status(500).send()
  })
})

// get user by id
app.get('/user/:id', (req, res) => {
  const _id = req.params.id

  User.findById(_id).then((user) => {
      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  }).catch((error) => {
      res.status(500).send(error)
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
// create a user
app.post('/user', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
      res.send(user)
  }).catch((e) => {
      res.status(400).send(e)
  })
})

// delete a todo given its id
app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id, (err) => { })
})

// update a todo's name, completion status given its id
app.put('/todo', (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var completed = req.body.completed;
  Task.updateOne({ _id: id }, { name: name, completed: completed }, (err) => { })
})
