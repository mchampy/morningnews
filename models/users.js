var mongoose = require('mongoose');  

var articleSchema = mongoose.Schema ({
   source: String,
   title: String, 
   description: String, 
   urlToImage: String, 
   content: String,
   language: String
})

var userSchema = mongoose.Schema ({
   username: String,
   email: String,
   password: String,
   token: String,
   article: [articleSchema]
})

var userModel = mongoose.model('users', userSchema);

   module.exports = userModel;
