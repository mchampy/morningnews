var mongoose = require('mongoose');   

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
      useUnifiedTopology : true
 }
 mongoose.connect('mongodb+srv://mathilde:lacapsule@cluster0.eurtx.mongodb.net/morningnews?retryWrites=true&w=majority',   
  options,    
  function(err) {
   console.log(err);
  }
 );

 module.exports = mongoose