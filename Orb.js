function Orb(posX, posY, velX, velY, radius)
{
	this.xPos = posX;
	this.yPos = posY;
	this.xVel = velX;
	this.yVel = velY;
	this.speed = 0.8;
	this.maxVel = 3;
	this.radius = radius;
	this.alive = true;

	this.draw = function(context)
	{
		if (this.alive === true)
		{
			//Draw stuff
			context.beginPath();
			context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2, false); // Draw a circle
			context.closePath(); // Close the path
			context.fill(); // Fill the path
		}
	};

	this.update = function(canvasWidth, canvasHeight)
	{
		//Update position
        this.xPos += this.xVel;
		this.yPos += this.yVel;

		//Keep the orb within the bounds of the canvas
		if(this.xPos < this.radius || this.xPos > (canvasWidth - (this.radius)))
		{
			this.xVel *= -1;
		}
		if(this.yPos < this.radius || this.yPos > (canvasHeight - (this.radius)))
		{
			this.yVel *= -1;
		}
	};
}