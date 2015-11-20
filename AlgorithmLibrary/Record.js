/*
 Will record data structure states.
 */

/* can make objects of Record class. record state function(data member-function to convert ds to decided representation), takes an id. stores as map
 */


var Record = function(studentID, quiznumber){
    this.questionToState = {};
    this.studentID = studentID;
    this.quiznumber = quiznumber;
};

Record.prototype.recordState= function(){};

Record.prototype.addState = function(id, obj){
    this.questionToState[id] = obj;
};

Record.prototype.getAnswerObject = function(){
    return this.questionToState;
};