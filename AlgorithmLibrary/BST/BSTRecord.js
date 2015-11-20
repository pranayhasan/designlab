/* we do inorder traversal from tree root and store in in a array*/

function BSTRecord(){
    Record.call(this);
}

BSTRecord.prototype = Object.create(Record.prototype);
BSTRecord.prototype.constructor = BSTRecord;

BSTRecord.prototype.recordState = function(){
    this.array = [];
    this.recurse(currentAlg.treeRoot);
    this.addState(1,this.array);               //the id has to be the question id,use radio buttons and replace 1 with the radio button id
}

BSTRecord.prototype.recurse = function(node) {
    if (node == null)return;
    this.array.push(node.data);
    this.recurse(node.left);
    this.recurse(node.right);
}

//refresh

