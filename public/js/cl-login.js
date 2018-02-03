$(function(){
  
  $(document).on("click", "[do=submitLogin]", function(e){
    e.preventDefault();
    var parent = $("form[for=login]");
    var username = parent.find("input[name=username]").val();
    var password = parent.find("input[name=password]").val();
    var canDo = 1;
    if(!username.length){
      //TODO: must enter username
      canDo = 0;
    }
    if(!password.length){
      //TODO: must enter pass
      canDo = 0;
    }
    if(canDo){
      socket.emit("login > sv", {username: username, password: password});
    }
  });
  
  socket.on("login > cl", function(data){
    if(data.error){
      //TODO: handle errors
      console.log(data.error);
    }else{
      $.cookie('userid', data.id, { expires: 30, path: '/' });
      $.cookie('userkey', data.userkey, { expires: 30, path: '/' });
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