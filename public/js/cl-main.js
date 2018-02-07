var socket = io({transports: ['websocket']});

$(function () {
  
  $(document).ready(function(){
    
    //CHECK IF LOGGED IN
    if(typeof $.cookie('userid') !== 'undefined' && typeof $.cookie('userkey') !== 'undefined'){
      socket.emit("checkAccExists > sv", {userid: $.cookie('userid'), userkey: $.cookie('userkey')});
    }
    
    socket.on("checkAccExists > cl", function(data){
     if(data.error){
       $.removeCookie('userid', {path : '/'});
       $.removeCookie('userkey', {path : '/'});
       location.reload();
     } else{ // >> USER IS LOGGED
       $(".gameWindow").empty().prepend(Style.getButtons([{text : "Logout", do : "logout"}]));
       
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
      
      $(document).on("click", `[do="toLoginScreen"]`, function(){
         $(".firstScreen").addClass("tgld"); 
          $("body").append(`<div class="loginScreen"><div class="loginCol"></div></div>`);
          $(".loginCol").append(
              Style.getTitle("Login") +
              Style.getTitleDesc("Fill in your details then hit submit!") +
              Style.getHR()+
              Style.getForm("login")
          );
          $("form[for=login]").append(
              Style.getNameInput() +
              Style.getPassInput() +
              Style.getCheckbox("rememberMe", "Remember me", 1) +
              Style.getButtons([{ text : "Submit", do : "submitLogin" }, { text : "Cancel", do : "closeLoginScreen" }], 1)
          );
      });
      
      $(document).on("click", `[do="toRegisterScreen"]`, function(){
         $(".firstScreen").addClass("tgld"); 
          $("body").append(`<div class="loginScreen"><div class="loginCol"></div></div>`);
          $(".loginCol").append(
              Style.getTitle("Register") +
              Style.getTitleDesc("Fill in your details then hit submit!") +
              Style.getHR()+
              Style.getForm("register")
          );
          $("form[for=register]").append(
              Style.getNameInput() +
              Style.getPassInput() +
              Style.getRepassInput() +
              Style.getCheckbox("ruleAgree", "I agree to the <a href='#'>rules</a>") +
              Style.getButtons([{ text : "Submit", do : "submitRegister" }, { text : "Cancel", do : "closeLoginScreen" }], 1)
          );
      });
      
      $(document).on("click", `[do=closeLoginScreen]`, function(){
         $(".loginScreen").remove();
          $(".firstScreen").removeClass("tgld");
      });

      // STYLE

      $(document).on("mousemove", function(e){
          $(".firstScreenBacklight").css({top: e.pageY, left: e.pageX});
      });
    
  });
});

//TODO: warn(string) function, similar to alert()