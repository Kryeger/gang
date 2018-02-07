$(function(){
    $(document).on("click", "[do=createCompany]", function(){
        userinfo = {
            id: $.cookie("userid"),
            key: $.cookie("userkey")
        }
        socket.emit("create company > sv", [userinfo, {name: $("[for=companyName]").val(), capital: $("[for=capital]").val()}]);
    })
    socket.on("update company list > cl", function(companies){
        console.log("test", companies);
        $("[for=companyList]").empty();
        _.forEach(companies, function(el, index, list){
            $("[for=companyList]").append("<li>" + el.name + "</li>");
        });
    });
});