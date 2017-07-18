const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const fieldArray = inputToArray(input);
const bombField = createBombField(fieldArray);
const output = fieldToString(bombField);
console.log(output);

function inputToArray(input) {
	const fieldArray = [];
	let row = [];
	for(let i=0; i < input.length; i++) {	
		if(input[i] === "X" || input[i] === "O" ) {		
			row.push(input[i]);	
		}
		if(input[i] === "\n" || i === input.length-1) {
			if(row.length === 0) {
				continue;
			}
			fieldArray.push(row);
			row = [];
		}	
	}
	return fieldArray;
}

function createBombField(array) {
	const bombField = array.map(arr => arr.slice());
	let count = 0;
	for(let y = 0; y < array.length; y++) {
		for(let x = 0; x < array[y].length; x++ ) {
			if(array[x][y] === "X") {
				continue;
			} else {			
				if (isAMine(x, y+1, array)) count++;
				if (isAMine(x+1, y+1, array)) count++;
				if (isAMine(x+1, y, array)) count++;
				if (isAMine(x+1, y-1, array)) count++;
				if (isAMine(x, y-1, array)) count++;
				if (isAMine(x-1, y-1, array)) count++;
				if (isAMine(x-1, y, array)) count++;
				if (isAMine(x-1, y+1, array)) count++;
				bombField[x][y] = count;
				count = 0;			
			}
		}
	}
	return bombField;
}

function isAMine(x, y, array) {
	if (x >= 0 && y >= 0 && y < array.length && x < array[y].length ) {			
		if(array[x][y] === "X") {				
			return true;
		}
	}
	return false;
}

function fieldToString(array) {
	let output = "";	
	for(let x = 0; x < array.length; x++) {
		for(let y = 0; y < array[x].length; y++ ) {
			if(y === array[x].length -1 ) {
				output += array[x][y] + "\n";				
			} else {
				output += array[x][y] + " ";
			}
		}
	}
	return output;
}