$(function (){
  
  $(document).on("click", "[do=submitRegister]", function(e){
    e.preventDefault();
      var parent = $("form[for=register]");
      parent.find("input.warn").removeClass("warn");
      parent.find(".formWarn").remove();
    var username = parent.find("input[name=username]").val();
    var password = parent.find("input[name=password]").val();
    var repassword = parent.find("input[name=repassword]").val();
      var agree = parent.find(".checkbox.tgld[for=ruleAgree]").length;
    var canDo = 1;
    if(username.length < 3){
        Style.popFormWarn("username", "Username is too short! At least 3 characters!");
      canDo = 0;
    } else if(username.length > 32){
        Style.popFormWarn("username", "Username is too long! No more than 32 characters!");
      canDo = 0;
    }
    //TODO: check pass strength
      if(password.length < 6){
          Style.popFormWarn("password", "Password is too short! At least 6 characters!");
      canDo = 0;
      } else if(password.length > 32){
          Style.popFormWarn("password", "Password is too long! No more than 32 characters!");
      canDo = 0;
    } else {
        if(password != repassword){
            Style.popFormWarn("repassword", "The passwords don't match!");
        canDo = 0;
      }
    }
      if(!agree){
          canDo = 0;
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