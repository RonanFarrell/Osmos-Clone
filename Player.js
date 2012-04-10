function Player(xPos, yPos)
{
	"use strict";
	//----Attributes----//
	this.orb = new Orb(xPos,yPos,0,0,15)

	//----Functions----//
	this.draw = function(context)
	{ 
			//Draw Stuff
			this.orb.draw(context);
	};

	//Updates the player, called every frame
	this.update = function(canvasWidth, canvasHeight)
	{	
		this.orb.update(canvasWidth, canvasHeight);
	};

	//Updates the velocity, called when the touch is released, similar to the key up event
	//Takes in the position of the touch and calculates a new velocity
	this.updateVelocity = function(xTouchPos, yTouchPos)
	{
		//update velocity
		//Get a vector between the touch and the current position
		var xTemp = this.orb.xPos - xTouchPos;
		var yTemp = this.orb.yPos - yTouchPos;

		//Normalize the vector
		var length = Math.sqrt((xTemp*xTemp) + (yTemp*yTemp));
		// xTemp / sqrt(x*x + y*y)
		xTemp /= length;
		// yTemp / sqrt(x*x + y*y)
		yTemp /= length;

		//Add xTemp and yTemp to xVel and yVel
		this.orb.xVel += (xTemp * this.orb.speed);
		this.orb.yVel += (yTemp * this.orb.speed);
		
		//Check if it's above/below the max speed
		if (this.orb.xVel > this.orb.maxVel)
			this.orb.xVel = this.orb.maxVel;
		else if (this.orb.xVel < -this.orb.maxVel)
			this.orb.xVel = -this.orb.maxVel;
		if (this.orb.yVel > this.orb.maxVel)
			this.orb.yVel = this.orb.maxVel;
		else if (this.orb.yVel < -this.orb.maxVel)
			this.orb.yVel = -this.orb.maxVel;
	};
}