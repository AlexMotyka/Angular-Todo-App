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
app.get('/todos', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

// get todo by id
app.get('/todo/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const todo = await Task.findById(_id)
    if (!todo) {
      return res.status(404).send()
    }
    res.send(todo)
  } catch (error) {
    res.status(500).send(error)
  }
})

// get all users
app.get('/users', async (req, res) => {

  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(500).send()
  }
})

// get user by id
app.get('/user/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

// create a todo
app.post('/todo', async (req, res) => {
  const task = new Task(req.body)

  try {
    const todo = await task.save()
    res.send(todo)
  } catch (error) {
    res.status(400).send(error)
  }
})
// create a user
app.post('/user', async (req, res) => {
  const user = new User(req.body)

  try {
    const result = await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/todo/:id', async (req, res) => {
  try {
      const todo = await Task.findByIdAndDelete(req.params.id)

      if (!todo) {
          res.status(404).send()
      }

      res.send(todo)
  } catch (error) {
      res.status(500).send()
  }
})

app.delete('/user/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id)

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
})



// update a todo given its id
app.put('/todo/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const todo = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!todo) {
      return res.status(404).send()
    }

    res.send(todo)
  } catch (error) {
    res.status(400).send(error)
  }
})
