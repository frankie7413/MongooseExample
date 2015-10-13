var express = require('express'),
    http = require("http"),
    bodyParser = require("body-parser"),
    app = express(),
    server = http.createServer(app),
    mongoose = require('mongoose');

//server stuff not really needed using terminal to check database
server.listen(3000);
console.log("Server is listening at http://localhost:3000/");

//connect mongoose to database
//mongo must be running i use the following command 
//mongod --dbpath /Users/franktosh/Desktop/mongooseExample/data/
mongoose.connect('mongodb://localhost/test');

//checks if your connection to database is a success or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  // yay!
  console.log('success');
});

//prepare how we will insert schema structure into database
var kittySchema = mongoose.Schema({
  name: String
});

//speak verifys if kitten object was assighned a name or not
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

//checking speak method 
var silence = new Kitten({name: 'Silence'});
console.log(silence.name); //'silence'

var rex = new Kitten({name: '' });
rex.speak(); //I don't have a name

//a cat named fluffy
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

//save fluffy
fluffy.save(function(err, fluffy){
  if (err) return console.error(err);
  fluffy.speak();
});


//more generic approach to inserting 
//data into db 
var testCat = 'Rocky';
var testCat2 = 'Bjork';
var testCat3 = 'Isobel';
litterbox(testCat);
litterbox(testCat2);
litterbox(testCat3);

//generic any cat can join the party 
//template to insert stuff without making new variables
function litterbox(alleyCat){
  var newCat = new Kitten({name: alleyCat});

  newCat.save(function(err, newCat){
    if (err) return console.error(err);
    newCat.speak();
  });
}

//finds all the cats!
Kitten.find(function(err, kittens){
  if(err) return console.error(err);
  console.log('finds all the cats!');
  for (x in kittens){
    console.log(kittens[x].name);
  }
})

//finds cat with fluff in name 
//can change to find anything in dp 
Kitten.find({ name: /^fluff/ }, function(err, cat){
  console.log('Searching for fluff...');
  console.log(cat[0].name);
});