const express = require('express');
var cors = require('cors')
// this require statement starts the db connection
require('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express();
const port = process.env.PORT || 3000

// parse application/json
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log(`Todo app listening on port ${port}!`))

