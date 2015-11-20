var BSTUtils = {
    inputNumber : function () {
        var num = prompt("Enter value", 42);
        if (num == null)return BSTUtils.inputNumber();
        else return num;
    },

    inputNumber : function(str) {
        var num = prompt(str,42);
        if(num==null)return BSTUtils.inputNumber(str);
        else return num;
    },

    clearCanvas : function() {
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
    },

    redrawImage : function() {
        currentAlg.animationManager.StartNewAnimation(currentAlg.commands);
        currentAlg.animationManager.skipForward();
        currentAlg.animationManager.clearHistory();
    },

    getQuestionID : function(){

        var radios = document.getElementsByName("radio"+Scheme.getSchemeVal().toString());
        for(var i=0;i<radios.length;i++){
            if(radios[i].checked)
                return radios[i].value;
        }
    },

    getAnswerID : function(){
        //alert('answer'+BSTUtils.getQuestionID());
        return 'answer'+BSTUtils.getQuestionID();
    },

    validate : function(obj){
        return obj!=null && obj!=undefined;
    },
};