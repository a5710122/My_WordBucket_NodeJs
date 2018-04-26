var express = require('express'); //require the just installed express app
var app = express(); //then we call express

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //template

//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];

//function
function addingNewTask (req, res) {  //post route for adding new task
    var newTask = req.body.newtask;
    task.push(newTask);  //add the new task from the post route into the array
    res.redirect("/");  //after adding to the array go back to the root route    
}

function renderDisplay(req, res) {  //render the ejs and display added task
    res.render("index", { task: task});
}

// call function
app.get("/", renderDisplay) 
app.post('/addtask', addingNewTask); //call function add word

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
