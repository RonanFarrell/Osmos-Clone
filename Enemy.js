function Enemy(xPos, yPos, xVel, yVel, radius)
{
	//----Attributes----//
	//This is the parent object
	this.orb = new Orb(xPos, yPos, xVel, yVel, radius);
	this.isBiggerThanPlayer = false;	//A bool to check if the enemy is bigger than the player

	//----Functions----//
	this.draw = function(context)
	{
		//Draw the orb
		//If it's bigger, draw it in red
		if (this.isBiggerThanPlayer)
			context.fillStyle="rgb(150, 50, 0)";
		else //Otherwise draw it in green
			context.fillStyle="rgb(0, 150, 50)";
		
		this.orb.draw(context);
	};

	this.update = function(canvasWidth, canvasHeight, playerSize)
	{
		//Update the orb
		if (playerSize < this.orb.radius)
			this.isBiggerThanPlayer = true;
		else 
			this.isBiggerThanPlayer = false;

		this.orb.update(canvasWidth, canvasHeight);
	};
}