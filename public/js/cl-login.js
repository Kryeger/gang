$(function(){
    
    var rememberMe = 0;
  
  $(document).on("click", "[do=submitLogin]", function(e){
    e.preventDefault();
      var parent = $("form[for=login]");
      parent.find("input.warn").removeClass("warn");
      parent.find(".formWarn").remove();
    var username = parent.find("input[name=username]").val();
    var password = parent.find("input[name=password]").val();
    rememberMe = $(".checkbox.tgld[for=rememberMe]").length;
    var canDo = 1;
    if(!username.length){
      Style.popFormWarn("username", "You must enter an username");
      canDo = 0;
    }
      if(!password.length){
          Style.popFormWarn("password", "You must enter a password");
      canDo = 0;
    }
    if(canDo){
      socket.emit("login > sv", {username: username, password: password});
    }
  });
  
  socket.on("login > cl", function(data){
      console.log(1);
    if(data.error){
      //TODO: handle errors
      console.log(data.error);
    }else{
        if(rememberMe){
            $.cookie('userid', data.id, { expires: 30, path: '/' });
            $.cookie('userkey', data.userkey, { expires: 30, path: '/' });
        }else{
            $.cookie('userid', data.id, { path: '/' });
            $.cookie('userkey', data.userkey, { path: '/' });
        }
      location.reload();
    }
  });
  
  // LOGOUT
  
  $(document).on("click", "[do=logout]", function(){
    socket.emit("logout > sv", $.cookie("userid"));
    $.removeCookie('userid', {path : '/'});
    $.removeCookie('userkey', {path : '/'});
    location.reload();
  });
  
});