const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const fs = require('fs');

var app = express(); //then we call express
var jsonParser = bodyParser.json();

var path    = require("path");
app.use(express.static(path.join(__dirname, 'public')));

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


app.get('/', function (req, res) {
    res.render("index2", { word: word, complete: complete })
})

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


app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/registration', function (req, res) {
    res.render('registration');
});

app.post('/registration', function (req, res) {
    const saltRounds = 10000
    bcrypt.genSalt(saltRounds, function (err, getsalt) {
        bcrypt.hash(req.body.password, getsalt, function (err, gethash) {
            salt = getsalt
            hash = gethash
            const json = {
                email: req.body.email,
                salt: salt,
                hash: hash,
                iterations: saltRounds,
            }
            const jsonString = JSON.stringify(json)
            fs.writeFile('myuser.json', jsonString, 'utf8', function () {
                res.send('ok : ' + req.body.email + ', ' + req.body.password + ' Salt : ' + salt + ' Hash : ' + hash)
            });
        })
    })
})

app.post('/login', function (req, res) {
    let obj = {} //สร้าง object เปล่าๆรอ
    fs.readFile('myuser.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data)
            if (obj.email == req.body.email) { // check ว่า email ที่ผู้ใช้กรอกมาใหม่ ตรงกับที่เราเก็บข้อมูลไว้หรือไม่
                bcrypt.compare(req.body.password, obj.hash, function (err, result) {
                    if (result) {
                        //ถ้า result == true รหัสผ่านตรง
                        res.send('ยินดีด้วยคุณลงชื่อเข้าใช้งานได้แล้ว')
                        //TODO: เก็บข้อมูลผู้ใช้ไว้บน session
                    }
                    else {
                        //ถ้า result == false รหัสผ่านไม่ตรง
                        res.send('รหัสผ่านไม่ถูกต้อง')
                    }
                })
            }
            else{
                res.send('เราไม่พบ Email ของคุณ')
            }
        }
    })
})

app.get('/aboutpage', function (req, res) {
    res.render('about');
});


//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
