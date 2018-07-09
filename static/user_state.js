function logOut(){
  localStorage.clear();
  isLoggedIn();
}


function getId() {
    return localStorage.getItem('id');
   
}

function setId(){
  document.getElementById("message").innerHTML = 'Cross-Examine the 8-ball!';
  
}

function isLoggedIn(){
  
  if(localStorage.getItem('id') === null){

    window.location.replace("/");

  } else {

    axios.get("/api/auth", {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${getId()}`
          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            window.location.replace("/");
          } else {
            
            ; // do nothing

          }
        
        })
        .catch((error)=>{

          ;
          
    });

  }

}



function makeQuestion(){
	
	let question = document.getElementById("questionForm").value;
  if(!question.length > 0){
    console.log("too short");
    document.getElementById("questionForm").placeholder = "you need to enter a question";
  } else {
  
	let url = "/api/question";

	axios.get(url, {

          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${getId()}`

          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            ;
          } else {
            //console.log(response.data);
            document.getElementById("questionForm").value = '';
            document.getElementById("message").innerHTML = response.data.answer;
            makeTable(response.data.answerType, "log_content");
          }
        
        })
        .catch((error)=>{

          ;
        
    });
    document.getElementById("questionForm").placeholder = "Your Question";    
  }
}

function makeTable(data, destination){

            let table_string = "<table>";
            data.forEach((type)=>{
              //console.log(type);
              let color = 'gray';
              if(type === 'Contrary'){
                color = 'red';
              } else if (type === 'Affirmative'){
                color = 'green';
              }
              table_string += "<tr><td ";
              table_string += "class='log_item ";
              table_string += color;
              table_string += "'>";
              table_string += type;
              table_string += "</td></tr>"
            });
            table_string += "</table>";
            document.getElementById(destination).innerHTML = table_string;


}

function loadInitialData(){
	
  axios.get("/api/answertypes", {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${getId()}`
          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            ;
          } else {
            console.log("JWT is: " + `${localStorage.getItem('id')}`);
            makeTable(response.data, "log_content");

          }
        
        })
        .catch((error)=>{

          ;
          
    });
}