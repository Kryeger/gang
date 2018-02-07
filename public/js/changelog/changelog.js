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
        var s = "var CHANGELOG = " + JSON.stringify(CHANGELOG) +";";
        
        socket.emit("changelog > sv", {content: s});
    }
    
    function updateChangelogScreen(){
        $(".changelogScreenWrapper").empty();
        for(var i = 0; i < CHANGELOG.length; ++i){
            $(".changelogScreenWrapper").append(`
<div class="changelogGroupWrap" chentryid="`+ i +`">
<div class="icon-rightarrow changelogGroupTog"></div>
<div class="changelogTitle"><b>`+ CHANGELOG[i].title +`</b>`+ ((CHANGELOG[i].date)?(`<span>`+ CHANGELOG[i].date +`</span>`):``) +`</div>
<div class="changelogChangesWrap">

</div>
</div>
`);
            for(var j = 0; j < CHANGELOG[i].updates.length; ++j){
                $(".changelogGroupWrap[chentryid="+i+"] .changelogChangesWrap").append(getChangelogChange(CHANGELOG[i].updates[j].type, CHANGELOG[i].updates[j].content));
            }
        }
    }

    $(document).ready(function(){

        $(document).on("click", `.changelogGroupTog`, function(){
            $(this).parents(`.changelogGroupWrap`).toggleClass("tgld").find(".changelogChangesWrap").animate({height: 'toggle'}, 300);    
        });
        
        $(document).on("click", `[do="newChangelogEntry"]`, function(){
            if($(".changelogGroupWrap[editEntry]").length) return;
            $(".changelogScreenWrapper").prepend(`
<div class="changelogGroupWrap" newEntry editEntry>
<div class="changelogTitle">
<input class="input_1" name="changelogEntryTitle" placeholder="Entry Title" style="flex: 2; margin-right: 5px;">
<input class="input_1" name="changelogEntryDate" placeholder="Entry Date" style="flex: 1;">
<div class="changelogTitleNewEntryAutoDate" do="changelogTogAutoDate">Auto</div>
</div>
<div class="changelogChangesWrap" style="border-bottom: #454553 solid 1px;">



<div class="buttonsWrap centered">
<div class="button_1 sec" do="newChangelogChange">New Update</div>
</div>
</div>
<div class="buttonsWrap centered">
<div class="button_1" do="saveNewChangelogEntry">Save</div>
<div class="button_1 sec" do="cancelChangelogEdit">Cancel</div>
</div>
</div>
`);
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
        
        $(document).on("click", `[do="saveNewChangelogEntry"]`, function(){
            if(!($(".changelogGroupWrap[editEntry]").length)) return;
           var newEntry = {};
            newEntry.title = $("input[name=changelogEntryTitle]").val();
            newEntry.date = $("input[name=changelogEntryDate]").val();
            var canDo = 1;
            
            if(!newEntry.title.length){
                //TODO: warn
                canDo = 0;
            }
            if(!newEntry.date.length){
                newEntry.date = 0;
            }
            
            if(!canDo) return;
            if($(`[do="changelogTogAutoDate"]`).hasClass("tgld")){
                var D = new Date();
                var d = D.toLocaleString("en-us", { day: "2-digit" });
                var m = D.toLocaleString("en-us", { month: "short" });
                var y = D.getFullYear();
                newEntry.date = d + " " + m + " " + y;
            }
            newEntry.updates = [];
            $(".changelogGroupWrap[editEntry] .changelogChangesWrap .changelogChange:not([editChange])").each(function(){
                var newUpdate = {};
                newUpdate.type = 0;
                if($(this).find(".changelogChangeType[chlogType]").length){
                    newUpdate.type = $(this).find(".changelogChangeType[chlogType]").attr("chlogType");
                }
                newUpdate.content = $(".changelogChangeText").html();
                newEntry.updates.push(newUpdate);
            });
            CHANGELOG.unshift(newEntry);
            updateChangelogDB();
            updateChangelogScreen();
        });
        
        $(document).on("click", `[do="toChangelogScreen"]`, function(){
            $(".firstScreen").addClass("tgld");
            $("body").append(`
<div class="changelogScreen">

<div class="changelogScreenTop">
<div class="changelogScreenTopLeft">
<div class="title">Changelog</div>
<div class="title-desc">See what's new and what has changed</div>
</div>
<div class="changelogScreenTopRight">
<div class="buttonsWrap">
<div class="button_1 sec" do="newChangelogEntry">New Entry</div>
</div>
</div>
</div>

<div class="changelogScreenWrapper"></div>
</div>
`); 
            updateChangelogScreen();
        });

    });
});
