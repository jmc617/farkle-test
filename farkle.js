let diceArr = [];
let score = 0;
let justBanked = false;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = false;
		diceArr[i].banked = false;
	}
	console.log(diceArr)
}

/*Rolling dice values*/
function rollDice(){
	for(var i=0; i < 6; i++){
		if(diceArr[i].banked === false){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	console.log(diceArr)
	updateDiceImg();
	justBanked = false;
	//call function to check if rolled dice fit any condiions to add points
	//if not, alert Farkle and restart game:
	//MOVED CODE:
	//create array with clicked, but not banked dice to be evaluated
	//create array with clicked, but not banked dice to be evaluated
	// let bankedDice = [];
	// for(let i = 0; i < 6; i++){
	// 	if (diceArr[i].banked===false && diceArr[i].clicked===true){

	// 		bankedDice.push(diceArr[i]);
	// 		diceArr[i].banked = true;	
	// 	}
	// }
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
	
	//ignore clicking if it is banked
	if(diceArr[i].banked === true){
		return;
	} else {
		img.classList.toggle("transparent");
		if(diceArr[i].clicked === false){
			diceArr[i].clicked = true;
		} else {
			diceArr[i].clicked = false;
		}
	}


}

//Have to evaluate the dice game value and give appropriate points
//banked dice can no longer be unbanked or evaluted for next roll 
//(add an attribute to dice object and a check to diceClick and bank function)
function scoreBank(dice){
	//evaluate the dice and add to the banked score
	//score for testing
	score = score + 100;
	document.getElementById("score").innerHTML = score;
}

function bankDice(){
	//check if any dice are clicked and not banked before banking
	const newClicked = () => {

		for(let i = 0; i < 6; i++){
			if(diceArr[i].clicked === true && diceArr[i].banked === false){
				return true;
			}
		}
	}

	if(justBanked === false && newClicked){
		let confirmed = confirm('are you sure you want to bank? this is not reversible.');
		if(confirmed){
			//create array with clicked, but not banked dice to be evaluated
			let bankedDice = [];
			for(let i = 0; i < 6; i++){
				if (diceArr[i].banked===false && diceArr[i].clicked===true){
	
					bankedDice.push(diceArr[i]);
					diceArr[i].banked = true;	
				}
			}
			console.log(diceArr, bankedDice)
			justBanked = true;
			scoreBank(bankedDice);
		}
	}


}

