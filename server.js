//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

// Create a server to listen at port 8080
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
//Step 1: Create a new user variable
var user = {
    "user6": {
    "company":"Mcdo",
    "name":"Jason",
    "Positions":"Crew",
    "Location":"Davao",
    "id":6,
    }
   } 
   

//The addUser endpoint
app.post('/addUser', function(req, res){
    //Step 2: read existing users
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append user variable to list
        data["user6"] = user["user6"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})
//Endpoint to get a single user by id
app.get('/:id', function (req, res) {
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })
 //Code to delete a user by id
 var id = 3;
 app.delete('/deleteUser', function (req, res) {
    // First retrieve existing users
    fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 3];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })
 
 //http://localhost:3000/getByComp?company=Mcdo
 app.get('/getByComp', function (req, res) {
    fs.readFile(__dirname + '/' + 'user.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const users = JSON.parse(data);
      const company = req.query.company; // Get the company name from the query parameters
  
      if (!company) {
        res.status(400).json({ error: 'Company name is required in query parameters' });
        return;
      }
  
      const usersInCompany = Object.values(users).filter((user) => user.company === company);
  
      if (usersInCompany.length > 0) {
        res.json(usersInCompany);
      } else {
        res.status(404).json({ error: 'No users found for the specified company' });
      }
    });
  });
