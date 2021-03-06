var socket = io({transports: ['websocket']});
$(function () {
  
  function userObj(){
    return {id: $.cookie('userid'), key: $.cookie('userkey')};
  }

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
       $(".gameWindow").empty();
       logged = 1;
      $(".gameWindow").prepend(`
<div class="bigmapplaceholder"></div>
<div class="topbarWrap">
<div class="topbarlogoWrap">
</div>

<div class="topbarRight">
<div class="topbarUserpanel">
<div class="tbup-username">`+ data.username +`</div>
<div class="tbup-profilepic"></div>
<div class="tbup-menuTog" do="toggleUserpanelSettings"><i class="icon-dotmenu"></i></div>
</div>
</div>
</div>
<div class="sideMenuWrap">
          <div class="sideMenuItem icon-business" itemName="Businesses" do="openMenu" menuItem="business"></div>
          <div class="sideMenuItem icon-edit_icon" itemName="Lorem"></div>
          <div class="sideMenuItem icon-feature_icon" itemName="Ipsum"></div>
          <div class="sideMenuItem icon-rightarrow"></div>
        </div>
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
              Style.getButtons([{ text : "Submit", do : "submitLogin", primary : 1 }, { text : "Cancel", do : "closeLoginScreen" }], 1)
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
              Style.getButtons([{ text : "Submit", do : "submitRegister", primary: 1 }, { text : "Cancel", do : "closeLoginScreen" }], 1)
          );
      });

      $(document).on("click", `[do=closeLoginScreen]`, function(){
         $(".loginScreen").remove();
          $(".firstScreen").removeClass("tgld");
      });
    
    $(document).on("click", "[do=openMenu]", function(){
      $(this).toggleClass("tgld");
      if($(this).hasClass("tgld")){
        $(this).addClass("icon-close");
        $(".sideMenuWrap").addClass("tgld");
        if(!$(".menuWindowWrap").length){
          $(".gameWindow").prepend(Style.getBasicElem("div", "", ["menuWindowWrap"]));
        }
        $(".menuWindowWrap").empty();
        var menuItem = $(this).attr("menuItem");
        switch(menuItem){
          case 'business':
            $(".menuWindowWrap").append(Style.getBusinessWindow());
            $(".menuWindowTop").append(Style.getBusinessListWrap());
            break;
        }
      }else{
        $(".sideMenuWrap").removeClass("tgld");
        $(".sideMenuItem").removeClass("icon-close");
        $(".menuWindowWrap").remove();
      }
    });
    
      //ACTIONS - BUSINESS
    
      $(document).on("click", "[do=createBusiness]", function(){
        socket.emit("create business > sv", [userObj(), {
          name: "biz1",
          capital: 100,
          type: "taxi"
        }]);
      });
        
      $(document).on("click", "[do=refreshBusinessList]", function(){
        socket.emit("refresh business list > sv", [userObj(), {
          all: 1 //TODO: ability to show only owned businesses, not all. temp always 1
        }]);
      }); 
      
      socket.on("refresh business list > cl", function(arr){
        $(".menuWindowListBox").empty();
        _.forEach(arr, function(el, index, list){
          $(".menuWindowListBox").append(Style.getBusinessListItem(el));
        });
      });
    
      $(document).on("click", "[do=applyForJob]", function(){
        
        socket.emit("apply for job > sv", [userObj(), $(this).attr("businessid")]);
        
      });
        
      //ACTIONS - UI
      });
      
      $(document).on("click", `[do=toggleUserpanelSettings]`, function(e){
          $(".tb-userpanelMenuWrap").remove();
          let top = $(".topbarWrap").offset().top + $(".topbarWrap").outerHeight();
          let right = $(window).outerWidth() - ($(".topbarWrap").offset().left + $(".topbarWrap").outerWidth());
         $("body").prepend(`
<div class="tb-userpanelMenuWrap" style="top: `+ top +`px; right: `+ right +`px;">
<div class="tb-userpanelMenuItem">Settings</div>
<hr>
<div class="tb-userpanelMenuItem" do="toChangelogScreen">Changelog</div>
<hr>
<div class="tb-userpanelMenuItem" do="logout">Logout</div>
</div>
`);
      });

      // STYLE

      $(document).on("mousemove", function(e){
          $(".firstScreenBacklight").css({top: e.pageY, left: e.pageX});
      });

  });
  
//TODO: warn(string) function, similar to alert()
