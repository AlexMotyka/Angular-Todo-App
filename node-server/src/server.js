const express = require('express');
var cors = require('cors')
// this require statement starts the db connection
require('./db/mongoose')

const Todo = require('./models/todo')
const User = require('./models/user')
const userRouter = require('./routers/users')
const todoRouter = require('./routers/todos')

const app = express();
const port = process.env.PORT || 3000

// parse application/json
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(todoRouter)

app.listen(port, () => console.log(`Todo app listening on port ${port}!`))

