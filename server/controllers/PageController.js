var User = require("mongoose").model("User");

class PageController{
  
  login(req,res){
    res.render("login");
  }

  home(req,res){
   
    res.render("index");
    
  }
}

module.exports = new PageController();