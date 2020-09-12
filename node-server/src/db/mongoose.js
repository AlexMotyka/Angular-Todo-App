const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/todo-app'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})