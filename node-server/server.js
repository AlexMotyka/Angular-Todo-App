const express = require('express');
var cors = require('cors')
const mysql = require('mysql');
const Promise = require('promise');
const bodyParser = require('body-parser')
const app = express();
const port = 3000

// parse application/json
app.use(bodyParser.json())
// this sets response headers to allow cross origin requests
app.use(cors())

// API routes

// get the desired todos given the filter (All, active, or completed)
app.get('/todos', (req, res) => {
  var filter = '';
  filter = req.query.filter;
  // retrieve the todos and send them as a response
  getTodos(filter)
  .then((todos, error) => {
        if(error) throw error;
        res.send(todos);
    });
})

// create a todo
app.post('/todo', (req, res) => {
  var name = req.body.name;
  addTodo(name)
  .then((insertId, error) => {
        if(error) throw error;
        // send back the id of the created todo
        res.send(insertId.toString());
    });
})

// delete a todo given its id
app.delete('/todo/:id', (req, res) => {
  var id = req.params.id;
  deleteTodo(id)
  res.send('200')
})

// update a todo's name, completion status given its id
app.put('/todo', (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var completed = req.body.completed;
  var completedInt;
  if(completed==='false'){
    completedInt = 0;
  } else if(completed==='true'){
    completedInt = 1;
  }
  updateTodo(id, name, completedInt)
  res.send('200')
})

// start listening for requests
app.listen(port, () => console.log(`Todo app listening on port ${port}!`))

// make a connection with the database
const connection = mysql.createConnection({
  host     : 'todo-db.cvy6ggowmj2i.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'tododb'
});

connection.connect();

// get todos based on the filter
function getTodos(filter){
  return new Promise((resolve, reject) => {
    // default is all todos
    var condition = "'completed' = 0 OR 'completed' = 1;"

    if(filter === 'Completed'){
      condition = "'completed' = 1;"
    } else if(filter === 'Active'){
      condition = "'completed' = 0;"
    }

    connection.query(`SELECT * FROM Todos WHERE ${condition}`, (error, results, fields) => {
      if (error) return reject(error);
      console.log('Result: ', results);
      resolve(results);
    });
  });
}

// add a new todo given a name
function addTodo(name){

  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO Todos (name) VALUES ('${name}');`, (error, results, fields) => {
      if (error) return reject(error);
      resolve(results.insertId);
    });
  });
}

// delete a todo given the id
function deleteTodo(id){
  connection.query(`DELETE FROM Todos WHERE id = '${id}';`, (error, results, fields) => {
    if (error) throw error;
    console.log('Deleted todo: ', results);
  });
}

// update a todo
function updateTodo(id, name, completed){
  connection.query(`UPDATE Todos SET name = '${name}', completed = '${completed}' WHERE id = '${id}';`, (error, results, fields) => {
    if (error) throw error;
    console.log('Updated todo: ', results);
  });
}
