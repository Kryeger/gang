$(function (){
  
  $(document).on("click", "[do=submitRegister]", function(e){
    e.preventDefault();
    var parent = $("form[for=register]");
    var username = parent.find("input[name=username]").val();
    var password = parent.find("input[name=password]").val();
    var repassword = parent.find("input[name=repassword]").val();
    var canDo = 1;
    if(username.length < 3){
      //TODO: username too short
      canDo = 0;
    } else if(username.length > 32){
      //TODO: username too long
      canDo = 0;
    }
    //TODO: check pass strength
    if(password.length < 6){
      //TODO: pass 2 short
      canDo = 0;
    } else if(password.length > 32){
      //TODO: pass 2 long
      canDo = 0;
    } else {
      if(password != repassword){
        //TODO: passes don't match
        canDo = 0;
      }
    }
    
    if(canDo){
      socket.emit("register > sv", {username: username, password: password});
    }
  });
  
  socket.on("register > cl", function(data){
    if(data.error){
      //TODO: handle errors
      console.log(data.error);
    }
  });
  
});