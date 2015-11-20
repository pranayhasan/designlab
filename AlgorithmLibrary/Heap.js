
Heap.LINK_COLOR = "#007700";
Heap.HIGHLIGHT_CIRCLE_COLOR = "#007700";
Heap.FOREGROUND_COLOR = "#007700";
Heap.BACKGROUND_COLOR = "#EEFFEE";
Heap.PRINT_COLOR = Heap.FOREGROUND_COLOR;
Heap.HEIGHT_COLOR = Heap.FOREGROUND_COLOR;


Heap.WIDTH_DELTA  = 50;
Heap.HEIGHT_DELTA = 50;
Heap.STARTING_Y = 120;


Heap.FIRST_PRINT_POS_X  = 100;
Heap.PRINT_VERTICAL_GAP  = 20;
Heap.PRINT_HORIZONTAL_GAP = 50;


Heap.FIRST_HEIGHT_POS_X  = 50;
Heap.HEIGHT_VERTICAL_GAP  = 20;

var ARRAY_SIZE  = 32;
var ARRAY_ELEM_WIDTH = 30;
var ARRAY_ELEM_HEIGHT = 25;
var ARRAY_INITIAL_X = 30;

var ARRAY_Y_POS = 50;
var ARRAY_LABEL_Y_POS = 70;

function Heap(am, w, h)
{
	this.init(am, w, h);
}

Heap.prototype = new Algorithm();
Heap.prototype.constructor = Heap;
Heap.superclass = Algorithm.prototype;

Math.seed = 0;

Math.seededRandom = function(min, max)
{
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = (Math.seed / 233280);
    return parseInt(min + rnd * (max - min));
}

Heap.prototype.init = function(am, w, h)
{
    this.answers = {};
    this.actionElements = [];
	var sc = Heap.superclass;

    this.startingX =  w / 3;
    this.first_print_pos_y  = h - 2 * Heap.PRINT_VERTICAL_GAP;
    this.first_HEIGHT_pos_y  = h - 2 * Heap.HEIGHT_VERTICAL_GAP;
    this.print_max  = w - 10;

    var fn = sc.init;
	fn.call(this,am);


	// this.addControls();
	this.nextIndex = 0;
	this.HeapXPositions = [0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600,
					  700, 800, 075, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 
					  625, 675, 725, 775, 825];
	this.HeapYPositions = [0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310,
					  310, 310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 
					  380, 380, 380, 380, 380];

	this.commands = [];
	this.initCommands = this.commands;

	this.newArray(29,1);

	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	this.deleteElem = false;
	this.numberToReplace = -1;
	
}

Heap.prototype.addControls =  function() //Inserts elements in diplay and sets callbacks
{
	this.newArrayButton = addControlToAlgorithmBar("Button", "Generate Array");
	this.newArrayButton.onclick = this.newArrayCallback.bind(this);

	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertField.onkeydown = this.returnSubmit(this.insertField, this.insertCallback.bind(this), 4, true);
	this.insertButton = addControlToAlgorithmBar("Button", "Insert");
	this.insertButton.onclick = this.insertCallback.bind(this);

	this.removeSmallestButton = addControlToAlgorithmBar("Button", "Remove Smallest");
	this.removeSmallestButton.onclick = this.removeSmallestCallback.bind(this);

	this.buildHeapButton = addControlToAlgorithmBar("Button", "Make Heap");
	this.buildHeapButton.onclick = this.buildHeapCallback.bind(this);

	this.insertIndex = addControlToAlgorithmBar("Text", "");
	this.insertIndex.onkeydown = this.returnSubmit(this.insertIndex, this.heapifyCallback.bind(this), 2, true);
	this.heapifyButton = addControlToAlgorithmBar("Button", "Heapify Index");
	this.heapifyButton.onclick = this.heapifyCallback.bind(this);

	this.clearHeapButton = addControlToAlgorithmBar("Button", "Clear Heap");
	this.clearHeapButton.onclick = this.clearCallback.bind(this);
}

Heap.prototype.newArrayCallback = function(event)
{
	this.implementAction(this.newArray.bind(this),"");			
}

Heap.prototype.insertCallback = function(event)
{
	var insertedValue = this.normalizeNumber(this.insertField.value,4);
	if (insertedValue != "")
	{
		this.insertField.value = "";
		this.implementAction(this.insertElementManual.bind(this),parseInt(insertedValue));
	}
}

Heap.prototype.removeSmallestCallback = function(event)
{
	this.implementAction(this.removeSmallest.bind(this),"");
}

Heap.prototype.buildHeapCallback = function(event)
{
	this.implementAction(this.buildHeap.bind(this),"");			
}

Heap.prototype.clearCallback = function(event) //TODO:  Make me undoable!!
{
	this.commands = new Array();
	this.implementAction(this.clear.bind(this),"");
}

Heap.prototype.heapifyCallback = function(event)
{
	var insertedValue = this.normalizeNumber(this.insertIndex.value,2);
	if (insertedValue != "")
	{
		this.insertIndex.value = "";
		this.implementAction(this.heapify.bind(this),parseInt(insertedValue));
	}
}

Heap.prototype.newArray = function(seed, offset) 
{
	Math.seed = seed+offset;
    this.arrayData = new Array(ARRAY_SIZE);
    this.arrayLabels = new Array(ARRAY_SIZE);
    this.arrayRects = new Array(ARRAY_SIZE);
    this.circleObjs = new Array(ARRAY_SIZE);
    this.ArrayXPositions = new Array(ARRAY_SIZE);
    this.currentHeapSize = 0;
	this.commands = [];
	// this.clear();

	for (var i = 0; i < ARRAY_SIZE; i++)
	{
		this.ArrayXPositions[i] = ARRAY_INITIAL_X + i *ARRAY_ELEM_WIDTH; //Position of each element to display
		this.arrayLabels[i] = this.nextIndex++; 
		this.arrayRects[i] = this.nextIndex++;
		this.circleObjs[i] = this.nextIndex++;
		this.cmd("CreateRectangle", this.arrayRects[i], "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, this.ArrayXPositions[i] , ARRAY_Y_POS)
		// this.cmd("CreateLabel", this.arrayLabels[i], i,  this.ArrayXPositions[i]+30, ARRAY_LABEL_Y_POS);
		this.cmd("SetForegroundColor", this.arrayLabels[i], Heap.FOREGROUND_COLOR);
	}

	for (var i = 0; i < ARRAY_SIZE-1; i++)
	{
		this.cmd("CreateLabel", this.arrayLabels[i], i,  this.ArrayXPositions[i]+30, ARRAY_LABEL_Y_POS);
	}


	this.cmd("SetText", this.arrayRects[0], "HEAP");
	this.swapLabel1 = this.nextIndex++;
	this.swapLabel2 = this.nextIndex++;
	this.swapLabel3 = this.nextIndex++;
	this.swapLabel4 = this.nextIndex++;
	this.descriptLabel1 = this.nextIndex++;
	this.descriptLabel2 = this.nextIndex++;
	this.cmd("CreateLabel", this.descriptLabel1, "", 20, 10,  0);



	var heapsize = Math.seededRandom(10,220)%10+10;
    // alert(heapsize);
	for (var i = 1; i <heapsize; i++)
	{
		this.arrayData[i] = String(Math.seededRandom(0,100));
		// this.insertElementHeap(this.arrayData[i]);
		this.insertElement(this.arrayData[i], true);
	}
	// this.cmd("Step");
	return this.commands;
}

Heap.prototype.insertElementManual = function(insertedValue)
{
	this.commands = new Array();
	this.insertElementHeap(insertedValue);
	return this.commands;
}

Heap.prototype.insertElementHeap = function(insertedValue)
{
	console.log('Value inserted :'+parseInt(insertedValue));

	// this.commands = new Array();
	
	if (this.currentHeapSize >= ARRAY_SIZE - 1)
	{
		this.cmd("SetText", this.descriptLabel1, "Heap Full!");
		return this.commands;
	}
	
	this.cmd("SetText", this.descriptLabel1, "Inserting Element: " + insertedValue);
	this.cmd("Step");
	this.cmd("SetText", this.descriptLabel1, "");
	this.currentHeapSize++;
	this.heapsize++;
	this.arrayData[this.currentHeapSize] = insertedValue;
	this.cmd("CreateCircle",this.circleObjs[this.currentHeapSize], "", this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
	
	// if (this.treeRoot == null)
	// {
	// 	this.cmd("SetForegroundColor", this.circleObjs[this.currentHeapSize], Heap.FOREGROUND_COLOR);//added
 //    	this.cmd("SetBackgroundColor", this.circleObjs[this.currentHeapSize], Heap.BACKGROUND_COLOR);//added
	// }

	this.cmd("CreateLabel", this.descriptLabel2, insertedValue, 120, 45,  1);
	if (this.currentHeapSize > 1)
	{
		this.cmd("Connect", this.circleObjs[Math.floor(this.currentHeapSize / 2)], this.circleObjs[this.currentHeapSize], Heap.LINK_COLOR);				
	}
	
	this.cmd("Move", this.descriptLabel2, this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
	this.cmd("Step");
	this.cmd("SetText", this.circleObjs[this.currentHeapSize], insertedValue);
	this.cmd("delete", this.descriptLabel2);
	this.cmd("SetText", this.arrayRects[this.currentHeapSize], insertedValue);
	
	var currentIndex = this.currentHeapSize;
	var parentIndex = Math.floor(currentIndex / 2);
	
	if (currentIndex > 1)
	{
		this.setIndexHighlight(currentIndex, 1);
		this.setIndexHighlight(parentIndex, 1);
		this.cmd("Step");
		this.setIndexHighlight(currentIndex, 0);
		this.setIndexHighlight(parentIndex, 0);
	}
	
	while (currentIndex > 1 && this.arrayData[currentIndex] < this.arrayData[parentIndex])
	{
		this.swap(currentIndex, parentIndex);
		currentIndex = parentIndex;
		parentIndex = Math.floor(parentIndex / 2);
		if (currentIndex > 1)
		{
			this.setIndexHighlight(currentIndex, 1);
			this.setIndexHighlight(parentIndex, 1);
			this.cmd("Step");
			this.setIndexHighlight(currentIndex, 0);
			this.setIndexHighlight(parentIndex, 0);
		}
	}
	
	// return this.commands;
}

Heap.prototype.insertElement = function(insertedVaule, visualize)
{
    //this.cmd("SetText", 0, "Inserting "+insertedValue);
    //this.nextIndex++;

    if (this.treeRoot == null)
    {
        if(visualize)
        {
            this.cmd("CreateCircle", this.nextIndex, this.insertedValue,  this.startingX, Heap.STARTING_Y);
            this.cmd("SetForegroundColor", this.nextIndex, Heap.FOREGROUND_COLOR);
            this.cmd("SetBackgroundColor", this.nextIndex, Heap.BACKGROUND_COLOR);
            this.cmd("Step");
        }
        this.treeRoot = new HeapNode(this.insertedValue, this.nextIndex, this.startingX, Heap.STARTING_Y);
        this.nextIndex += 1;
    }
    else
    {
        if(visualize)
        {
            this.cmd("CreateCircle", this.nextIndex, this.insertedValue, 100, 100);
            //this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
            //this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
            this.cmd("Step");
        }
        var insertElem = new HeapNode(this.insertedValue, this.nextIndex, 100, 100);

        this.nextIndex += 1;
        this.insert(insertElem, this.treeRoot, visualize)
        if(visualize) 	this.resizeTree();
    }
    this.highlightID = this.nextIndex;
}

Heap.prototype.insert = function(elem, tree, visualize)
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

Heap.prototype.resizeTree = function()
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
        this.setNewPositions(this.treeRoot, startingPoint, Heap.STARTING_Y, 0);
        this.animateNewPositions(this.treeRoot);
        this.cmd("Step");
    }
}

Heap.prototype.setNewPositions = function(tree, xPosition, yPosition, side)
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
        this.setNewPositions(tree.left, xPosition, yPosition + Heap.HEIGHT_DELTA, -1);
        this.setNewPositions(tree.right, xPosition, yPosition + Heap.HEIGHT_DELTA, 1);
    }
}

Heap.prototype.animateNewPositions = function(tree)
{
    if (tree != null)
    {
        this.cmd("Move", tree.graphicID, tree.x, tree.y);
        this.animateNewPositions(tree.left);
        this.animateNewPositions(tree.right);
    }
}

Heap.prototype.resizeWidths = function(tree)
{
    if (tree == null)
    {
        return 0;
    }
    tree.leftWidth = Math.max(this.resizeWidths(tree.left), Heap.WIDTH_DELTA / 2);
    tree.rightWidth = Math.max(this.resizeWidths(tree.right), Heap.WIDTH_DELTA / 2);
    return tree.leftWidth + tree.rightWidth;
}

Heap.prototype.removeSmallest = function(dummy)
{
	this.commands = new Array();
	this.cmd("SetText", this.descriptLabel1, "");
	
	if (this.currentHeapSize == 0)
	{
		console.log('Current Heap size = 0')
		this.cmd("SetText", this.descriptLabel1, "Heap is empty, cannot remove smallest element");
		return this.commands;
	}
	
	this.cmd("SetText", this.descriptLabel1, "Removing element:");			
	this.cmd("CreateLabel", this.descriptLabel2, this.arrayData[1],  this.HeapXPositions[1], this.HeapYPositions[1], 0);
	this.cmd("SetText", this.circleObjs[1], "");
	this.cmd("Move", this.descriptLabel2,  120, 40)
	this.cmd("Step");
	this.cmd("Delete", this.descriptLabel2);
	this.cmd("SetText", this.descriptLabel1, "Removing element: " + this.arrayData[1]);
	this.arrayData[1] = "";
	if (this.currentHeapSize > 0)//1
	{
		this.cmd("SetText", this.arrayRects[1], "");
		this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
		this.swap(1,this.currentHeapSize);
		this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
		this.currentHeapSize--;
		this.pushDown(1);				
	}
	return this.commands;
}
 
 Heap.prototype.buildHeap = function(event)
{
	this.commands = new Array();

	if (this.currentHeapSize == 0)
	{
		this.cmd("SetText", this.descriptLabel1, "No elements to make Heap!");
		return this.commands;
	}

	var nextElem = this.currentHeapSize;
	while(nextElem > 0)
	{
		this.pushDown(nextElem);
		nextElem = nextElem - 1;
	}
	return this.commands;
}

Heap.prototype.heapify = function(index)
{
	this.commands = new Array();
	this.cmd("SetText", this.descriptLabel1, "");
	index += 1; //index 1 is taken as root not 0
	if(this.currentHeapSize == 0)
	{
		this.cmd("SetText", this.descriptLabel1, "Empty array, nothing to heapify!");
		return this.commands;
	}
	else if(index > this.currentHeapSize  || index < 0)
	{
		var val = this.currentHeapSize-1;
		this.cmd("SetText", this.descriptLabel1, "Enter index between 0 and "+ val);
		return this.commands;
	}

	this.pushDown(index);
	return this.commands;
}

Heap.prototype.pushDown = function(index)
{
	var smallestIndex;
	
	while(true)
	{
		if (index*2 > this.currentHeapSize)
		{
			return;
		}
		
		smallestIndex = 2*index;
		
		if (index*2 + 1 <= this.currentHeapSize)
		{
			this.setIndexHighlight(2*index, 1);
			this.setIndexHighlight(2*index + 1, 1);
			this.cmd("Step");
			this.setIndexHighlight(2*index, 0);
			this.setIndexHighlight(2*index + 1, 0);
			if (this.arrayData[2*index + 1] < this.arrayData[2*index])
			{
				smallestIndex = 2*index + 1;
			}
		}
		this.setIndexHighlight(index, 1);
		this.setIndexHighlight(smallestIndex, 1);
		this.cmd("Step");
		this.setIndexHighlight(index, 0);
		this.setIndexHighlight(smallestIndex, 0);
		
		if (this.arrayData[smallestIndex] < this.arrayData[index])
		{
			this.swap(smallestIndex, index);
			index = smallestIndex;
		}
		else
		{
			return;
		}
	}
}

Heap.prototype.clear = function()//TODO:  Make me undoable!!
{
	
	while (this.currentHeapSize > 0)
	{
		this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
		this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
		this.currentHeapSize--;
	}
	return this.commands;
}

Heap.prototype.swap = function(index1, index2)
{
	this.cmd("SetText", this.arrayRects[index1], "");
	this.cmd("SetText", this.arrayRects[index2], "");
	this.cmd("SetText", this.circleObjs[index1], "");
	this.cmd("SetText", this.circleObjs[index2], "");
	this.cmd("CreateLabel", this.swapLabel1, this.arrayData[index1], this.ArrayXPositions[index1],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel2, this.arrayData[index2], this.ArrayXPositions[index2],ARRAY_Y_POS);
	this.cmd("CreateLabel", this.swapLabel3, this.arrayData[index1], this.HeapXPositions[index1],this.HeapYPositions[index1]);
	this.cmd("CreateLabel", this.swapLabel4, this.arrayData[index2], this.HeapXPositions[index2],this.HeapYPositions[index2]);
	this.cmd("Move", this.swapLabel1, this.ArrayXPositions[index2],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel2, this.ArrayXPositions[index1],ARRAY_Y_POS)
	this.cmd("Move", this.swapLabel3, this.HeapXPositions[index2],this.HeapYPositions[index2])
	this.cmd("Move", this.swapLabel4, this.HeapXPositions[index1],this.HeapYPositions[index1])
	var tmp = this.arrayData[index1];
	this.arrayData[index1] = this.arrayData[index2];
	this.arrayData[index2] = tmp;
	this.cmd("Step")
	this.cmd("SetText", this.arrayRects[index1], this.arrayData[index1]);
	this.cmd("SetText", this.arrayRects[index2], this.arrayData[index2]);
	this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
	this.cmd("SetText", this.circleObjs[index2], this.arrayData[index2]);
	this.cmd("Delete", this.swapLabel1);
	this.cmd("Delete", this.swapLabel2);
	this.cmd("Delete", this.swapLabel3);
	this.cmd("Delete", this.swapLabel4);			
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

function HeapNode(val, id, initialX, initialY)
{
    this.data = val;
    this.x = initialX;
    this.y = initialY;
    this.graphicID = id;
    this.left = null;
    this.right = null;
    this.parent = null;
}

Heap.prototype.disableUI = function(event)
{
	// this.insertField.disabled = true;
	// this.insertIndex.disabled = true;
	// this.insertButton.disabled = true;
	// this.removeSmallestButton.disabled = true;
	// this.clearHeapButton.disabled = true;
	// this.buildHeapButton.disabled = true;
}

Heap.prototype.enableUI = function(event)
{
	// this.insertField.disabled = false;
	// this.insertIndex.disabled = false;
	// this.insertButton.disabled = false;
	// this.removeSmallestButton.disabled = false;
	// this.clearHeapButton.disabled = false;
	// this.buildHeapButton.disabled = false;
}

Heap.prototype.moveLeft = function()
{
    if(currentHighlightNode.left==null)
    	return false;

    this.unhighlightNode(currentHighlightNode.graphicID);
    currentHighlightNode = currentHighlightNode.left;
    this.highlightNode(currentHighlightNode.graphicID);
    return true;
}

Heap.prototype.moveRight = function()
{
    if(currentHighlightNode.right==null)
    	return false;

    this.unhighlightNode(currentHighlightNode.graphicID);
    currentHighlightNode = currentHighlightNode.right;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

Heap.prototype.moveToParent = function()
{
    if(currentHighlightNode.parent==null)
     	return false;

    this.unhighlightNode(currentHighlightNode.graphicID);
    currentHighlightNode = currentHighlightNode.parent;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

Heap.prototype.highlightNode = function(graphicID)
{
    this.cmd("SetForegroundColor", graphicID , Heap.BACKGROUND_COLOR);
    this.cmd("SetBackgroundColor", graphicID , Heap.FOREGROUND_COLOR);
}

Heap.prototype.unhighlightNode = function(graphicID)
{
    this.cmd("SetForegroundColor", graphicID , "#000000");
    this.cmd("SetBackgroundColor", graphicID , "#FFFFFF");
}

Heap.prototype.deleteElement = function(deletedValue)
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

Heap.prototype.treeDelete = function(tree, valueToDelete)
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

Heap.prototype.deleteCurrentHighlightedNode = function(node, replacementNode)
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

Heap.prototype.getNode1 = function(data,tree)
{
    if(tree==null)return null;
    if(tree.data==data)return tree;
    if(tree.data<data)return this.getNode1(data, tree.right);
    else return this.getNode1(data, tree.left);
}

Heap.prototype.getNode = function(data)
{
    return this.getNode1(data,currentAlg.treeRoot);
}

Heap.prototype.moveReplacementNode = function(replacementNode)
{

}

Heap.prototype.addStep = function(str)
{
    document.getElementById(HeapUtils.getAnswerID()).value = document.getElementById(HeapUtils.getAnswerID()).value+" "+str;
}

Heap.prototype.mark = function()
{
    currentAlg.addStep(currentHighlightNode.data);
    document.getElementById("menuSimple").style.display = "none";
}

Heap.prototype.submitAnswer = function()
{
    this.answers[HeapUtils.getQuestionID()] = document.getElementById(HeapUtils.getAnswerID()).value;
}

Heap.prototype.resetAnswer = function()
{
    this.answers[HeapUtils.getQuestionID()] = document.getElementById(HeapUtils.getAnswerID()).value = '';
}

Heap.prototype.test = function()
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
	currentAlg = new Heap(animManag, canvas.width, canvas.height);
	currentHighlightNode  = currentAlg.treeRoot;
    initCommands = currentAlg.commands;

    addEventsToNode(animManag);
    insertNodeToActionListener();
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
//    currentAlg = new Heap(currentAlg.values, animManag, canvas.width, canvas.height);
//    currentHighlightNode = currentAlg.treeRoot;
//    initCommands = currentAlg.commands;
//}

Heap.prototype.setIndexHighlight = function(index, highlightVal)
{
	this.cmd("SetHighlight", this.circleObjs[index], highlightVal);
	this.cmd("SetHighlight", this.arrayRects[index], highlightVal);
}