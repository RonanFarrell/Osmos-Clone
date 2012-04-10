var canvas = document.getElementById('TheCanvas');
var context = canvas.getContext('2d');

//Create a new instance of game
var game = new Game(canvas, context);

touchable = 'createTouch' in document;
//An array for the touches
touches = [];
//Set up the listners
if (this.touchable)
{
	this.canvas.addEventListener( 'touchstart', onTouchStart, false );
	this.canvas.addEventListener( 'touchmove', onTouchMove, false );
	this.canvas.addEventListener( 'touchend', onTouchEnd, false );
	window.addEventListener('resize', updateCanvas, false);
	window.addEventListener('orientationchange', updateCanvas, false);
}

function updateCanvas()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
}

function onTouchStart(event) {
	//do stuff
	
}

function onTouchMove(event) {
	// Prevent the browser from doing its default thing (scroll, zoom)
	//event.preventDefault(); 
} 

function onTouchEnd(e) 
{
	//do stuff
	var touch = e.changedTouches[0];
	game.updatePlayerVelocity(touch.clientX, touch.clientY);
}



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Make the game run
setInterval(function(){game.run()}, 1000 / game.fps);