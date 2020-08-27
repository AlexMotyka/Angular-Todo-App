## Todo App

This application allows you to record all of your tasks so you never lose track of what needs to get done. Simply connect to the frontend and input your todos one by one. The backend handles all of the operations allowing the user to create, edit, complete, and delete todos. Additionally the user can filter their todos to view all of them, only active todos, or only completed todos.

### Node.js Server

This server is responsible for listening to requests from the frontend and interacting with the MySQL database. To run the server follow these steps:

```cd Angular-Todo-App```
```cd node-server```
```node server.js```

The server will be deployed to port 3000 on your IP. If this port is already taken you can modify the port variable in the code and select your own port.

### Angular Frontend

The Angular frontend is what the user interacts with. Here the todos can be created, viewed, sorted, edited, completed, and deleted. To run the frontend follow these steps:

```cd Angular-Todo-App```
```cd todo-app```
```ng serve --open --host 0.0.0.0 --port 4200 --disable-host-check```

The frontend will be deployed to port 4200 on your IP. If this port is already taken you can modify step 2 from above to use an available port

### MySQL Database

For this project I used a MySQL database. To create this database follow the steps below (make sure you have an installation of MySQL first).  

```CREATE DATABASE tododb;```

```
CREATE TABLE Todos (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    editing TINYINT(1) NOT NULL DEFAULT 0);
 ```
    
Note that you must also create a user for the tododb. The backend will use this user and password to connect to the database. In the server.js file, I left a placeholder user 'root' and placeholder password 'pass'; change these to whatever user and password you have created for the tododb.

