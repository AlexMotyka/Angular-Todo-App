## Todo App

This application allows you to record all of your tasks so you never lose track of what needs to get done. Simply connect to the frontend and input your todos one by one. The backend handles all of the operations allowing the user to create, edit, complete, and delete todos. Additionally the user can filter their todos to view all of them, only active todos, or only completed todos. Below are some screenshots of the todo list:

![Image of all todos](https://github.com/AlexMotyka/Angular-Todo-App/blob/master/Images/Screenshot%20from%202020-08-27%2017-22-34.png)  
Viewing all todos  
![Image of active todos](https://github.com/AlexMotyka/Angular-Todo-App/blob/master/Images/Screenshot%20from%202020-08-27%2017-23-31.png)  
Filtering just active todos  
![Image of completed todos](https://github.com/AlexMotyka/Angular-Todo-App/blob/master/Images/Screenshot%20from%202020-08-27%2017-23-13.png)  
Filtering completed todos  

### MongoDB Database

For this project I used a MongoDB database. To install MongoDB and create the database run the following commands:

``` cd Angular-Todo-App ```  
``` chmod +x mongo-setup.sh ```  
``` ./mongo-setup.sh ```  

### Node.js Server

This server is responsible for listening to requests from the frontend and interacting with the database. To run the server follow these steps:

``` cd Angular-Todo-App/node-server  ```  
``` chmod +x run-server.sh  ```  
``` ./run-server.sh  ```  


The server will be deployed to port 3000 on your IP. If this port is already taken you can modify the port variable in the code and select your own port.

### Angular Frontend

The Angular frontend is what the user interacts with. Here the todos can be created, viewed, sorted, edited, completed, and deleted. To install Angular run  ``` npm install -g @angular/cli ```. To run the frontend follow these steps:

``` cd Angular-Todo-App ```  
``` cd todo-app ```  
``` npm i ```  
``` ng serve --open --host 0.0.0.0 --port 4200 --disable-host-check ```  

The frontend will be deployed to port 4200 on your IP. If this port is already taken you can modify step 2 from above to use an available port

