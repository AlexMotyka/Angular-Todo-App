const express = require('express');
const mysql = require('mysql');
const Promise = require('promise');
const app = express();
const port = 3000

app.get('/todos', function (req, res) {
  var filter = '';
  filter = req.query.filter;
  getTodos(filter)
  .then(function(todos, error) {
        if(error) throw error;
        console.log(todos);
        res.send(todos);
    });
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
      // console.log('Result: ', results);
      resolve(results);
    });
  });
}

// getTodos();
