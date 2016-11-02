//****************************************************************
//*****************ADMIN CALLBACK BLOCK***************************
//****************************************************************
Heap.prototype.addControls =  function() //Inserts elements in diplay and sets callbacks
{}

Heap.prototype.newArrayCallback = function(event)
{}

Heap.prototype.insertCallback = function(event)
{}

Heap.prototype.removeSmallestCallback = function(event)
{}

Heap.prototype.buildHeapCallback = function(event)
{}

Heap.prototype.heapifyCallback = function(event)
{}

Heap.prototype.deleteCallback = function(event)
{}

Heap.prototype.clearCallback = function(event) //TODO:  Make me undoable!!
{}

//****************************************************************
//*************END OF ADMIN BLOCK ********************************
//****************************************************************
Heap.prototype.createArray = function() //initiating the array display
{}

Heap.prototype.newArrayBox = function(event) //for admin access
{}

Heap.prototype.newArray = function(event) //for initially generating the heap
{};

Heap.prototype.insertElementBox = function(insertedValue) //for admin access
{}

Heap.prototype.insertElement = function(insertedValue) //for initially generating the heap, ADMIN METHOD
{}

Heap.prototype.removeSmallest = function(dummy) //ADMIN METHOD
{}
 
 Heap.prototype.buildHeap = function(event) //ADMIN METHOD
{}

Heap.prototype.heapify = function(index) //ADMIN METHOD
{}

Heap.prototype.swapWithParent = function() //ADMIN METHOD
{}

Heap.prototype.pushDown = function(index) //ADMIN METHOD
{}

Heap.prototype.swap = function(index1, index2) //ADMIN METHOD
{}

//****************************************************************
//***************Student Methods**********************************
//****************************************************************
Heap.prototype.insert = function(insertedValue) //STUDENT INSERT
{}

Heap.prototype.rename = function(value) //STUDENT RENAME
{}

Heap.prototype.delete = function() //STUDENT DELETE
{}

//****************************************************************
//***************Evaluation Methods*******************************
//****************************************************************
AnswerInsert = function(valueInserted) //EVALUATION METHOD
{}

AnswerDelete = function() //EVALUATION METHOD
{}

AnswerHeapify = function(n, i) //EVALUATION METHOD
{}

AnswerMakeHeap = function(n) //EVALUATION METHOD
{}

//**************SUPPORT METHODS**********************************
Heap.prototype.resizeTree = function() //SUPPORT METHOD
{}

Heap.prototype.setNewPositions = function(tree, xPosition, yPosition, side) //SUPPORT METHOD
{}

Heap.prototype.animateNewPositions = function(tree) //SUPPORT METHOD
{}

Heap.prototype.resizeWidths = function(tree) //SUPPORT METHOD
{}

