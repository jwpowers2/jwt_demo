
function isLoggedIn(){

  if(localStorage.getItem('id') !== null){

    axios.get("/api/auth", {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${localStorage.getItem('id')}`
          }
     
        })
        .then(function(response){
        
          if(response.data.error){
            ;
          } else {
            
            window.location.replace("/home");

          }
        
        })
        .catch(function(error){

          ;
          
    });

  }

}

function setToken(data){
  console.log(data);
  return new Promise(resolve => {
    resolve(localStorage.setItem('id',data));
  })

}


async function goHome(data){
  var complete = await setToken(data);
  
    window.location.replace("/home");
  
}

function login(){

	axios.post("/api/login",{

        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
     
        })
        .then(function(response){
        
          if(response.data.error){
            console.log(response.data.error);
            document.getElementById("error").innerHTML = response.data.error;
          } else {
            
            goHome(response.data);
            
          }
        
        })
        .catch(function(error){

          ;
          
    });
}

function register(){

  axios.post("/api/register",{

        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value
     
        })
        .then(function(response){
        
          if(response.data.error){
            ;
          } else {
            //console.log(response.data);
            goHome(response.data);
            
          }
        
        })
        .catch(function(error){

          ;
          
    });

}