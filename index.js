var express = require('express'); //require the just installed express app
var app = express(); //then we call express

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //template

//the word array with initial placeholders for added word
var word = ["socks", "practise"];
var complete = [];

//function
function addingNewWord (req, res) {  //post route for adding new word
    var newWord = req.body.newword;
    word.push(newWord);  //add the new word from the post route into the array
    res.redirect("/");  //after adding to the array go back to the root route    
}

function renderDisplay(req, res) {  //render the ejs and display added word
    res.render("index", { word: word, complete: complete });
}

// call function

app.post('/addword', addingNewWord); //call function add word


app.post("/removeword", function(req, res) {
     var completeWord = req.body.check;

//check for the "typeof" the different completed word, then add into the complete word
     if (typeof completeWord === "string") {
          complete.push(completeWord);

//check if the completed word already exist in the word when checked, then remove using the array splice method
          word.splice(word.indexOf(completeWord), 1);

     } else if (typeof completeWord === "object") {
         for (var i = 0; i < completeWord.length; i++) {     
             complete.push(completeWord[i]);
             word.splice(word.indexOf(completeWord[i]), 1);
         }
     }
     res.redirect("/");
});

app.get("/", renderDisplay) 
//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
