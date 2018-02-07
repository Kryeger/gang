$(function () {
    
    function getChangelogChange(chType, content){
        var chTypeClass = "";
        switch(chType){
            case "bug":
                chTypeClass = "icon-bug_icon";
                break;
            case "edit":
                chTypeClass = "icon-edit_icon";
                break;
            case "feature":
                chTypeClass = "icon-feature_icon";
                break;
        }
        return `<div class="changelogChange">` + ((chType)?(`<div class="`+ chTypeClass +` changelogChangeType" chlogType="`+ chType +`"></div>`):``) +

            `<div class="changelogChangeText">`+ content +`</div>
</div>`;
    }
    
    function changelogAcceptChange(){
        if(!($(`.changelogChange[editChange]`).length) || !($(".changelogGroupWrap[editEntry]").length)) return;
        var chType = 0;
        if( $(".changelogChangeTypeSelect div.tgld").length ){
            chType = $(".changelogChangeTypeSelect div.tgld").attr("chlogType");
        }
        var content = $("textarea.changelogChangeText").val();
        
        if($(`.changelogChange[hiddenChange]`).length){
            var hC = $(`.changelogChange[hiddenChange]`);
            hC.after(getChangelogChange(chType, content));
            hC.remove();
        }else{
            $(".changelogChangesWrap .buttonsWrap").before(getChangelogChange(chType, content));
        }
        
        $(`.changelogChange[editChange]`).remove();
        
    }
    
    function changelogNewChange(){
        if(!($(".changelogGroupWrap[editEntry]").length)) return;
        changelogAcceptChange();
        $(".changelogChangesWrap .buttonsWrap").before(`
<div class="changelogChange" editChange>
<div class="changelogChangeTypeSelect">
<div class="icon-bug_icon" chlogType="bug"></div>
<div class="icon-feature_icon" chlogType="feature"></div>
<div class="icon-edit_icon" chlogType="edit"></div>
</div>
<div class="changelogChangeAccCan">
<div class="icon-check" do = "chAccChange" ></div>
<div class="icon-close" do = "chCanChange" ></div>
</div>
<textarea class="changelogChangeText">So what's new?</textarea>
</div>
        `);
    }
    
    function updateChangelogDB(){
        CHANGELOG.asd = 'qwe';
        var s = "var CHANGELOG = " + JSON.stringify(CHANGELOG) +";";
        
        socket.emit("changelog > sv", {content: s});
    }

    $(document).ready(function(){

        $(document).on("click", `.changelogGroupTog`, function(){
            $(this).parents(`.changelogGroupWrap`).toggleClass("tgld").find(".changelogChangesWrap").animate({height: 'toggle'}, 300);    
        });
        
        $(document).on("click", `[do="newChangelogEntry"]`, function(){
            
            $(".changelogScreenWrapper").prepend();
        });
        
        $(document).on("click", `[do="changelogTogAutoDate"]`, function(){
           $(this).toggleClass("tgld"); 
            if($(this).hasClass("tgld")){
                var D = new Date();
                var d = D.toLocaleString("en-us", { day: "2-digit" });
                var m = D.toLocaleString("en-us", { month: "short" });
                var y = D.getFullYear();
                $(`input[name="changelogEntryDate"]`).attr("disabled", 1).val(d + " " + m + " " + y);
            }else{
                $(`input[name="changelogEntryDate"]`).removeAttr("disabled");
            }
        });
        
        $(document).on("click", `.changelogChangeTypeSelect div`, function(){
            $(".changelogChangeTypeSelect div").not(this).removeClass("tgld");
            $(this).toggleClass("tgld");
        });
        
        $(document).on("click", `[do = "chCanChange"]`, function(){
            $(`.changelogChange[editChange]`).remove();
            $(`.changelogChange[hiddenChange]`).removeAttr("hiddenChange").animate({height: 'toggle'}, 300);
        });
        
        $(document).on("click", `[do = "chAccChange"]`, function(){
            changelogAcceptChange();
        });
        
        $(document).on("click", `[do="newChangelogChange"]`, function(){
            changelogNewChange();
        });
        
        $(document).keydown(function(e) {
            if(!($(".changelogGroupWrap[editEntry]").length)) return;
            if (e.keyCode == 13 && e.ctrlKey) {
                changelogNewChange();
            }
        });

    });
});
