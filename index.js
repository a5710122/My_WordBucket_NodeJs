//require the just installed express app
var express = require('express');

//then we call express
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.set('view engine', 'ejs');


//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];

//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;

//add the new task from the post route into the array
    task.push(newTask);

//after adding to the array go back to the root route
    res.redirect("/");
});

//render the ejs and display added task, task(index.ejs) = task(array)

app.get("/", function(req, res) {
    res.render("index", { task: task});
});

