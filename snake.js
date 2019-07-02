var game;
var canvasColor = "#fff2e6";
//var url = "django-env.zfeaphv3hm.eu-west-2.elasticbeanstalk.com";
var url = "leaderBoard";
var score = 0;

var snakeBody = [[252, 252]];
var snakeDirection = "right";

var foodX = 96;
var foodY = 180;
var bigFoodX;
var bigFoodY;
var foodCounter = 0;
var bigFoodTimer = 0;
var bigFoodTimeLimit = 50;

var ctx;
var canvas;

var gameSpeed = 150;

function run_game(){
	moveSnake();
	redraw();
	
}

//repaint the canvas
function redraw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//paint snake
	for(i = 0; i < snakeBody.length; i++){
		ctx.beginPath();
		ctx.rect(snakeBody[i][0],snakeBody[i][1],12,12);
		ctx.fillStyle = "red";
		ctx.strokeStyle = "red";
		ctx.fill();
		ctx.stroke();
	}
	
	//paint food
	ctx.beginPath();
	ctx.rect(foodX, foodY,12,12);
	ctx.fillStyle = "green";
	ctx.strokeStyle = "green";
	ctx.fill();
	ctx.stroke();
	
	//paint big food
	if(foodCounter >= "5"){
		if(bigFoodTimer < bigFoodTimeLimit){
			ctx.beginPath();
			ctx.rect(bigFoodX, bigFoodY,12,12);
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
			ctx.fill();
			ctx.stroke();
			bigFoodTimer++;
		}else{
			foodCounter = 0;
			bigFoodTimer = 0;
		}		
	}
}

//update the snakes position
function moveSnake(){
	
	//move the body
	for(i = snakeBody.length - 1; i > 0; i--){
		snakeBody[i][0] = snakeBody[i - 1][0];
		snakeBody[i][1] = snakeBody[i - 1][1];
	}

	//move head
	if(snakeDirection == "right"){
		snakeBody[0][0] += 12;
	}else if(snakeDirection == "left"){
		snakeBody[0][0] -= 12;
	}else if(snakeDirection == "up"){
		snakeBody[0][1] -= 12;
	}if(snakeDirection == "down"){
		snakeBody[0][1] += 12;
	}
	
	//check if snake hit itself
	for(i = 1; i < snakeBody.length; i++){
		if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
			clearInterval(game);
			alert("You Lost!");
			submitHighScore();
			
		}
	}
	
	//check if head is outside the wall
	for(j = 0; j <= 1; j++){
		if(snakeBody[0][j] > 492){
			//snakeBody[0][j] = 0;

			clearInterval(game);
			alert("You Lost!");
			submitHighScore();
		}else if(snakeBody[0][j] < 0){
			//snakeBody[0][j] = 492;

			clearInterval(game);
			alert("You Lost!");
			submitHighScore();
		}
	}
	
	//check if snake eats food
	if(snakeBody[0][0] == foodX && snakeBody[0][1] == foodY){
		snakeBody.push([foodX, foodY]);
		foodCounter++;

		do{
			var x = Math.floor(Math.random() * 504);
		}while(x%12 != "0")
			
		do{
			var y = Math.floor(Math.random() * 504);
		}while(y%12 != "0")
		foodX = x;
		foodY = y;
		
		//update score
		score += 50;
		document.getElementById("score").innerHTML = ("00000000" + score).slice(-8);
		
		//create big food
		if(foodCounter == "5"){
			do{
				var x = Math.floor(Math.random() * 504);
			}while(x%12 != "0")
			
			do{
				var y = Math.floor(Math.random() * 504);
			}while(y%12 != "0")
			bigFoodX = x;
			bigFoodY = y;
		}
		
	}
	
	//check if snake eats big food
	if(snakeBody[0][0] == bigFoodX && snakeBody[0][1] == bigFoodY){
		foodCounter = 0;
		bigFoodTimer = 0;
		snakeBody.push([bigFoodX, bigFoodY]);
		
		//update score
		score += 200;
		document.getElementById("score").innerHTML = ("00000000" + score).slice(-8);
	}
}

//let the user choose direction using keyboard
document.onkeydown = function direction(e){
	var event = window.event ? window.event : e
    var key = event.keyCode;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    }else{
        if((key == "38" || key == "87") && snakeDirection != "down"){
		    snakeDirection = "up";
	    }else if((key == "40" || key == "83" ) && snakeDirection != "up" ){
		    snakeDirection = "down";
	    }else if((key == "37" || key == "65") && snakeDirection != "right" ){
		    snakeDirection = "left";
	    }else if((key == "39" || key == "68") && snakeDirection != "left" ){
		    snakeDirection = "right";
	    }
    }
}

//let the user choose direction using mobile
function keypad(dir){

    snakeDirection = dir;
}

//-------------------------------------------------------LeaderBoard------------------------------------------------------
//submit score
function submitHighScore(){
    //send your score
    //var name = document.getElementById("playername").value;
    var nameField = document.getElementById("playername").innerHTML;
    var name;
    if(nameField == "name"){
        name = prompt("Submit Score! \nPlease enter your name:", "");
        if(name === null || name == ""){
            return;
        }
        document.getElementById("playername").innerHTML = name;
        nameField = name;
    }

    var xhr = new XMLHttpRequest();

    var format = /[ !@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/;

    if(!format.test(nameField) && nameField.length < 10){

        document.getElementsByClassName('hidden')[0].style.visibility = "visible";
        document.getElementsByClassName('hidden')[1].style.visibility = "visible";

        //var url = "http://52.20.143.165:8000/raytrace";
        xhr.open("POST", url, true);
        xhr.send(nameField + " " + score);

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                request_scores();
            }
        }
    }else{

        alert("Use less than 10 characters. Single word name with no spaces and special characters.");
        document.getElementById("playername").innerHTML = "name";
        submitHighScore();
    }
}




function request_scores(){
 //update table on the page
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respo = this.responseText;

            if (respo == ""){
                request_scores();
            }else{
                document.getElementById("scores").innerHTML = respo;
            }

       }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
//------------------------------------------------------------------------------------------------------------------------



//restart the game
function restart(){
	score = 0;
	snakeBody = [[252, 252]];
	snakeDirection = "right";
	clearInterval(game);
	game = window.setInterval(run_game, gameSpeed);


}

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 500) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

//run the game when the page load
window.onload = function() {
    request_scores();
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById("keypad").style.display = "block";
    }

	game = window.setInterval(run_game, gameSpeed);
};