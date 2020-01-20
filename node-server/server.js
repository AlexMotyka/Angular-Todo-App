const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'tododb'
});

function getTodos(filter){
  response = [];
  // default
  var condition = "'completed' = 0 OR 'completed' = 1;"

  if(filter === 'Completed'){
    condition = "'completed' = 1;"
  } else if(filter === 'Active'){
    condition = "'completed' = 0;"
  }

  connection.connect();
  connection.query(`SELECT * FROM Todos WHERE ${condition}`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    response = results;
  });
  connection.end();

  return response;
}

// getTodos();
