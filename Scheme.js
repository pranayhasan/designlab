var Scheme = {

    mapping : ["", "insert_questions", "delete_questions", "misc_questions"],

    Url : {
        get get(){
            var vars= {};
            if(window.location.search.length!==0)
                window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
                    key=decodeURIComponent(key);
                    if(typeof vars[key]==="undefined") {vars[key]= decodeURIComponent(value);}
                    else {vars[key]= [].concat(vars[key], decodeURIComponent(value));}
                });
            return vars;
        }
    },

    getSchemeVal : function(){
        return Scheme.Url.get.scheme;
    },


    getSchemeName : function(schemeVal){
        var name = "";
        switch(parseInt(schemeVal)){
            case 1:
            case 2:
            case 3:
                name = Scheme.mapping[parseInt(schemeVal)];
                break;
            default:
                alert("invalid scheme value!!!");
                name = "";
        }
        return name;
    },


    loadScheme : function(schemeVal){
        for(var i=1;i<Scheme.mapping.length;i++)
            document.getElementById(Scheme.mapping[i]).style.display = (i == parseInt(schemeVal)) ? "block" : "none";
    }
};