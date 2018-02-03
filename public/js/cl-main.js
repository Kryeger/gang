var socket = io({transports: ['websocket']});

$(function () {
  
  $(document).ready(function(){
    
    //CHECK IF LOGGED IN
    if(typeof $.cookie('userid') === 'undefined' || typeof $.cookie('userkey') === 'undefined'){
      $("body").prepend(`
<div for="isGuest">
  <div do="toLogin">Login</div>
  <div do="toRegister">Register</div>
</div>
`);
    }else{
      socket.emit("checkAccExists > sv", {userid: $.cookie('userid'), userkey: $.cookie('userkey')});
    }
    
    socket.on("checkAccExists > cl", function(data){
     if(data.error){
       $.removeCookie('userid', {path : '/'});
       $.removeCookie('userkey', {path : '/'});
       location.reload();
     } else{ // >> USER IS LOGGED
       $("body").prepend(`
<div do="logout">Logout</div>
`);
       
     } // << USER IS LOGGED
    }); 
    
    $(document).on("click", "[do=toRegister]", function(){
      $("[for=isGuest]").remove();
      $("body").prepend(`<div for="registerWrap"></div>`);
      $("[for=registerWrap]").load("../html/register.html");
    });
    
    $(document).on("click", "[do=toLogin]", function(){
      $("[for=isGuest]").remove();
      $("body").prepend(`<div for="loginWrap"></div>`);
      $("[for=loginWrap]").load("../html/login.html");
    });
    
  });
});

//TODO: warn(string) function, similar to alert()