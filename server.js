const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb+srv://sivac88:<password>@cluster0-ptbi6.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var UserSchema = new mongoose.Schema({
  username : String,
  password : String
});


var User= mongoose.model('User', UserSchema);

app.post('/login',function(req, res) {
    if(req.body.username == "admin" && req.body.password == "admin") 
    	res.json({ message: 'login successful' });
    else
	res.json({ message: 'login failure'});
});

app.post('/register',function(req, res) {
    var user = new User({'username' : req.body.username,'password' : req.body.password})
    user.save(function(err,savedUser){
         if(err)
               res.json({'message' : 'failure'})
	else
		res.json({'message' : 'success'})
    });
});


app.get('/users',function(req, res) {
    User.find({},function(err,users){
         res.json(users);
    });
});

app.post('/find',function(req, res) {
    User.find({username : req.body.username},function(err,userObj){
         res.json(userObj);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))