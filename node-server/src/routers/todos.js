const express = require('express')
const router = new express.Router()
const Todo = require('../models/todo')

// get all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.send(todos)
    } catch (error) {
        res.status(500).send()
    }
})

// get todo by id
router.get('/todo/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const todo = await Todo.findById(_id)
        if (!todo) {
            return res.status(404).send()
        }
        res.send(todo)
    } catch (error) {
        res.status(500).send(error)
    }
})

// create a todo
router.post('/todo', async (req, res) => {
    const todo = new Todo(req.body)

    try {
        const result = await todo.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        if (!todo) {
            res.status(404).send()
        }

        res.send(todo)
    } catch (error) {
        res.status(500).send()
    }
})

// update a todo given its id
router.put('/todo/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!todo) {
            return res.status(404).send()
        }

        res.send(todo)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router