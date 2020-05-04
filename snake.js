function init(){
    game = document.getElementById('gamegraphics');
    game.width = game.height = 700;
    pen = game.getContext('2d');
    cs = 30;
    food = getfood();
    game_over = false;
    score = 0;
    food_img = new Image();
    food_img.src = "image/apple.jpeg";

    trophy_img = new Image();
    trophy_img.src = "image/trophy.jpeg";

    n={
		x : -50,
		y : -50
	}

    snake = {
    	init_len : 5,
    	color : "blue",
    	cells : [],
    	direction : "right",

    	Screate:function(){
    		for(var i=this.init_len; i>0; i--){
    			this.cells.push( {x:i,y:0});
    		}
    	},

    	Sdraw:function(){
    		
    		for( var i=0; i<this.cells.length ; i++){
    			pen.fillStyle=this.color;
    			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
    			console.log('hi');	
    		}
    		
    	},

    	Supdate:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			var X=-50,Y=-50;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getfood();
				score++;
			}
			else{
				this.cells.pop();
			}

			if(this.direction=="right" ){
				X=headX+1;
				Y=headY;
			}
			else if(this.direction=="down"){
			 	X=headX;
				Y=headY+1;
			}
			else if(this.direction=="left" ){
				X=headX-1;
				Y=headY;
			}
			else if(this.direction=="up"){
				X=headX;
				Y=headY-1;
			}
			function isPresent(f) { 
  				return (f.x==X && f.y==Y);
			}

			if(this.cells.find(isPresent)!=undefined){
			 	game_over = true;
			}
			else{
				//console.log(this.cells.indexOf({X,Y}));
				this.cells.unshift({ x: X,y: Y});
			}
			var last_x = Math.round(game.width/cs);
			var last_y = Math.round(game.height/cs);

			if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
				game_over = true;
			}
    	}
    };

    snake.Screate();
    //Ading Event Listener on Document

    function keyPressed(e){
    	if(e.key=="ArrowRight" && snake.direction!="left"){

    		snake.direction = "right";
    	}
    	else if(e.key=="ArrowLeft"  && snake.direction!="right"){
    		console.log('ho');
    		snake.direction = "left";
    	}
    	else if(e.key == "ArrowDown" && snake.direction!="up"){
    		snake.direction = "down";
    	}

    	else if(e.key == "ArrowUp" && snake.direction!="down"){
    		snake.direction = "up";
    	}

    	console.log(snake.direction);
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
	pen.clearRect(0,0,game.width,game.height);
	snake.Sdraw();
	pen.fillStyle="black";
	pen.fillRect(40,30,cs,cs);
	//pen.drawImage(trophy_img,38,30,cs,cs);
	pen.fillStyle = 'green';
	pen.fillRect(food.x*cs,food.y*cs,cs,cs);
	pen.font = "15px Roboto";
	pen.fillStyle = 'yellow';
	pen.fillText(score,50,50);
}

function update(){
	snake.Supdate();
}

function getfood(){
	var fX = Math.round(Math.random() * ((game.width)-cs)/cs);
	var fY = Math.round(Math.random() * ((game.height)-cs)/cs);

	var food = {
		x : fX,
		y : fY,
	}

	//console.log(fX);
	return food
}

function gameloop(){
	if(game_over){
		clearInterval(f);
		alert("Game OVER. Your score is " + this.score);
		return;
	}
	draw();
	update();
}
init();

var f = setInterval(gameloop,100);