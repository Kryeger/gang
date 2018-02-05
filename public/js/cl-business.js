$(function(){
  $(document).on("click", "[do=createBusiness]", function(){
    userinfo = {
      id: $.cookie("userid"),
      key: $.cookie("userkey")
    }
    socket.emit("create business > sv", [userinfo, {name: $("[for=businessName]").val(), capital: $("[for=capital]").val()}]);
  })
  
  $(document).on("click", "[do=closeBusiness]", function(){
    userinfo = {
      id: $.cookie("userid"),
      key: $.cookie("userkey")
    }
      socket.emit("close business > sv", [userinfo, {id: $("[for=businessId]").val()}]);
  });
  /*
  socket.on("update business list > cl", function(companies){
    console.log("test", companies);
    $("[for=businessList]").empty();
    _.forEach(companies, function(el, index, list){
      $("[for=businessList]").append("<li>" + el.name + "</li>");
    });
  });*/
});