function Game(canvas, context)
{
	"use strict";
	//Attributes

	this.canvas = canvas;
	this.context = context;
	

	//The player
	this.player = new Player(this.canvas.width/2, this.canvas.height/2);
	//The array of enemies
	this.enemies = [];

	//Initializes and array with 10 enemies, with all of their stats randomized
	for (var i = 0; i < 60; i++) 
	{
		var tmpEnemy = new Enemy(Math.random()*this.canvas.width,Math.random()*this.canvas.height,
							Math.random() * 0.5, Math.random() * 0.5,Math.random()* 30)
		this.enemies.push(tmpEnemy);
	};

	//The desired framerate
	this.fps = 20;

	//Functions

	//A function that checks for collisions between 2 orbs
	//Takes in the positions and radii of the 2, should refactor so it takes a generic orb
	var collided = function(pXPos, pYPos, pRadius, eXPos, eYPos, eRadius)
	{
		var tempXDist = pXPos - eXPos;	//Get the horizontal X distance
		var tempYDist = pYPos - eYPos;	//Get the vertical Y distance

		//Get the absolute value of the 2 distances
		if (tempXDist < 0)
			tempXDist *= -1;
		if (tempYDist < 0)
			tempYDist *= -1;

		//Checks to see if there is a separating axis
		if (tempXDist < (pRadius + eRadius) && tempYDist < (pRadius + eRadius))
		{
			//Gets the distance between the 2 orbs centres
			var length = Math.sqrt((tempXDist*tempXDist) + (tempYDist*tempYDist));
			if (length < (pRadius + eRadius))
			{
				return true;
			}
		}
		else 
			return false;	
	}

	//Wrapper function to update the players velocity
	this.updatePlayerVelocity = function(xTouch, yTouch)
	{
		this.player.updateVelocity(xTouch, yTouch);
	};


	this.draw = function() 
	{
		//Clear the canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//Draw the background 

		//Draw the player
		context.fillStyle="rgb(0,50,100)";
		this.player.draw(this.context);
		
		//Draw the enemies
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].draw(this.context);
		};
	};

	this.update = function()
	{
		//Update the player 
		this.player.update(this.canvas.width, this.canvas.height);
		
		//Update the enemies and check for collisions
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update(this.canvas.width, this.canvas.height, this.player.orb.radius);
			
			//Checks if the current enemy is alive
			if (this.enemies[i].orb.alive === true)
			{
				//Checks if the player and the enemy have collided
				if (collided(this.player.orb.xPos, this.player.orb.yPos, this.player.orb.radius, 
				this.enemies[i].orb.xPos, this.enemies[i].orb.yPos, this.enemies[i].orb.radius) === true)
				{
					//If the enemy is small than the player, it can be consumed by the player
					if (this.enemies[i].isBiggerThanPlayer === false)
					{	
						this.player.orb.radius += this.enemies[i].orb.radius * 0.008;	//Adds a small chunk of the enemy's radius to the players
						this.enemies[i].orb.radius -= this.enemies[i].orb.radius * 0.1;	//Subtracts a chunk of the enemy's radius
						//Checks if the enemy is too small to matter
						if (this.enemies[i].orb.radius < 3)
						{
							//If it is, kill the enemy
							this.enemies[i].orb.alive = false;
						}
					}
					else	//This is the opposite from above, subtracts from the player if the enemy is bigger than it.
					{
						this.player.orb.radius -= this.enemies[i].orb.radius * 0.002;
						if (this.player.orb.radius < 5)
						{
							this.player.orb.radius < 5;
						}
					}
				}	
			}
		};
	};

	this.run = function()
	{
		//Update 
		this.update();
		
		//Draw
		this.draw();
	};
}