var User = require("mongoose").model("User");
var axios = require('axios');
let bcrypt = require("bcrypt-as-promised");
var jwt = require('jsonwebtoken');
var jwt_key   = process.env.JWT_KEY;


class UserController{
  
  question(req,res){
    
    let q = req.query.yes_no_question;

    let query = encodeURI(q);
    
    var token = req.headers['x-access-token'];
    jwt.verify(token, jwt_key, (err, authdata)=>{

      if (err) {
        res.sendStatus(403);
      } else { 

         axios.get("https://8ball.delegator.com/magic/JSON/" + query, {

           headers: {
             'Content-Type':'application/json',

           }

         })
         .then((response)=>{

           if(response.data.error){

             res.render("index", {message: JSON.stringify(response.data.error)});

           } else {

             let responses = {};

             User.findOne({_id:authdata.jwtid}, (err,user)=>{

               //console.log(response.data.magic.type);
               //console.log(authdata.jwtid);
               user.answerTypes.push(response.data.magic.type);
               responses['answer'] = response.data.magic.answer;
               responses['answerType'] = user.answerTypes;
               user.save((err)=>{

                 if (err){
                   ;
                 } else {
                   res.json(responses);
                
                 }
               }) 
             })
           }
         })
         .catch((error)=>{

           res.render("index", {message: JSON.stringify(response.data.error)});

         });

      }

    });

  }

  register(req,res){

    User.findOne({email:req.body.email}, (err,olduser)=>{

      if(olduser) {

        res.redirect("/");

      } else {
      
        let user = new User(req.body);

        bcrypt.hash(user.password, 10)

        .then(hashed_password => {
          user.password = hashed_password;
          user.save((err)=>{
            if (err){
              res.redirect("/");
            } else {
              
              User.findOne({email:req.body.email}, (err,newuser)=>{
                  
                  if(newuser) {

                    console.log(newuser);
                    
                    
                    let newtoken = jwt.sign({
                    	jwtid:newuser._id,
                    }, jwt_key, {expiresIn: '1h'});

                    res.json(newtoken);

                  } else {
                    
                    res.redirect("/");
                  }

              });
            }
          })
        })
        .catch((err)=>{
          res.render("login", {message:"problems with your registration data"});
        })
      }
    });

  }

  login(req,res){
    
    User.findOne({email:req.body.email}, (err,user)=>{
      if (!user){
        console.log("user not found");
        res.json({error:"user not found"});
        
      } else if (err){
        res.json({error:"login error"});
      } else {
      
        bcrypt.compare(req.body.password, user.password)
        .then((result)=>{
         
          
          let newtoken = jwt.sign({
            jwtid:user._id,
          }, jwt_key, {expiresIn: '1h'});

          res.json(newtoken);

        })
        .catch((err)=>{
          res.render("login",{message:"authentication problems"});
        })
      }

    })
    
  }

  answertypes(req,res){
    
    var token = req.headers['x-access-token'];
    jwt.verify(token, jwt_key, (err, authdata)=>{

      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else { 
        
        //console.log(authdata.jwtid);
        
      	User.findOne({_id:authdata.jwtid}, (err,user)=>{

      		if (err){
      			console.log('error with finding user infor for home page');
      		} else {

      			res.json(user.answerTypes);
      		}
      	});
         
      }

    });
  }
  auth(req,res){
    
    var token = req.headers['x-access-token'];
    jwt.verify(token, jwt_key, (err, authdata)=>{

      if (err) {
        console.log(err);
        res.json({error:"bad token"});
      } else { 
        
        //console.log(authdata.jwtid);
        
        User.findOne({_id:authdata.jwtid}, (err,user)=>{

          if (err){
            console.log('error with finding user infor for home page');
            res.json({error:"bad token"});
          } else {

            res.json({isUser:true});
          }
        });
         
      }

    });
  }

}

module.exports = new UserController();