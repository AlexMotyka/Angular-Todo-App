const express = require('express');
var cors = require('cors')
const mysql = require('mysql');
const Promise = require('promise');
const bodyParser = require('body-parser')
const app = express();
const port = 3000
// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.get('/todos', function (req, res) {
  var filter = '';
  filter = req.query.filter;
  getTodos(filter)
  .then(function(todos, error) {
        if(error) throw error;
        res.send(todos);
    });
})

app.post('/todo', function (req, res) {
  var name = req.body.name;
  addTodo(name)
  .then(function(insertId, error) {
        if(error) throw error;
        console.log("Insert ID before sending: ", insertId);
        res.send(insertId.toString());
    });
})

app.delete('/todo/:id', function (req, res) {
  var id = req.params.id;
  deleteTodo(id)
  res.send('200')
})

app.put('/todo', function (req, res) {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'tododb'
});

connection.connect();

function getTodos(filter){
  return new Promise(function(resolve, reject) {
    // default
    var condition = "'completed' = 0 OR 'completed' = 1;"

    if(filter === 'Completed'){
      condition = "'completed' = 1;"
    } else if(filter === 'Active'){
      condition = "'completed' = 0;"
    }

    connection.query(`SELECT * FROM Todos WHERE ${condition}`, function (error, results, fields) {
      if (error) return reject(error);
      console.log('Result: ', results);
      resolve(results);
    });
  });
}

function addTodo(name){

  return new Promise(function(resolve, reject) {
    connection.query(`INSERT INTO Todos (name) VALUES ('${name}');`, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results.insertId);
    });
  });
}

function deleteTodo(id){
  connection.query(`DELETE FROM Todos WHERE id = '${id}';`, function (error, results, fields) {
    if (error) throw error;
    console.log('Deleted todo: ', results);
  });
}

function updateTodo(id, name, completed){
  connection.query(`UPDATE Todos SET name = '${name}', completed = '${completed}' WHERE id = '${id}';`, function (error, results, fields) {
    if (error) throw error;
    console.log('Updated todo: ', results);
  });
}
