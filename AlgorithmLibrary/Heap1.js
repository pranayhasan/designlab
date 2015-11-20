
Heap.LINK_COLOR = "#007700";
Heap.HIGHLIGHT_CIRCLE_COLOR = "#007700";
Heap.FOREGROUND_COLOR = "#007700";
Heap.BACKGROUND_COLOR = "#EEFFEE";
Heap.PRINT_COLOR = Heap.FOREGROUND_COLOR;
Heap.HEIGHT_COLOR = Heap.FOREGROUND_COLOR;

// Heap.WIDTH_DELTA  = 50;
// Heap.HEIGHT_DELTA = 50;
// Heap.STARTING_Y = 120;


// Heap.FIRST_PRINT_POS_X  = 100;
// Heap.PRINT_VERTICAL_GAP  = 20;
// Heap.PRINT_HORIZONTAL_GAP = 50;


// Heap.FIRST_HEIGHT_POS_X  = 50;
// Heap.HEIGHT_VERTICAL_GAP  = 20;


Heap.WIDTH_DELTA  = 100;
Heap.HEIGHT_DELTA = 70;
Heap.STARTING_Y = 100;


Heap.FIRST_PRINT_POS_X  = 100;
Heap.PRINT_VERTICAL_GAP  = 20;
Heap.PRINT_HORIZONTAL_GAP = 50;


Heap.FIRST_HEIGHT_POS_X  = 50;
Heap.HEIGHT_VERTICAL_GAP  = 20;

//****************************
var ARRAY_SIZE  = 32;
var ARRAY_ELEM_WIDTH = 30;
var ARRAY_ELEM_HEIGHT = 25;
var ARRAY_INITIAL_X = 30;

var ARRAY_Y_POS = 50;
var ARRAY_LABEL_Y_POS = 70;
//*****************************


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
	this.startingX =  450;
    this.first_print_pos_y  = h - 2 * Heap.PRINT_VERTICAL_GAP;
    this.first_HEIGHT_pos_y  = h - 2 * Heap.HEIGHT_VERTICAL_GAP;
    this.print_max  = w - 10;

	var fn = sc.init;
	fn.call(this,am);


	this.addControls();
	this.HeapXPositions = [0, 450, 250, 650, 150, 350, 550, 750, 100, 200, 300, 400, 500, 600,
					  700, 800, 075, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 
					  625, 675, 725, 775, 825];
	this.HeapYPositions = [0, 100, 170, 170, 240, 240, 240, 240, 310, 310, 310, 310, 310, 310,
					  310, 310, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 
					  380, 380, 380, 380, 380];
	// this.commands = [];
	this.nextIndex = 0;

	var seed = 29,offset = 1;
	Math.seed = seed+offset;
	this.createArray();

	this.initCommands = this.commands;

	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}

Heap.prototype.addControls =  function() //Inserts elements in diplay and sets callbacks
{
	//ADMIN
	addCheckboxToAlgorithmBar("ADMIN");
	this.newArrayButton = addControlToAlgorithmBar("Button", "Generate Array");
	this.newArrayButton.onclick = this.newArrayCallback.bind(this);

	this.insertButton = addControlToAlgorithmBar("Button", "Insert >");
	this.insertField = addControlToAlgorithmBar("Text", "");
	this.insertField.onkeydown = this.returnSubmit(this.insertField, this.insertCallback.bind(this), 4, true);
	this.insertButton.onclick = this.insertCallback.bind(this);

	this.removeSmallestButton = addControlToAlgorithmBar("Button", "Remove Smallest");
	this.removeSmallestButton.onclick = this.removeSmallestCallback.bind(this);

	this.buildHeapButton = addControlToAlgorithmBar("Button", "Make Heap");
	this.buildHeapButton.onclick = this.buildHeapCallback.bind(this);

	this.heapifyButton = addControlToAlgorithmBar("Button", "Heapify Index >");
	this.insertIndex = addControlToAlgorithmBar("Text", "");
	this.insertIndex.onkeydown = this.returnSubmit(this.insertIndex, this.heapifyCallback.bind(this), 2, true);
	this.heapifyButton.onclick = this.heapifyCallback.bind(this);

	this.clearHeapButton = addControlToAlgorithmBar("Button", "Clear Heap");
	this.clearHeapButton.onclick = this.clearCallback.bind(this);

}

Heap.prototype.newArrayCallback = function(event)
{
	this.implementAction(this.newArrayBox.bind(this),"");			
}

Heap.prototype.insertCallback = function(event)
{
	var insertedValue = this.normalizeNumber(this.insertField.value,4);
	if (insertedValue != "")
	{
		// console.log('Value inserted :'+parseInt(insertedValue));
		this.insertField.value = "";
		this.implementAction(this.insertElementBox.bind(this),parseInt(insertedValue));
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

Heap.prototype.heapifyCallback = function(event)
{
	var insertedValue = this.normalizeNumber(this.insertIndex.value,2);
	if (insertedValue != "")
	{
		this.insertIndex.value = "";
		this.implementAction(this.heapify.bind(this),parseInt(insertedValue));
	}
}

Heap.prototype.deleteCallback = function(event)
{
	var deleteID = this.normalizeNumber(this.deleteIndex.value,2);
	if (deleteID != "")
	{
		this.deleteIndex.value = "";
		this.implementAction(this.deleteElement.bind(this),parseInt(deleteID));
	}
}

Heap.prototype.clearCallback = function(event) //TODO:  Make me undoable!!
{
	this.commands = new Array();
	this.implementAction(this.clear.bind(this),"");
}

Heap.prototype.createArray = function()
{
	this.heapStructure = new Array(ARRAY_SIZE);
	this.heapStructure[0] = new HeapNode(0,0,this.ARRAY_INITIAL_X+30, ARRAY_LABEL_Y_POS);
	this.arrayData = new Array(ARRAY_SIZE);
	this.arrayLabels = new Array(ARRAY_SIZE);
	this.arrayRects = new Array(ARRAY_SIZE);
	// this.circleObjs = new Array(ARRAY_SIZE);
	this.ArrayXPositions = new Array(ARRAY_SIZE);
	this.currentHeapSize = 0;
	
	for (var i = 0; i < ARRAY_SIZE; i++)
	{
		this.ArrayXPositions[i] = ARRAY_INITIAL_X + i *ARRAY_ELEM_WIDTH; //Position of each element to display
		this.arrayRects[i] = this.nextIndex++;
		// this.circleObjs[i] = this.nextIndex++;
		if(i)
		{
			this.cmd("CreateRectangle", this.arrayRects[i], "", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, this.ArrayXPositions[i] , ARRAY_Y_POS)
			// this.cmd("CreateLabel", this.arrayLabels[i], i,  this.ArrayXPositions[i]+30, ARRAY_LABEL_Y_POS);
			this.cmd("SetForegroundColor", this.arrayLabels[i], Heap.FOREGROUND_COLOR);
		}
	}

	for (var i = 0; i < ARRAY_SIZE-1; i++)
	{
		this.arrayLabels[i] = this.nextIndex++; 
		this.cmd("CreateLabel", this.arrayLabels[i], i,  this.ArrayXPositions[i]+30, ARRAY_LABEL_Y_POS);
	}


	this.swapLabel1 = this.nextIndex++;
	this.swapLabel2 = this.nextIndex++;
	this.swapLabel3 = this.nextIndex++;
	this.swapLabel4 = this.nextIndex++;
	this.descriptLabel1 = this.nextIndex++;
	this.descriptLabel2 = this.nextIndex++;
	this.cmd("CreateLabel", this.descriptLabel1, "", 20, 10,  0);
	//this.cmd("CreateLabel", this.descriptLabel2, "", this.nextIndex, 40, 120, 0);

	this.newArray();
}

Heap.prototype.newArrayBox = function(event)
{
	this.commands = new Array();
	this.newArray();
	return this.commands;
}

Heap.prototype.newArray = function(event) 
{
	// this.commands = new Array();
	this.clear();
	heapsize = Math.seededRandom(10,100)%15+10;
	this.currentHeapSize = 0;
	for (var i = 1; i < heapsize; i++)
	{
		this.arrayData[i] = parseInt(this.normalizeNumber(String(Math.seededRandom(10,100)), 4));
		this.insertElement(this.arrayData[i]);
	}
	// this.cmd("Step");
	// return this.commands;
};

Heap.prototype.insertElementBox = function(insertedValue)
{
	this.commands = new Array();
	this.insertElement(insertedValue);
	return this.commands;
}

Heap.prototype.insertElement = function(insertedValue)
{
	
	if (this.currentHeapSize >= ARRAY_SIZE - 1)
	{
		this.cmd("SetText", this.descriptLabel1, "Heap Full!");
		return this.commands;
	}

	// console.log("Inserting Element: " + insertedValue);
	this.cmd("SetText", this.descriptLabel1, "Inserting Element: " + insertedValue);
	this.cmd("Step");
	// this.cmd("SetText", this.descriptLabel1, "");
	
	this.currentHeapSize++;
	this.arrayData[this.currentHeapSize] = insertedValue;
	//********
	if(this.treeRoot == null)
	{
		this.cmd("CreateCircle",this.nextIndex, insertedValue, this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
		this.cmd("SetForegroundColor", this.nextIndex, Heap.FOREGROUND_COLOR);//added
    	this.cmd("SetBackgroundColor", this.nextIndex, Heap.BACKGROUND_COLOR);//added
    	this.cmd("Step");

		this.heapStructure[this.currentHeapSize] = new HeapNode(insertedValue, this.nextIndex, this.startingX, this.STARTING_Y);
		this.heapStructure[this.currentHeapSize].graphicID = this.nextIndex;
		this.heapStructure[this.currentHeapSize].data = insertedValue;
		this.heapStructure[this.currentHeapSize].x = this.HeapXPositions[this.currentHeapSize];
		this.heapStructure[this.currentHeapSize].y = this.HeapYPositions[this.currentHeapSize];
		this.treeRoot = this.heapStructure[this.currentHeapSize];

    	this.nextIndex += 1;
	}
	else
	{
		this.cmd("CreateCircle",this.nextIndex, insertedValue, this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
		// this.cmd("CreateCircle",this.nextIndex, insertedValue, 100, 100);
		this.cmd("Step");

		this.heapStructure[this.currentHeapSize] = new HeapNode(insertedValue, this.nextIndex, this.HeapXPositions[i], this.HeapYPositions[i]);
		// this.heapStructure[this.currentHeapSize] = new HeapNode(insertedValue, this.nextIndex, 100, 100);
		this.heapStructure[this.currentHeapSize].graphicID = this.nextIndex;
		this.heapStructure[this.currentHeapSize].data = insertedValue;
		this.heapStructure[this.currentHeapSize].x = this.HeapXPositions[this.currentHeapSize];
		this.heapStructure[this.currentHeapSize].y = this.HeapYPositions[this.currentHeapSize];

		this.heapStructure[this.currentHeapSize].parent = this.heapStructure[Math.floor(this.currentHeapSize/2)]
		if(this.currentHeapSize%2 == 0)
			this.heapStructure[Math.floor(this.currentHeapSize/2)].left = this.heapStructure[this.currentHeapSize];
		else
			this.heapStructure[Math.floor(this.currentHeapSize/2)].right = this.heapStructure[this.currentHeapSize];

		this.nextIndex += 1;

	}
	//********

	this.cmd("CreateLabel", this.descriptLabel2, insertedValue, 120, 45,  1);
	if (this.currentHeapSize > 1)
	{
		// this.cmd("Connect", this.circleObjs[Math.floor(this.currentHeapSize / 2)], this.circleObjs[this.currentHeapSize], Heap.LINK_COLOR);
		this.cmd("Connect", this.heapStructure[Math.floor(this.currentHeapSize / 2)].graphicID, this.heapStructure[Math.floor(this.currentHeapSize)].graphicID, Heap.LINK_COLOR);
	}
	
	// this.cmd("Move", this.descriptLabel2, this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
	this.cmd("Move", this.descriptLabel2, this.heapStructure[this.currentHeapSize].x, this.heapStructure[this.currentHeapSize].y);
	this.cmd("Step");
	// this.cmd("SetText", this.circleObjs[this.currentHeapSize], insertedValue);
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
	this.highlightID = this.nextIndex;
}

Heap.prototype.insert = function(insertedValue)
{
	if (this.currentHeapSize >= ARRAY_SIZE - 1)
	{
		this.cmd("SetText", this.descriptLabel1, "Heap Full!");
		return this.commands;
	}

	// console.log("Inserting Element: " + insertedValue);
	this.cmd("SetText", this.descriptLabel1, "Inserting Element: " + insertedValue);
	this.cmd("Step");
	// this.cmd("SetText", this.descriptLabel1, "");
	
	this.currentHeapSize++;
	this.arrayData[this.currentHeapSize] = insertedValue;
	//********
	if(this.treeRoot == null)
	{
		this.heapStructure[this.currentHeapSize] = new HeapNode(insertedValue, this.nextIndex, this.HeapXPositions[i], this.HeapYPositions[i]);
		this.heapStructure[this.currentHeapSize].graphicID = this.nextIndex;
		this.heapStructure[this.currentHeapSize].data = insertedValue;
		this.heapStructure[this.currentHeapSize].x = this.HeapXPositions[this.currentHeapSize];
		this.heapStructure[this.currentHeapSize].y = this.HeapYPositions[this.currentHeapSize];
		this.treeRoot = this.heapStructure[this.currentHeapSize];

		this.cmd("CreateCircle",this.nextIndex, insertedValue, this.heapStructure[this.currentHeapSize].x, this.heapStructure[this.currentHeapSize].y);
		this.cmd("SetForegroundColor", this.nextIndex, Heap.FOREGROUND_COLOR);//added
    	this.cmd("SetBackgroundColor", this.nextIndex, Heap.BACKGROUND_COLOR);//added
    	this.nextIndex += 1;
	}
	else
	{
		this.heapStructure[this.currentHeapSize] = new HeapNode(insertedValue, this.nextIndex, this.HeapXPositions[i], this.HeapYPositions[i]);
		this.heapStructure[this.currentHeapSize].graphicID = this.nextIndex;
		this.heapStructure[this.currentHeapSize].data = insertedValue;
		this.heapStructure[this.currentHeapSize].x = this.HeapXPositions[this.currentHeapSize];
		this.heapStructure[this.currentHeapSize].y = this.HeapYPositions[this.currentHeapSize];

		this.heapStructure[this.currentHeapSize].parent = this.heapStructure[Math.floor(this.currentHeapSize/2)]
		if(this.currentHeapSize%2 == 0)
			this.heapStructure[Math.floor(this.currentHeapSize/2)].left = this.heapStructure[this.currentHeapSize];
		else
			this.heapStructure[Math.floor(this.currentHeapSize/2)].right = this.heapStructure[this.currentHeapSize];

		this.cmd("CreateCircle",this.nextIndex, insertedValue, this.heapStructure[this.currentHeapSize].x, this.heapStructure[this.currentHeapSize].y);
		this.nextIndex += 1;

	}
	this.highlightID = this.nextIndex;
	//********

	this.cmd("CreateLabel", this.descriptLabel2, insertedValue, 120, 45,  1);
	if (this.currentHeapSize > 1)
	{
		// this.cmd("Connect", this.circleObjs[Math.floor(this.currentHeapSize / 2)], this.circleObjs[this.currentHeapSize], Heap.LINK_COLOR);
		this.cmd("Connect", this.heapStructure[Math.floor(this.currentHeapSize / 2)].graphicID, this.heapStructure[Math.floor(this.currentHeapSize)].graphicID, Heap.LINK_COLOR);
	}
	
	// this.cmd("Move", this.descriptLabel2, this.HeapXPositions[this.currentHeapSize], this.HeapYPositions[this.currentHeapSize]);
	this.cmd("Move", this.descriptLabel2, this.heapStructure[this.currentHeapSize].x, this.heapStructure[this.currentHeapSize].y);
	this.cmd("Step");
	// this.cmd("SetText", this.circleObjs[this.currentHeapSize], insertedValue);
	this.cmd("delete", this.descriptLabel2);
	this.cmd("SetText", this.arrayRects[this.currentHeapSize], insertedValue);

	this.resizeTree();

	return this.heapStructure[this.currentHeapSize];
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
            // startingPoint = this.treeRoot.rightWidth;
            // startingPoint = 2 * startingPoint - this.treeRoot.rightWidth;
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
            // xPosition = xPosition + tree.rightWidth;
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
	// this.cmd("SetText", this.circleObjs[1], "");
	this.cmd("SetText", this.heapStructure[1].graphicID, "");
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
		// this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
		this.cmd("Delete", this.heapStructure[this.currentHeapSize].graphicID);
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

Heap.prototype.swapWithParent = function(index)
{
	index += 1;

	if(index > this.currentHeapSize || index <= 1)
	{
		this.cmd("SetText", this.descriptLabel1, "Swapping not possible!");
		return this.commands;
	}

	parent = parseInt(index/2);
	this.cmd("SetText", this.descriptLabel1, 'swapping indices '+index+' and its parent '+parent);

	index1 = index;
	index2 = parent;

	// console.log('swapping index '+(index1+1)+' and '+(index2+1));
	this.swap(index1, index2);
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

Heap.prototype.swap = function(index1, index2)
{
	// console.log('swapping index '+index1+' and '+index2);
	this.cmd("SetText", this.arrayRects[index1], "");
	this.cmd("SetText", this.arrayRects[index2], "");
	// this.cmd("SetText", this.circleObjs[index1], "");
	this.cmd("SetText", this.heapStructure[index1].graphicID, "");
	// this.cmd("SetText", this.circleObjs[index2], "");
	this.cmd("SetText", this.heapStructure[index2].graphicID, "");
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
	var tmp1 = this.heapStructure[index1].data;
	this.heapStructure[index1].data = this.heapStructure[index2].data;
	this.heapStructure[index2].data = tmp1;

	this.cmd("Step")
	this.cmd("SetText", this.arrayRects[index1], this.arrayData[index1]);
	this.cmd("SetText", this.arrayRects[index2], this.arrayData[index2]);
	// this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
	this.cmd("SetText", this.heapStructure[index1].graphicID, this.arrayData[index1]);
	// this.cmd("SetText", this.circleObjs[index2], this.arrayData[index2]);
	this.cmd("SetText", this.heapStructure[index2].graphicID, this.arrayData[index2]);
	this.cmd("Delete", this.swapLabel1);
	this.cmd("Delete", this.swapLabel2);
	this.cmd("Delete", this.swapLabel3);
	this.cmd("Delete", this.swapLabel4);
}

Heap.prototype.clear = function()//TODO:  Make me undoable!!
{
	
	while (this.currentHeapSize > 0)
	{
		// this.cmd("Delete", this.circleObjs[this.currentHeapSize]);
		this.cmd("Delete", this.heapStructure[this.currentHeapSize].graphicID);
		this.cmd("SetText", this.arrayRects[this.currentHeapSize], "");
		this.currentHeapSize--;
	}
	return this.commands;
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
	this.insertField.disabled = true;
	this.insertIndex.disabled = true;
	this.insertButton.disabled = true;
	this.removeSmallestButton.disabled = true;
	this.clearHeapButton.disabled = true;
	this.buildHeapButton.disabled = true;
	this.heapifyButton.disabled = true;
}

Heap.prototype.enableUI = function(event)
{
	this.insertField.disabled = false;
	this.insertIndex.disabled = false;
	this.insertButton.disabled = false;
	this.removeSmallestButton.disabled = false;
	this.clearHeapButton.disabled = false;
	this.buildHeapButton.disabled = false;
	this.heapifyButton.disabled = false;
}

Heap.prototype.moveLeft = function()
{
    if(currentHighlightNode.left==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);

    currentHighlightNode = currentHighlightNode.left;
    this.highlightNode(currentHighlightNode.graphicID);
    return true;
}

Heap.prototype.moveRight = function()
{
    if(currentHighlightNode.right==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);


    currentHighlightNode = currentHighlightNode.right;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

Heap.prototype.moveToParent = function()
{
    if(currentHighlightNode.parent==null)return false;

    this.unhighlightNode(currentHighlightNode.graphicID);

    currentHighlightNode = currentHighlightNode.parent;
    this.highlightNode(currentHighlightNode.graphicID);

    this.highlightID = currentHighlightNode.graphicID;
    return true;
}

Heap.prototype.highlightNode = function(graphicID){
    this.cmd("SetForegroundColor", graphicID , Heap.BACKGROUND_COLOR);
    this.cmd("SetBackgroundColor", graphicID , Heap.FOREGROUND_COLOR);
}

Heap.prototype.unhighlightNode = function(graphicID){
    this.cmd("SetForegroundColor", graphicID , "#000000");
    this.cmd("SetBackgroundColor", graphicID , "#FFFFFF");
}

function RandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
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
    insertNodesToActionListener();
}


function addEventsToNode(animManag){
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
            	// console.log(element.graphicID)

                var manager = animManag.animatedObjects,
                    id = element.graphicID,
                    ex = manager.getNodeX(id),
                    ey = manager.getNodeY(id),
                    er = manager.getNodeRadius(id);
                // console.log(currentHighlightNode.graphicID+" "+id);
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


// Heap.prototype.reset = function()
// {
// 	this.currentHeapSize = 0;
// }

Heap.prototype.setIndexHighlight = function(index, highlightVal)
{
	// this.cmd("SetHighlight", this.circleObjs[index], highlightVal);
	this.cmd("SetHighlight", this.heapStructure[index].graphicID, highlightVal);
	this.cmd("SetHighlight", this.arrayRects[index], highlightVal);
}

Heap.prototype.rename = function(index, value)
{
	index += 1

	// console.log('swapping index '+index1+' and '+index2);
	this.cmd("SetText", this.arrayRects[index], "");
	// this.cmd("SetText", this.circleObjs[index1], "");
	this.cmd("SetText", this.heapStructure[index].graphicID, "");
	// this.cmd("SetText", this.circleObjs[index2], "");
	
	this.arrayData[index] = parseInt(value);
	this.heapStructure[index].data = parseInt(value);

	this.cmd("Step")
	this.cmd("SetText", this.arrayRects[index], this.arrayData[index]);
	// this.cmd("SetText", this.circleObjs[index1], this.arrayData[index1]);
	this.cmd("SetText", this.heapStructure[index].graphicID, this.arrayData[index]);
}
