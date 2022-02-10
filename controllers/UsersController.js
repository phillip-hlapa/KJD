const User = require('../models/user')
const bcrypt = require('bcrypt');


module.exports.findUser = (req, res, next) => {
    console.log("searching for user")
    let data = req.body;
    let username = data.username;
    let password = data.password;
 
    User.findOne({username:username}).then(user => {
       if(!user) {
          console.log("user not found!")
          res.json({message: 'user not, you are not authorized to this service!!', status: 401})
       } else {
          console.log("user FOUND!")
          let isMatch = false;
          bcrypt.compare(password, user.password).then(function(result) {
             isMatch = result;
          });
          setTimeout(() => {
           if(isMatch) {
            //   res.json({message: isMatch, role: user.role, userId: user._id})
            next()
           } else {
              res.json({message: 'user not found, you are not authorized to this service!!', status: 401})
           }
          }, 4000);
 
       }
 
    }).catch(error => {
       res.json(error)
    })
 },

 module.exports.createUser = (req, res) => {
    const data = req.body;
    let create = false;
    //create user
    let password = "";
    bcrypt.hash(data.password, 10, function(err, hash) {
       //Store hash in your password DB.
       password = hash;
   });
 
   User.findOne({username: data.username}).then(user =>{
      console.log(user)
      if(!user) {
         create = true;
         console.log('we can create user, username not in db')
      } else {
        console.log('we cannot create user, username in db')
         create = false;
      }
   }).catch(error => {
       console.log(error)
   })
    //save new user
    setTimeout(() => {
       if (create) {
          newUser = new User({
             username: data.username,
             password: password,
            });
          User.create(newUser).then(success => {
             res.json({message: 'user created in database ' + success.username});
          }).catch(error => {
             res.json(error);
          })
       } else {
          res.json({message: 'username exists! please try registering to the service using a different username'})
       }
    }, 3000);
 }

 