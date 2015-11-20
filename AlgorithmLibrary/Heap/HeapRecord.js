/* we do inorder traversal from tree root and store in in a array*/

function HeapRecord(){
    Record.call(this);
}

HeapRecord.prototype = Object.create(Record.prototype);
HeapRecord.prototype.constructor = HeapRecord;

HeapRecord.prototype.recordState = function(){
    this.array = [];
    this.recurse(currentAlg.treeRoot);
    this.addState(1,this.array);               //the id has to be the question id,use radio buttons and replace 1 with the radio button id
}

HeapRecord.prototype.recurse = function(node) {
    if (node == null)return;
    this.array.push(node.data);
    this.recurse(node.left);
    this.recurse(node.right);
}

//refresh

