class StyleFuncs{

    addOtherClasses(string, otherClasses = []){
        for(var i = 0; i < otherClasses.length; ++i){
            string += ` `+ otherClasses[i];
        }
        return string;
    }

    addOtherAttr(string, otherAttr = {}){
        for(var i = 0; i < Object.keys(otherAttr).length; ++i){
            string += ` `+ Object.keys(otherAttr)[i] +`="` + (otherAttr[Object.keys(otherAttr)[i]]) + `"`;
        }
        return string;
    }

    addCustomStyle(string, customStyle = {}){
        if(Object.keys(customStyle).length) string += ` style="`;
        for(var i = 0; i < Object.keys(customStyle).length; ++i){
            string += Object.keys(customStyle)[i] +`: `+ customStyle[Object.keys(customStyle)[i]] +`;`;
        }
        if(Object.keys(customStyle).length) string += `"`;
        return string;
    }

    getBasicElem(name, val, classes = [], attrs = {}, customStyle = {}){
        var ret = `<`+ name;
        if(classes.length){
            ret += ` class="`;
            ret = this.addOtherClasses(ret, classes);
            ret += `"`;
        }
        ret = this.addOtherAttr(ret, attrs);
        ret = this.addCustomStyle(ret, customStyle);
        ret += `>`+ val +`</`+ name +`>`;

        return ret;
    }

    getSingleElem(name, classes = [], attrs = {}, customStyle = {}){
        var ret = `<`+ name;
        if(classes.length){
            ret += ` class="`;
            ret = this.addOtherClasses(ret, classes);
            ret += `"`;
        }
        ret = this.addOtherAttr(ret, attrs);
        ret = this.addCustomStyle(ret, customStyle);
        ret += `>`;

        return ret;
    }

    getTitle(text, otherClasses = [], otherAttr = {}, customStyle = {}){
        otherClasses.unshift("title");
        return this.getBasicElem("div", text, otherClasses, otherAttr, customStyle);
    }

    getTitleDesc(text, otherClasses = [], otherAttr = {}, customStyle = {}){
        otherClasses.unshift("title-desc");
        return this.getBasicElem("div", text, otherClasses, otherAttr, customStyle);
    }

    getHR(version = 1, otherClasses = [], otherAttr = {}, customStyle = {}){
        otherClasses.unshift("hr_" + version);
        return this.getSingleElem("hr", otherClasses, otherAttr, customStyle);
    }

    getForm(whatFor, otherClasses = [], otherAttr = {}, customStyle = {}){
        otherAttr.for = whatFor;
        return this.getBasicElem("form", "", otherClasses, otherAttr, customStyle);
    }

    getInput(name, type, version = 1, otherAttr = {}, customStyle = {}, otherClasses = []){
        otherClasses.unshift(`input_` + version);
        otherAttr.type = type;
        otherAttr.name = name;

        return this.getSingleElem("input", otherClasses, otherAttr, customStyle);
    }

    getNameInput(name = "username", type = "text", version = 1, otherAttr = {placeholder : "Username"}, customStyle = {}, otherClasses = []){
        return this.getInput(name, type, version, otherAttr, customStyle, otherClasses);
    }

    getPassInput(name = "password", type = "password", version = 1, otherAttr = {placeholder : "Password"}, customStyle = {}, otherClasses = []){
        return this.getInput(name, type, version, otherAttr, customStyle, otherClasses);
    }

    getRepassInput(name = "repassword", type = "password", version = 1, otherAttr = {placeholder : "Retype your password"}, customStyle = {}, otherClasses = []){
        return this.getInput(name, type, version, otherAttr, customStyle, otherClasses);
    }
  
    getSearchInput(name = "searchBox", type = "search", version = 1, otherAttr = {placeholder : "Search..."}, customStyle = {}, otherClasses = []){
      otherClasses.unshift("inputWrap_" + version);
      var p = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
      p += this.getBasicElem("label", "", ["inputSearch_" + version + " icon-rightarrow"]);
      p += this.getInput(name, type, version);
      p += `</p>`
      return p;
    }

    getCheckbox(whatFor = "for", description, tog = 0, otherClasses = [], otherAttr = {}, customStyle = {}){
        var wrap = this.getSingleElem("div", ["checkboxWrap"]);
        if(tog) otherClasses.unshift("tgld");
        otherClasses.unshift("checkbox");
        otherAttr.for = whatFor;
        var cb = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        cb += `</div>`;
        wrap += cb;
        var cd = this.getBasicElem("div", description, ["checkDesc"]);
        wrap += cd;
        wrap += `</div>`;

        return wrap;
    }

    getButtons(buttons = [{text: 'string', do : 'action', primary : 0, otherClasses : [], otherAttr : {}, customStyle: {} }],centered = 0,version = 1,   otherClasses = [], otherAttr = {}, customStyle = {}){
        if(centered) otherClasses.unshift("centered");
        otherClasses.unshift("buttonsWrap");
        var bW = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        for(var i = 0; i < buttons.length; ++i){
            if(buttons[i].otherClasses === undefined)
                buttons[i].otherClasses = [];
            if(buttons[i].otherAttr === undefined)
                buttons[i].otherAttr = {};
            buttons[i].otherAttr.do = buttons[i].do;
            if(!buttons[i].primary) buttons[i].otherClasses.unshift("sec");
            buttons[i].otherClasses.unshift("button_" + version);
            var b = this.getBasicElem("div", buttons[i].text, buttons[i].otherClasses, buttons[i].otherAttr, buttons[i].customStyle);
            bW += b;
        }
        bW += `</div>`;
        return bW;
    }

    popFormWarn(elemName = "", reason = "", otherClasses = [], otherAttr = {}, customStyle = {}){
        otherClasses.unshift("formWarn");
        otherAttr.for = elemName;
        var warn = this.getBasicElem("div", reason, otherClasses, otherAttr, customStyle);
        $("input[name="+ elemName +"]").addClass("warn").after(warn);
    }
    
    popContextMenu(options = [{text: "Option", do: "action", otherCls: [], otherAttr: {}, customStyle: {}}], position = {x : '0', y : '0'}, version = 1, otherClasses = [], otherAttr = {}, customStyle = {}){
        otherClasses.unshift("contextMenu version_"+ version);
        var wrap = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        for(var i = 0; i < options.length; ++i){
            if(options[i].otherCls === undefined) options[i].otherCls = [];
            if(options[i].otherAttr === undefined) options[i].otherAttr = {};
            options[i].otherCls.unshift("contextMenuItem");
            options[i].otherAttr.do = options[i].do;
            wrap += this.getBasicElem("div", options[i].text, options[i].otherCls, options[i].otherAttr, options[i].customStyle);
        }
        wrap += `</div>`;
        $("body").prepend(wrap);
        var cM = $(".contextMenu:first");
        if( position.x + cM.outerWidth() > $(window).outerWidth() ) position.x = $(window).outerWidth() - cM.outerWidth();
        if( position.y + cM.outerHeight() > $(window).outerHeight() ) position.y = $(window).outerHeight() - cM.outerHeight();
        cM.css({top: position.y + "px", left: position.x + "px"});
    }
    
    popWarn(text = "text", expire = 0, version = 1, otherClasses = [], otherAttr = {}, customStyle = {}){
        if(!$(".warnsWrap").length) $("body").prepend(this.getBasicElem("div", "", ["warnsWrap"]));
        otherClasses.unshift("warnItem version_" + version);
        var wi = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        wi += this.getBasicElem("div", "", ["icon-close"], {do: "closeWarnItem"});
        wi += this.getBasicElem("span", text);
        wi += `</div>`;
        $(".warnsWrap").append(wi);
        if(expire){
            wi = $(".warnsWrap .warnItem:last");
            setTimeout(function(){
                wi.remove();
            }, expire)
        }
    }
    
    popAlert(text = "text", extraElements = [], canBeClosed = 1, expires = 0, overlay = 0, version = 1, otherClasses = [], otherAttr = {}, customStyle = {}){
        $(".alertWrapper").remove();
        otherClasses.unshift("alertWrapper version_" + version + ((overlay)?" wOverlay":""));
        if(canBeClosed) otherAttr.canClose = 1;
        var aW = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        aW += this.getSingleElem("div", ["alertBox animation-pop_in"]);
        aW += this.getBasicElem("div", text, ["alertBox_text"]);
        for(var i = 0; i < extraElements.length; ++i){
            aW += extraElements[i];
        }
        aW += `</div></div>`;
        $("body").prepend(aW);
        var remAnimTO = setTimeout(function (){
           $(".alertBox").removeClass("animation-pop_in"); 
        }, 500);
        if(expires){
            setTimeout(function (){
                clearTimeout(remAnimTO);
               $(".alertWrapper").remove(); 
            }, expires);
        }
    }
    
    getBusinessWindow(){
            return `<div class="menuWindowTop" for="business">
    <div class="menuWindowTopButtons">
    <div class="buttonsWrap">
    <div class="button_1 sec">My Businesses</div>
    <div class="button_1 sec">Businesses</div>
    <div class="button_1 sec">My Company</div>
    <div class="button_1 sec">Companies</div>
    </div>
    <div class="buttonsWrap">
    <div class="button_1 sec" do="createBusiness">Found a Business</div>
    </div>
    </div>

    </div>`;
    }
    
    getBusinessListWrap(){
        return `
<!-- list wrap -->
<div class="menuWindowListWrap" for="business">
<div class="menuWindowSearchWrap">
<p class="inputWrap_1" style="flex: 1">
<label class="inputSearch_1 icon-search"></label>
<input class="input_1" name="businessSearch" type="search">
</p>
<div class="buttonsWrap">
<div class="button_1 sec icon-filter" style="margin-left: 10px;"></div>
</div>
</div>
<div class="menuWindowListBox" for="business">

</div>
</div>
`;
    }
    
    getBusinessListItem(item = {}){
        return `<div class="menuWindowListBoxItemLine">
<div class="mwlbil-left">
<div class="mwlbil-l-item">`+ item.name +`</div>
</div>
<div class="mwlbil-right">
<div class="mwlbil-r-button icon-info"></div>
<div class="mwlbil-r-button icon-call"></div>
<div class="mwlbil-r-button icon-cog"></div>
</div>
</div>`;
    }

}

var Style = new StyleFuncs();

$(function () {

    $(document).ready(function(){

        $(document).on("click", ".checkboxWrap", function(){
           $(this).find(".checkbox").toggleClass("tgld");
        });
        
        $(document.body).on("click", function(e){
            if( $(".contextMenu").length && !$(e.target).closest(".contextMenu").length ){
                e.stopImmediatePropagation();
                e.preventDefault();
                $("[contextMenuSelected]").removeAttr("contextMenuSelected");
                $(".contextMenu")[0].remove();
            }
            
            if($(".tb-userpanelMenuWrap").length){
                e.preventDefault();
                $(".tb-userpanelMenuWrap").remove();
            }
            
            if( $(".alertWrapper").length && !$(e.target).closest(".alertBox").length ){
                e.stopImmediatePropagation();
                e.preventDefault();
                var canClose = $(".alertWrapper[canClose]").length;
                if(canClose){
                    $(".alertWrapper").remove();
                }else{
                    $(".alertBox").removeClass("animation-pop_in"); 
                    $(".alertBox").addClass("animation-shake");
                    setTimeout(function (){
                       $(".alertBox").removeClass("animation-shake"); 
                    }, 300);
                }
            }
        });
        
        $(document).on("click", "[closeAlert]", function(){
           $(".alertWrapper").remove(); 
        });
        
        $(document).on("click", "[closeContextMenu]", function(){
           $(this).parents(".contextMenu").remove(); 
        });
        
        $(document).on("click", `[do="closeWarnItem"]`, function(){
           $(this).parents(".warnItem").remove();
            if(!$(".warnsWrap .warnItem").length) $(".warnsWrap").remove();
        });

    });
});
