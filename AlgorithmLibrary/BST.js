
BST.LINK_COLOR = "#007700";
BST.HIGHLIGHT_CIRCLE_COLOR = "#007700";
BST.FOREGROUND_COLOR = "#007700";
BST.BACKGROUND_COLOR = "#EEFFEE";
BST.PRINT_COLOR = BST.FOREGROUND_COLOR;
BST.HEIGHT_COLOR = BST.FOREGROUND_COLOR;


BST.WIDTH_DELTA  = 50;
BST.HEIGHT_DELTA = 50;
BST.STARTING_Y = 50;


BST.FIRST_PRINT_POS_X  = 100;
BST.PRINT_VERTICAL_GAP  = 20;
BST.PRINT_HORIZONTAL_GAP = 50;


BST.FIRST_HEIGHT_POS_X  = 50;
BST.HEIGHT_VERTICAL_GAP  = 20;



function BST(am, w, h)
{
    this.init(am, w, h);

    //document.getElementById("myBST") = this;
}

BST.prototype = new Algorithm();
BST.prototype.constructor = BST;
BST.superclass = Algorithm.prototype;

Math.seed = 0;

Math.seededRandom = function(min, max)
{
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = (Math.seed / 233280);
    return parseInt(min + rnd * (max - min));
}


BST.prototype.init = function(am, w, h)
{
    this.answers = {};
    this.actionElements = [];
    var sc = BST.superclass;
    this.startingX =  w / 3;
    this.first_print_pos_y  = h - 2 * BST.PRINT_VERTICAL_GAP;
    this.first_HEIGHT_pos_y  = h - 2 * BST.HEIGHT_VERTICAL_GAP;
    this.print_max  = w - 10;

    var fn = sc.init;
    fn.call(this,am);
    //var totalNodes =  RandomInt(11,17);

    this.nextIndex = 0;
    this.AddTree(29, 1);

    this.initCommands = this.commands;

    this.animationManager.StartNewAnimation(this.commands);
    this.animationManager.skipForward();
    this.animationManager.clearHistory();
    this.deleteElem = false;
    this.numberToReplace = -1;
}


BST.prototype.AddTree =  function(seed, offset)
{
    Math.seed = seed+offset;
    this.values = []
    this.commands = [];
    //this.cmd("SetText", 0, "TotalNodes "+ totalNodes);
    var i = Math.seededRandom(10,100)%10+10;
    alert(i);
    while(i > 0)
    {
        //var value = (i*i+offset)%prime;
        var value = Math.seededRandom(10,100);
        //var value = RandomInt(1, 100);
        this.values.push(value);
        this.insertElement(value,true);
        i--;
    }
   // alert(this.values);
    return this.commands;
    //this.animationManager.StartNewAnimation(allcommands);
}

BST.prototype.reset = function()
{
    this.nextIndex = 1;
    //this.treeRoot = null;
}

BST.prototype.insertToLeaf = function(numberToInsert, dir, visualize)
{
    var success= true, insertElem = null;
    if (this.treeRoot == null)
    {
        if(visualize)
        {
            this.cmd("CreateCircle", this.nextIndex, numberToInsert,  this.startingX, BST.STARTING_Y);
            this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
            this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
            this.cmd("Step");
        }
        insertElem = this.treeRoot = new BSTNode(numberToInsert, this.nextIndex, this.startingX, BST.STARTING_Y)
        this.nextIndex += 1;
    }
    else
    {
        if(currentHighlightNode.left==null  || currentHighlightNode.right==null)
        {
            if (visualize) {
                this.cmd("CreateCircle", this.nextIndex, numberToInsert, 100, 100);
                //this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
                //this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
                this.cmd("Step");
            }
            insertElem = new BSTNode(numberToInsert, this.nextIndex, 100, 100);
            this.nextIndex += 1;
            this.insertElementToLeaf(insertElem, dir, visualize)
            if (visualize)    this.resizeTree();
        }
        else
        {
            success = false;
            alert("Cannot insert!");
        }
    }
    if(success)
        this.highlightID = this.nextIndex;

    return insertElem;
}

BST.prototype.insertElementToLeaf = function(elem, dir, visualize)
{
    if (dir==0) //left
    {
        currentHighlightNode.left=elem;
        elem.parent = currentHighlightNode;
        if(visualize) this.cmd("Connect", currentHighlightNode.graphicID, elem.graphicID, BST.LINK_COLOR);
    }
    else
    {
        currentHighlightNode.right=elem;
        elem.parent = currentHighlightNode;
        if(visualize) this.cmd("Connect", currentHighlightNode.graphicID, elem.graphicID, BST.LINK_COLOR);
        elem.x = currentHighlightNode.x + BST.WIDTH_DELTA/2;
        elem.y = currentHighlightNode.y + BST.HEIGHT_DELTA
        if(visualize) this.cmd("Move", elem.graphicID, elem.x, elem.y);
    }
}

BST.prototype.insertElement = function(insertedValue, visualize)
{
    //this.cmd("SetText", 0, "Inserting "+insertedValue);
    //this.nextIndex++;

    if (this.treeRoot == null)
    {
        if(visualize)
        {
            this.cmd("CreateCircle", this.nextIndex, insertedValue,  this.startingX, BST.STARTING_Y);
            this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
            this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
            this.cmd("Step");
        }
        this.treeRoot = new BSTNode(insertedValue, this.nextIndex, this.startingX, BST.STARTING_Y);
        this.nextIndex += 1;
    }
    else
    {
        if(visualize)
        {
            this.cmd("CreateCircle", this.nextIndex, insertedValue, 100, 100);
            //this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
            //this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
            this.cmd("Step");
        }
        var insertElem = new BSTNode(insertedValue, this.nextIndex, 100, 100);

        this.nextIndex += 1;
        this.insert(insertElem, this.treeRoot, visualize)
        if(visualize) 	this.resizeTree();
    }
    this.highlightID = this.nextIndex;
}

BST.prototype.insert = function(elem, tree, visualize)
{
    if (elem.data < tree.data)
    {
        if (tree.left == null)
        {
            //this.cmd("SetText", 0,"Found null tree, inserting element");

            //this.cmd("SetHighlight", elem.graphicID, 0);
            tree.left=elem;
            elem.parent = tree;
            if(visualize) this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
        }
        else
        {
            //this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
            if(visualize)
            {
                this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
                this.cmd("Step");
            }
            //this.cmd("Delete", this.highlightID);
            this.insert(elem, tree.left, visualize);
        }
    }
    else if (elem.data == tree.data)
    {
        if(visualize) this.cmd("Delete", elem.graphicID);
    }
    else
    {
        if (tree.right == null)
        {
            //	this.cmd("SetText",  0, "Found null tree, inserting element");
            //	this.cmd("SetHighlight", elem.graphicID, 0);
            tree.right=elem;
            elem.parent = tree;
            if(visualize) this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
            elem.x = tree.x + BST.WIDTH_DELTA/2;
            elem.y = tree.y + BST.HEIGHT_DELTA
            if(visualize) this.cmd("Move", elem.graphicID, elem.x, elem.y);
        }
        else
        {
            //	this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
            if(visualize)
            {
                this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
                this.cmd("Step");
            }
            //this.cmd("Delete", this.highlightID);
            this.insert(elem, tree.right, visualize);
        }
    }
}

BST.prototype.resizeTree = function()
{
    var startingPoint  = this.startingX;
    this.resizeWidths(this.treeRoot);
    if (this.treeRoot != null)
    {
        if (this.treeRoot.leftWidth > startingPoint)
        {
            startingPoint = this.treeRoot.leftWidth;
        }
        else if (this.treeRoot.rightWidth > startingPoint)
        {
            startingPoint = Math.max(this.treeRoot.leftWidth, 2 * startingPoint - this.treeRoot.rightWidth);
        }
        this.setNewPositions(this.treeRoot, startingPoint, BST.STARTING_Y, 0);
        this.animateNewPositions(this.treeRoot);
        this.cmd("Step");
    }
}

BST.prototype.setNewPositions = function(tree, xPosition, yPosition, side)
{
    if (tree != null)
    {
        tree.y = yPosition;
        if (side == -1)
        {
            xPosition = xPosition - tree.rightWidth;
        }
        else if (side == 1)
        {
            xPosition = xPosition + tree.leftWidth;
        }
        tree.x = xPosition;
        this.setNewPositions(tree.left, xPosition, yPosition + BST.HEIGHT_DELTA, -1);
        this.setNewPositions(tree.right, xPosition, yPosition + BST.HEIGHT_DELTA, 1);
    }
}

BST.prototype.animateNewPositions = function(tree)
{
    if (tree != null)
    {
        this.cmd("Move", tree.graphicID, tree.x, tree.y);
        this.animateNewPositions(tree.left);
        this.animateNewPositions(tree.right);
    }
}

BST.prototype.resizeWidths = function(tree)
{
    if (tree == null)
    {
        return 0;
    }
    tree.leftWidth = Math.max(this.resizeWidths(tree.left), BST.WIDTH_DELTA / 2);
    tree.rightWidth = Math.max(this.resizeWidths(tree.right), BST.WIDTH_DELTA / 2);
    return tree.leftWidth + tree.rightWidth;
}


BST.prototype.deleteAllElements = function(tree)
{
    if(tree==null)return 0;
    //if(tree.left==null && tree.right==null)this.cmd("Delete",tree.graphicID);
    this.deleteAllElements(tree.left);
    this.deleteAllElements(tree.right);
    this.cmd("Delete",tree.graphicID);
}

function Height(tree)
{
    if( tree == null) return 0;
    else
    {
        if( tree.left == null && tree.right == null) return 0;
        var leftHeight = Height(tree.left);
        var rightHeight = Height(tree.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

function NodesCount(tree)
{
    if( tree == null) return 0;
    else
    {
        var leftCount = NodesCount(tree.left);
        var rightCount = NodesCount(tree.right);
        return leftCount + rightCount + 1;
    }
}

function FindElement(tree, value)
{
    if (tree != null)
    {
        if (tree.data == value)	return tree;
        else
        {
            if (tree.data > value) return this.FindElement(tree.left, value);
            else return this.FindElement(tree.right, value);
        }
    }
    else return null;
}

function Inorder(tree)
{
    if(tree == null) return;
    if(tree.left != null)   this.Inorder(tree.left);
    traversal.push(tree.data);
    if(tree.right != null)  this.Inorder(tree.right);
}

function Test() 
{
    var inorderInput = document.getElementById("q4").value;
    var nodes = inorderInput.split(" ");
    this.traversal = [];
    this.Inorder(this.currentAlg.treeRoot);
    var e4 = document.getElementById('e4');
    e4.style.color = "Green";
    var i = 0;
    while( i < traversal.length)
    {
        if(traversal[i] != nodes[i])
        {
            e4.innerHTML="Traversal sequence is wrong!! Correct one : " + traversal;
            e4.style.color = "Red";
            break;

        }
        i++;
    }
    e4.innerHTML="Correct!!";

    this.currentAlg.insertElement(56, false);
    var findQ1 = FindElement(this.currentAlg.treeRoot, 56);
    var parentQ1 = findQ1.parent;

    var q1 = document.getElementById("q1").value;
    var e1 = document.getElementById('e1');
    e1.style.color = "Green";
    if(parentQ1.data != q1) {
        e1.innerHTML="Wrong Answer!!. Correct one " + parentQ1.data;
        e1.style.color = "Red";
    }
    else e1.innerHTML="Correct!!";

    var q2 = document.getElementById("q2").value;
    var left = NodesCount(this.currentAlg.treeRoot.left);
    var right = NodesCount(this.currentAlg.treeRoot.right);
    var q2Ans = left + " " + right;

    var e2 = document.getElementById('e2');
    e2.style.color = "Green";
    if(q2Ans != q2){
        e2.innerHTML="Wrong Answer!!. Correct one : left nodes = " + left + ", right nodes = "+ right;
        e2.style.color = "Red";
    }
    else e2.innerHTML="Correct!!";

    var q3 = document.getElementById("q3").value;
    var height = Height(this.currentAlg.treeRoot);
    var e3 = document.getElementById('e3');
    e3.style.color = "Green";
    if(height != q3){
        e3.innerHTML="Wrong Answer!!. Correct one : height = " + height;
        e3.style.color = "Red";
    }
    else e3.innerHTML="Correct!!";
}

var newNode;
function GetNewNode()
{
    newNode = RandomInt(1, 100);
}

function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function BSTNode(val, id, initialX, initialY)
{
    this.data = val;
    this.x = initialX;
    this.y = initialY;
    this.graphicID = id;
    this.left = null;
    this.right = null;
    this.parent = null;
}

BST.prototype.disableUI = function(event)
{
}

BST.prototype.enableUI = function(event)
{
}

BST.prototype.moveLeft = function()
{
    if(currentHighlightNode.left==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);

    currentHighlightNode = currentHighlightNode.left;
    this.highlightNode(currentHighlightNode.graphicID);
    return true;
}

BST.prototype.moveRight = function()
{
    if(currentHighlightNode.right==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);


    currentHighlightNode = currentHighlightNode.right;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

BST.prototype.moveToParent = function()
{
    if(currentHighlightNode.parent==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);

    currentHighlightNode = currentHighlightNode.parent;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

BST.prototype.highlightNode = function(graphicID)
{
    this.cmd("SetForegroundColor", graphicID , BST.BACKGROUND_COLOR);
    this.cmd("SetBackgroundColor", graphicID , BST.FOREGROUND_COLOR);
}

BST.prototype.unhighlightNode = function(graphicID)
{
    this.cmd("SetForegroundColor", graphicID , "#000000");
    this.cmd("SetBackgroundColor", graphicID , "#FFFFFF");
}

BST.prototype.deleteElement = function(deletedValue)
{
    this.commands = [];
    this.cmd("SetText", 0, "Deleting "+deletedValue);
    this.cmd("Step");
    this.cmd("SetText", 0, "");
    this.highlightID = this.nextIndex++;
    this.treeDelete(this.treeRoot, deletedValue);
    this.cmd("SetText", 0, "");
    // Do delete
    return this.commands;
}

BST.prototype.treeDelete = function(tree, valueToDelete)
{
    var leftchild = false;
    if (tree != null)
    {
        if (tree.parent != null)
        {
            leftchild = tree.parent.left == tree;
        }
        this.cmd("SetHighlight", tree.graphicID, 1);
        if (valueToDelete < tree.data)
        {
            this.cmd("SetText", 0, valueToDelete + " < " + tree.data + ".  Looking at left subtree");
        }
        else if (valueToDelete > tree.data)
        {
            this.cmd("SetText",  0, valueToDelete + " > " + tree.data + ".  Looking at right subtree");
        }
        else
        {
            this.cmd("SetText",  0, valueToDelete + " == " + tree.data + ".  Found node to delete");
        }
        this.cmd("Step");
        this.cmd("SetHighlight",  tree.graphicID, 0);

        if (valueToDelete == tree.data)
        {
            if (tree.left == null && tree.right == null)
            {
                this.cmd("SetText", 0, "Node to delete is a leaf.  Delete it.");
                this.cmd("Delete", tree.graphicID);
                if (leftchild && tree.parent != null)
                {
                    tree.parent.left = null;
                }
                else if (tree.parent != null)
                {
                    tree.parent.right = null;
                }
                else
                {
                    treeRoot = null;
                }
                this.resizeTree();
                this.cmd("Step");

            }
            else if (tree.left == null)
            {
                this.cmd("SetText", 0, "Node to delete has no left child.  \nSet parent of deleted node to right child of deleted node.");
                if (tree.parent != null)
                {
                    this.cmd("Disconnect",  tree.parent.graphicID, tree.graphicID);
                    this.cmd("Connect",  tree.parent.graphicID, tree.right.graphicID, BST.LINK_COLOR);
                    this.cmd("Step");
                    this.cmd("Delete", tree.graphicID);
                    if (leftchild)
                    {
                        tree.parent.left = tree.right;
                    }
                    else
                    {
                        tree.parent.right = tree.right;
                    }
                    tree.right.parent = tree.parent;
                }
                else
                {
                    this.cmd("Delete", tree.graphicID);
                    this.treeRoot = tree.right;
                    this.treeRoot.parent = null;
                }
                this.resizeTree();
            }
            else if (tree.right == null)
            {
                this.cmd("SetText", 0, "Node to delete has no right child.  \nSet parent of deleted node to left child of deleted node.");
                if (tree.parent != null)
                {
                    this.cmd("Disconnect", tree.parent.graphicID, tree.graphicID);
                    this.cmd("Connect", tree.parent.graphicID, tree.left.graphicID, BST.LINK_COLOR);
                    this.cmd("Step");
                    this.cmd("Delete", tree.graphicID);
                    if (leftchild)
                    {
                        tree.parent.left = tree.left;
                    }
                    else
                    {
                        tree.parent.right = tree.left;
                    }
                    tree.left.parent = tree.parent;
                }
                else
                {
                    this.cmd("Delete",  tree.graphicID);
                    this.treeRoot = tree.left;
                    this.treeRoot.parent = null;
                }
                this.resizeTree();
            }
            else // tree.left != null && tree.right != null
            {
                this.cmd("SetText", 0, "Node to delete has two childern.  \nFind largest node in left subtree.");

                this.highlightID = this.nextIndex;
                this.nextIndex += 1;
                this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
                var tmp = tree;
                tmp = tree.left;
                this.cmd("Move", this.highlightID, tmp.x, tmp.y);
                this.cmd("Step");
                while (tmp.right != null)
                {
                    tmp = tmp.right;
                    this.cmd("Move", this.highlightID, tmp.x, tmp.y);
                    this.cmd("Step");
                }
                this.cmd("SetText", tree.graphicID, " ");
                var labelID = this.nextIndex;
                this.nextIndex += 1;
                this.cmd("CreateLabel", labelID, tmp.data, tmp.x, tmp.y);
                tree.data = tmp.data;
                this.cmd("Move", labelID, tree.x, tree.y);
                this.cmd("SetText", 0, "Copy largest value of left subtree into node to delete.");

                this.cmd("Step");
                this.cmd("SetHighlight", tree.graphicID, 0);
                this.cmd("Delete", labelID);
                this.cmd("SetText", tree.graphicID, tree.data);
                this.cmd("Delete", this.highlightID);
                this.cmd("SetText", 0,"Remove node whose value we copied.");

                if (tmp.left == null)
                {
                    if (tmp.parent != tree)
                    {
                        tmp.parent.right = null;
                    }
                    else
                    {
                        tree.left = null;
                    }
                    this.cmd("Delete", tmp.graphicID);
                    this.resizeTree();
                }
                else
                {
                    this.cmd("Disconnect", tmp.parent.graphicID,  tmp.graphicID);
                    this.cmd("Connect", tmp.parent.graphicID, tmp.left.graphicID, BST.LINK_COLOR);
                    this.cmd("Step");
                    this.cmd("Delete", tmp.graphicID);
                    if (tmp.parent != tree)
                    {
                        tmp.parent.right = tmp.left;
                        tmp.left.parent = tmp.parent;
                    }
                    else
                    {
                        tree.left = tmp.left;
                        tmp.left.parent = tree;
                    }
                    this.resizeTree();
                }

            }
        }
        else if (valueToDelete < tree.data)
        {
            if (tree.left != null)
            {
                this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
                this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
                this.cmd("Step");
                this.cmd("Delete", this.highlightID);
            }
            this.treeDelete(tree.left, valueToDelete);
        }
        else
        {
            if (tree.right != null)
            {
                this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
                this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
                this.cmd("Step");
                this.cmd("Delete", this.highlightID);
            }
            this.treeDelete(tree.right, valueToDelete);
        }
    }
    else
    {
        this.cmd("SetText", 0, "Elemet "+valueToDelete+" not found, could not delete");
    }
}

BST.prototype.deleteCurrentHighlightedNode = function(node, replacementNode)
{
    if(node.left==null && node.right==null){  //no need of replacement node
        this.cmd("Delete", node.graphicID);
        this.cmd("Step");
        if(node.parent!=null && node.parent.data>node.data)  //left child
            node.parent.left = null;
        else if(node.parent!=null)node.parent.right = null;
        node.parent = null;

        currentAlg.highlightNode(currentAlg.treeRoot.graphicID);
        this.resizeTree();
        return null;
    }
    else if(node.left==null || node.right==null) {
        if(replacementNode==null)return ;
        var nchild = (node.left==null)?node.right:node.left;
        if(node.parent!=null)this.cmd("Disconnect", node.parent.graphicID, node.graphicID);
        this.cmd("Delete", node.graphicID);
        this.cmd("Step");
        var rparent = replacementNode.parent;
        var rchild = (replacementNode.left == null) ? replacementNode.right : replacementNode.left;

        if(rchild!=null && rparent!=node) {
            this.cmd("Connect", rparent.graphicID, rchild.graphicID, BST.LINK_COLOR);
            this.cmd("Disconnect", replacementNode.graphicID, rchild.graphicID);
        }
        if(node.parent!=null)this.cmd("Connect", node.parent.graphicID, replacementNode.graphicID, BST.LINK_COLOR);
        if(replacementNode!=nchild)this.cmd("Connect", replacementNode.graphicID, nchild.graphicID, BST.LINK_COLOR);
        if(rparent!=null)this.cmd("Disconnect", rparent.graphicID, replacementNode.graphicID);


        if (rparent!=null && rparent.data > replacementNode.data)
            rparent.left = rchild;
        else if(rparent!=null)rparent.right = rchild;
        if(rchild!=null)rchild.parent = rparent;

        if(node.parent!=null && node.parent.data>node.data)  //left child
            node.parent.left = replacementNode;
        else
        if(node.parent!=null)node.parent.right = replacementNode;
        replacementNode.parent = node.parent;

        if(nchild!=replacementNode) {
            replacementNode.right = nchild;
            nchild.parent = replacementNode;
        }
    }
    else {  //node has two children
        if(replacementNode==null)return ;
        if(node.parent!=null)this.cmd("Disconnect", node.parent.graphicID, node.graphicID);
        this.cmd("Delete", node.graphicID);
        this.cmd("Step");
        var rparent = replacementNode.parent;
        var rchild = (replacementNode.left == null) ? replacementNode.right : replacementNode.left;
        var nleft = node.left;
        var nright = node.right;

        if(rchild!=null && rparent!=node) {
            this.cmd("Connect", rparent.graphicID, rchild.graphicID, BST.LINK_COLOR);
            this.cmd("Disconnect", replacementNode.graphicID, rchild.graphicID);
        }
        if(node.parent!=null)this.cmd("Connect", node.parent.graphicID, replacementNode.graphicID, BST.LINK_COLOR);
        this.cmd("Connect", replacementNode.graphicID, nleft.graphicID, BST.LINK_COLOR);
        this.cmd("Connect", replacementNode.graphicID, nright.graphicID, BST.LINK_COLOR);
        if(rparent!=null)this.cmd("Disconnect", rparent.graphicID, replacementNode.graphicID);

        if (rparent!=null && rparent.data > replacementNode.data)
            rparent.left = rchild;
        else if(rparent!=null)
            rparent.right = rchild;
        if(rchild!=null)rchild.parent = rparent;

        if(node.parent!=null && node.parent.data>node.data)  //left child
            node.parent.left = replacementNode;
        else if(node.parent!=null)
            node.parent.right = replacementNode;
        replacementNode.parent = node.parent;

        if(nleft!=replacementNode) {
            replacementNode.left = nleft;
            nleft.parent = replacementNode;
        }
        if(nright!=replacementNode){
            replacementNode.right = nright;
            nright.parent = replacementNode;
        }

    }
    if(node==currentAlg.treeRoot)
        currentAlg.treeRoot = replacementNode;

    currentHighlightNode = replacementNode;
    currentAlg.unhighlightNode(currentAlg.treeRoot.graphicID);
    currentAlg.highlightNode(currentHighlightNode.graphicID);
    this.resizeTree();
    return node;
}

BST.prototype.getNode1 = function(data,tree)
{
    if(tree==null)return null;
    if(tree.data==data)return tree;
    if(tree.data<data)return this.getNode1(data, tree.right);
    else return this.getNode1(data, tree.left);
}

BST.prototype.getNode = function(data)
{
    return this.getNode1(data,currentAlg.treeRoot);
}

BST.prototype.moveReplacementNode = function(replacementNode)
{

}

BST.prototype.addStep = function(str)
{
    document.getElementById(BSTUtils.getAnswerID()).value = document.getElementById(BSTUtils.getAnswerID()).value+" "+str;
}

BST.prototype.mark = function()
{
    currentAlg.addStep(currentHighlightNode.data);
    document.getElementById("menuSimple").style.display = "none";
}

BST.prototype.submitAnswer = function()
{
    this.answers[BSTUtils.getQuestionID()] = document.getElementById(BSTUtils.getAnswerID()).value;
}

BST.prototype.resetAnswer = function()
{
    this.answers[BSTUtils.getQuestionID()] = document.getElementById(BSTUtils.getAnswerID()).value = '';
}

BST.prototype.test = function()
{
    //var sys = require("sys");
    //var StateChecker = require('./AlgorithmLibrary/StateChecker.js');
    try {
        console.log(typeof StateChecker);
        console.log(StateChecker.compareLists([1, 2, 3], [1, 2, 3]));
    }catch(e){
        console.log("ye",e);
    }
}

var currentAlg;
var currentHighlightNode;
var initCommands;

function init()
{
    var animManag = initCanvas();
    currentAlg = new BST(animManag, canvas.width, canvas.height);
    currentHighlightNode  = currentAlg.treeRoot;
    initCommands = currentAlg.commands;


    addEventsToNode(animManag);
    insertNodesToActionListener();
}

function addEventsToNode(animManag)
{
    document.getElementById("menuSimple").style.display = "none";
    var canvas = document.getElementById('canvas'),
        cLeft = canvas.offsetLeft,
        cTop = canvas.offsetTop,
        context = canvas.getContext('2d');

    currentAlg.actionElements = [];


    canvas.addEventListener('click', function(event){
        //event.preventDefault();
        var x = event.pageX - cLeft,
            y = event.pageY - cTop;
        var ctxMenu = document.getElementById("menuSimple");
        // Collision detection between clicked offset and element.
        var cli = true;
        currentAlg.actionElements.forEach(function(element) {
            try {

                var manager = animManag.animatedObjects,
                    id = element.graphicID,
                    ex = manager.getNodeX(id),
                    ey = manager.getNodeY(id),
                    er = manager.getNodeRadius(id);
                //alert(currentHighlightNode.highlightID+" "+id);
                if (x > ex - er && x < ex + er &&
                    y > ey - er && y < ey + er) {
                    //alert("hey"+currentAlg.deleteElem);
                    if(currentAlg.deleteElem){
                        currentAlg.numberToReplace = element.data;
                        //alert(currentAlg.numberToReplace);
                        afterNodeSelected();
                        currentAlg.deleteElem = false;
                    }
                    else if(currentHighlightNode.graphicID==id){
                        ctxMenu.style.left = event.pageX - 10 + "px";
                        ctxMenu.style.top = event.pageY + "px";
                        ctxMenu.style.display = "block";
                        cli = false;}

                }
            }catch(e){/*alert("action"+element.graphicID);*/}
        })
        if(cli)ctxMenu.style.display = "none";

    }, false);
}

function insertNodeToActionListener(node)
{
    if(currentAlg.actionElements.indexOf(node)==-1)
        currentAlg.actionElements.push(node);
}


function insertNodesToActionListener()
{
    recurse(currentAlg.treeRoot);
}

function recurse(node)
{
    if(node==null)return ;
    insertNodeToActionListener(node);
    recurse(node.left);
    recurse(node.right);
}

function deleteNodeFromActionListener(node)
{
    var index = currentAlg.actionElements.indexOf(node);
    //alert(index);
    if(index>-1)
        currentAlg.actionElements.splice(index,1);
}

//
//function reset()
//{
//    animManag = initCanvas();
//    currentAlg = new BST(currentAlg.values, animManag, canvas.width, canvas.height);
//    currentHighlightNode = currentAlg.treeRoot;
//    initCommands = currentAlg.commands;
//}