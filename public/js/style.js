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
    
    getButtons(buttons = [{text: 'string', do : 'action', otherClasses : [], otherAttr : {}, customStyle: {} }],centered = 0,version = 1,   otherClasses = [], otherAttr = {}, customStyle = {}){
        if(centered) otherClasses.unshift("centered");
        otherClasses.unshift("buttonsWrap");
        var bW = this.getSingleElem("div", otherClasses, otherAttr, customStyle);
        for(var i = 0; i < buttons.length; ++i){
            if(buttons[i].otherClasses === undefined)
                buttons[i].otherClasses = [];
            if(buttons[i].otherAttr === undefined)
                buttons[i].otherAttr = {};
            buttons[i].otherAttr.do = buttons[i].do;
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
    
}

var Style = new StyleFuncs();

$(function () {

    $(document).ready(function(){

        $(document).on("click", ".checkboxWrap", function(){
           $(this).find(".checkbox").toggleClass("tgld"); 
        });

    });
});