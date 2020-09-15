const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// get all users
router.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

// get user by id
router.get('/user/:id', async (req, res) => {
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

// create a user
router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/user/:id', async (req, res) => {
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

module.exports = router