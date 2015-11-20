/*
 Functions to check equivalency between two data structure state. Used to determine if the answers given by student is correct or not
 at the core, 2 things are required:
 -> Object of a class/Lists/Array etc. which will somehow denote the data structure being considered.
 -> a comparator function, which compares 2 instances of the above.
 */

var StateChecker = {

    defaultComparator : function(ds1,ds2){
        if(ds1.length!=ds2.length)return false;
        for(var i=0;i<ds1.length;i++) {
            if (ds1[i] != ds2[i])
                return false;
        }
        return true;
    },

    presentComparator : function(ds1,ds2){
        return StateChecker.defaultComparator(ds1,ds2);
    },

    setPresentComparator : function(comparator) {
        StateChecker.presentComparator = comparator;
    },

    compare : function (obj1, obj2) {
        return StateChecker.presentComparator(obj1,obj2);
    },

    compareLists : function(ds1, ds2) {
        return StateChecker.compare(ds1, ds2, StateChecker.defaultComparator);
    },

    compareArrays : function(a1, a2){
        return StateChecker.compareLists(a1,a2);
    }
};