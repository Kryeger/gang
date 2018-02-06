$(function(){
  //NOTE: this might cause problems
  userinfo = {
      id: $.cookie("userid"),
      key: $.cookie("userkey")
    }
  
  $(document).on("click", "[do=createBusiness]", function(){
    socket.emit("create business > sv", [userinfo, {name: $("[for=businessName]").val(), capital: $("[for=capital]").val(), type: $("[for=businessType]").val()}]);
  })
  
  $(document).on("click", "[do=closeBusiness]", function(){
    socket.emit("close business > sv", [userinfo, {id: $("[for=businessId]").val()}]);
  });
  
  $(document).on("click", "[do=refreshBusinessList]", function(){
    socket.emit("refresh business list > sv", [userinfo]);
  });
  
  socket.on("refresh business list > cl", function(arr){
    $("[for=businessList]").empty();
    _.forEach(arr, function(el, index, list){
      $("[for=businessList]").append(`<li> ` + el.name + `, #` + el.id + `</li>`);
    });
  });
  
  $(document).on("click", "[do=refreshPlayerList]", function(){
    socket.emit("refresh player list > sv", [userinfo]);
  });
  
  socket.on("refresh player list > cl", function(arr){
    $("[for=playerList]").empty();
    _.forEach(arr, function(el, index, list){
      $("[for=playerList]").append(`<li> ` + el.player.fullName + `, #` + el.id + `</li>`);
      console.log(el);
    });
  });
});