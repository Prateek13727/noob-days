;(function(global){
	var X ='x';
	var O ='o';
	var WON_MESSAGE = 'You Won';
	var LOST_MESSAGE = 'Computer Won';
	var GAME_OVER_MESSAGE = 'Game Tied';
	var TABLE_HEADER = "Tic Toe";
	//Ids
	var GAME_CONATAINER_ID = 'tictoe__gameContainer';
	var TABLE_ID = 'tictoe__table';
	var TABLE_HEADER_ID = 'tictoe__tableHeader';
	var RESEST_BTN_DIV_ID = 'tictoe__resetBtnContainer'
	var RESEST_BTN_ID = 'tictoe__resetBtn';
	var GAMEOVER_TEXT_ID = 'tictoe__gameOverTxt';
	//Colours
	var COLOR_X = '#7ed56f';
	var COLOR_O = '#28b485' ;
	var COLOR_WIN = '#428bca';
	var COLOR_BACKGROUND = '#f9f9f9';
	var COLOR_RESTART = '#5cb85c';

	//------------------------------Utilities-------------------------------
	//debounce
	function debounce(func, delay) {
		let debounceHandler;
		return function() {
			const context = this;
			clearTimeout(debounceHandler);
			debounceHandler = setTimeout(() => {
				func.apply(context, arguments);
			}, delay);
		}
	}
	//get random number
	function getRandomNumber(min, max) {
		return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
	}

	//---------------------Tic Toe Css Class---------------------------
	var CssUtility = {
		addInitialCss: function(){		
			function addCssToContainer() {
				var container = document.getElementById(GAME_CONATAINER_ID);
				container.style.position = 'absolute';
				container.style.left = '50%';
				container.style.top = '5%';
				container.style.transform = 'translateX(-50%)';
				container.style['z-index'] = '9999';	
			}

			function addCssToTable(){
				var table = document.getElementById(TABLE_ID);
				table.style.backgroundColor = COLOR_BACKGROUND;
				table.style.backgroundColor = COLOR_BACKGROUND;
				table.style.borderRadius = '10px';
				table.style.padding = '2px';
				table.style.margin = '10px';
			}

			addCssToContainer();
			addCssToTable();
		},

		addCssToTableCell: function(cellNode){
			cellNode.width='60';	         
           	cellNode.height='60';	
           	cellNode.style.textAlign = 'center';
           	cellNode.style.verticalAlign = 'middle';
           	cellNode.style.borderRadius = '10px';
           	cellNode.style.cursor = 'pointer';	
    		cellNode.style.fontWeight = 'bolder';
    		cellNode.style.opacity = '0.7';
    		cellNode.style.fontStyle = 'oblique';
		},

		addCssToClickedTableCell: function(cellNode, value){
			if(value === X) {
				cellNode.style.backgroundColor = COLOR_X;
			} else {
				cellNode.style.backgroundColor = COLOR_O;
			}
			cellNode.opacity = '1';
			cellNode.style.fontSize = '25px';
		},

		addCssToText: function(ele, text){
			switch(text) {
			    case WON_MESSAGE:
			    case LOST_MESSAGE:
			    case GAME_OVER_MESSAGE:
			        ele.style.textAlign = 'center';
					ele.style.padding = '15px';
					ele.style.textTransform = 'uppercase';
					ele.style.fontSize = '15px';
			        break;
			    case TABLE_HEADER:
			        ele.style.textAlign = 'center';
			        ele.style.textTransform = 'uppercase';
			        ele.style.marginBottom = '10px';
			        ele.style.fontSize = '30px';
			        break;
			    default:
			}
		},

		addCssToRestartButton: function(ele){
			ele.style.backgroundColor = COLOR_RESTART;
			ele.style.border = 'none';
			ele.style.borderRadius = '5px';
			ele.style.padding = '10px 15px';
			ele.parentNode.style.textAlign='center';
		},

		addCssToWinningRow: function(row, matrixSize){
			var col = 0;
			while(col < matrixSize){
				var id = row + '-' + col;
				var ele = document.getElementById(id);
				ele.style.backgroundColor = COLOR_WIN;
				col++;
			}
		},

		addCssToWinningColumn: function(column, matrixSize){
			var row = 0;
			while(row < matrixSize){
				var id = row + '-' + column;
				var ele = document.getElementById(id);
				ele.style.backgroundColor = COLOR_WIN;
				row++;
			}
		},

		addCssToWinningLeftDiagonal: function(matrixSize){
			var row = 0;
			var column = 0;
			while(row < matrixSize){
				var id = row + '-' + column;
				var ele = document.getElementById(id);
				ele.style.backgroundColor = COLOR_WIN;
				row++;
				column++;
			}
		},

		addCssToWinningRightDiagonal: function(matrixSize){
			var column = matrixSize-1;
			var row = 0;
			while(row < matrixSize){
				var id = row + '-' + column;
				var ele = document.getElementById(id);
				ele.style.backgroundColor = COLOR_WIN;
				row++;
				column--;
			}
		},
	}


	//---------------------TicToe Game Class-------------------------------
	var TicToe = function(parentNode, matrixSize, playerName="Default Player") {
		return new TicToe.init(parentNode, matrixSize, playerName)
	}

	TicToe.prototype = {
		
		addTable: function(parentNode) {  
			var div = document.createElement('DIV');
			div.id = TABLE_HEADER_ID;
			var textNode = document.createTextNode(TABLE_HEADER);
			div.appendChild(textNode);
			parentNode.appendChild(div);
			CssUtility.addCssToText(div, TABLE_HEADER)

		    var table = document.createElement('TABLE');
		    table.border='1';
		    table.id = TABLE_ID;
		    var tableBody = document.createElement('TBODY');
		    table.appendChild(tableBody);	     
		    for (var i=0; i<this.matrixSize; i++){
		       var tr = document.createElement('TR');
		       tableBody.appendChild(tr);
		       this.moves[i] = [];
		       for (var j=0; j<this.matrixSize; j++){
		           var td = document.createElement('TD');
		           CssUtility.addCssToTableCell(td)
                   var id = i+'-'+j;
		           td.id = id;
		           td.innerHTML = '+';
		           tr.appendChild(td);
		           this.moves[i].push("");  
		           this.availableIndexes.push(id);
		       }
		    }
		    table.onclick = this.onUserClickFunc;
		    parentNode.appendChild(table);
		},

		checkForRowPattern: function(row, column){
			var value = this.moves[row][column];
			var c = 0;
			var n_samePatterns = 0;
			while(c < this.matrixSize){
				if(this.moves[row][c] === value) {
					n_samePatterns++;
				}
				c++;
			}
			if(n_samePatterns === this.matrixSize) {
				CssUtility.addCssToWinningRow(row, this.matrixSize);
				return true;	
			}
			return false;
		},

		checkforColumnPattern: function(row, column){
			var value = this.moves[row][column];
			var r = 0;
			var n_samePatterns = 0;
			while(r < this.matrixSize){
				if(this.moves[r][column] === value) {
					n_samePatterns++;
				}
				r++;
			}
			if(n_samePatterns === this.matrixSize) {
				CssUtility.addCssToWinningColumn(column, this.matrixSize);
				return true;	
			}
			return false;
		},

		checkforLeftDiagonalPattern: function(row, column){
			var value = this.moves[row][column];
			var r = 0;
			var c = 0;
			var n_samePatterns = 0;
			while(r < this.matrixSize){
				if(this.moves[r][c] === value) {
					n_samePatterns++;
				}
				r++;
				c++;
			}
			if(n_samePatterns === this.matrixSize) {
				CssUtility.addCssToWinningLeftDiagonal(this.matrixSize);
				return true;	
			}
			return false;
		},

		checkforRightDiagonalPattern: function(row, column){
			const value = this.moves[row][column];
			let r = 0;
			let c = this.matrixSize-1;
			var n_samePatterns = 0;
			while(r < this.matrixSize){
				if(this.moves[r][c] === value) {
					n_samePatterns++;
				}
				c--;
				r++;
			}
			if(n_samePatterns === this.matrixSize) {
				CssUtility.addCssToWinningRightDiagonal(this.matrixSize);
				return true;	
			}
			return false;
		},

		decideWinner: function(row, column) {
			//decide winnner logic should only invoked after atleast 2 user or computer clicks
			if(this.userClicksCount < this.matrixSize && 
				this.computerClicksCount < this.matrixSize) {
				return false;
			}
			//current click index: left diagonal 			
			if(row === column){
				if(this.checkforLeftDiagonalPattern(row, column)){
					return true;
				}
			}
			//current click index: right diagonal
			else if ((row+column) === (this.matrixSize-1)) {
				if(this.checkforRightDiagonalPattern(row, column)){
					return true;
				}
			}
			//common checks for click anywhere in the matrix
			if(this.checkForRowPattern(row, column)){
				return true;
			}
			if(this.checkforColumnPattern(row, column)){
				return true;
			}
			return false;
		},

		gameOver: function(MESSAGE){
			var container = document.getElementById(GAME_CONATAINER_ID);
			var div = document.createElement('DIV');
			div.id = GAMEOVER_TEXT_ID;
			var textNode = document.createTextNode(MESSAGE);
			div.appendChild(textNode);
			container.appendChild(div);
			CssUtility.addCssToText(div, MESSAGE);
			
			var btnDiv = document.createElement('DIV');
			btnDiv.id = RESEST_BTN_DIV_ID;
			var btn = document.createElement('button');
			btn.innerHTML = 'RESTART';
			btn.id = RESEST_BTN_ID;
			btn.onclick = this.onResetGameFunc;
			btnDiv.appendChild(btn)
			container.appendChild(btnDiv);
			CssUtility.addCssToRestartButton(btn);

			this.isGameOver = true;
		},

		intializeGame: function(){
			this.moves = {};
			this.availableIndexes = [];
			this.userClicksCount=0;
			this.computerClicksCount=0;
			this.isGameOver = false;
		},

		onComputerClick: function(){
			var arrayLength = this.availableIndexes.length;
			if(!arrayLength || this.isGameOver){
				return
			}
			var randomArrIndex = getRandomNumber(0, arrayLength-1);
			var eleId = this.availableIndexes[randomArrIndex]
			var ele = document.getElementById(eleId);
			var row = parseInt(eleId.split("-")[0]);
			var col = parseInt(eleId.split("-")[1]);

			if(!this.validateClick(row, col)){
				return;
			}

			ele.innerHTML = O;
			CssUtility.addCssToClickedTableCell(ele, O);

			this.recordClicks(row, col, O);
			this.removeIndexFromAvailableIndexes(eleId);
			
			if(this.decideWinner(row, col)) {
				this.gameOver(LOST_MESSAGE);
			}
			else if(this.availableIndexes.length === 0) {
				this.gameOver(GAME_OVER);
			}
		},

		onUserClick: function(event){
			var arrayLength = this.availableIndexes.length;
			if(!arrayLength || this.isGameOver){
				return
			}

			var eleId = event.target.id;
			var ele = document.getElementById(eleId);
			var row = parseInt(eleId.split("-")[0]);
			var col = parseInt(eleId.split("-")[1]);

			if(!this.validateClick(row, col)){
				return;
			}

			ele.innerHTML = X;
			CssUtility.addCssToClickedTableCell(ele, X);

			this.recordClicks(row, col, X);
			this.removeIndexFromAvailableIndexes(eleId);
			if(this.decideWinner(row, col)) {
				this.gameOver(WON_MESSAGE);
				return;
			}
			else if(this.availableIndexes.length === 0) {
				this.gameOver(GAME_OVER_MESSAGE);
				return;
			}
			this.onComputerClickFunc();
		},

		recordClicks: function(row, column, value){
			if(value === X) {
				this.userClicksCount++;	
			} else {
				this.computerClicksCount++;
			}
			this.moves[row][column] = value;		
		},

		renderGameAssets: function() {
			var gameContainer = document.createElement('DIV');
			gameContainer.id = GAME_CONATAINER_ID;
			this.parentNode.appendChild(gameContainer);
			this.addTable(gameContainer);
			CssUtility.addInitialCss();
		},

		removeIndexFromAvailableIndexes: function(id) {
			var index = this.availableIndexes.indexOf(id);
			if( index !== -1){
				this.availableIndexes.splice(index, 1);
			}
		},

		resetGame: function(){
			var containerId = document.getElementById(GAME_CONATAINER_ID);
			this.parentNode.removeChild(containerId);
			this.intializeGame();
			this.renderGameAssets();
		},

		validateClick: function(row, column) {
			if(this.moves[row].length && this.moves[row][column]) {
				return false;
			}
			return true;
		}
	};

	TicToe.init = function(parentNode, matrixSize, playerName){
		this.playerName = playerName;
		this.parentNode = parentNode;
		this.matrixSize = matrixSize;
		this.onComputerClickFunc = debounce(this.onComputerClick.bind(this), 500);
		this.onUserClickFunc = debounce(this.onUserClick.bind(this), 500);
		this.onResetGameFunc = debounce(this.resetGame.bind(this), 500);
		this.intializeGame();
		this.renderGameAssets();
	}

	TicToe.init.prototype = TicToe.prototype;

	global.TicToe = TicToe;

}(window));