let UserController = require("../controllers/UserController.js");
let PageController = require("../controllers/PageController.js");

module.exports = (app)=>{

  app.get("/",PageController.login);
  app.get("/home",PageController.home);
  app.get("/api/question",UserController.question);
  app.get("/api/answertypes",UserController.answertypes);
  app.post("/api/register",UserController.register);
  app.get("/api/auth",UserController.auth);
  app.post("/api/login",UserController.login);
  
}