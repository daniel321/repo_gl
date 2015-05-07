Frame = function(objectUniform,height){

	this.uniform = objectUniform;
	this.texturePath = null;

	this.boxVertRight = null;
	this.boxVertLeft  = null;

	this.boxHorizUp   = null;
	this.boxHorizMidd = null;
	this.boxHorizDown = null;

	this.boxVertRightShape = null;
	this.boxVertLeftShape  = null;

	this.boxHorizUpShape   = null;
	this.boxHorizMiddShape = null;
	this.boxHorizDownShape = null;
	
	this.all = null;
	
	this.initBuffers = function(){
		this.boxVertRight = new Box(0.2,5,0.2);
		this.boxVertLeft = new Box(0.2,5,0.2);
		this.boxHorizUp = new Box(2.6,0.2,0.2);
		this.boxHorizMidd = new Box(3.4,0.15,0.15);
		this.boxHorizDown = new Box(2.6,0.2,0.2);
		
		this.boxVertRight.initTexture(this.texturePath);
		this.boxVertLeft.initTexture(this.texturePath);
		this.boxHorizUp.initTexture(this.texturePath);
		this.boxHorizMidd.initTexture(this.texturePath);
		this.boxHorizDown.initTexture(this.texturePath);
		
		this.boxVertRightShape = new Shape(this.boxVertRight,this.uniform);
		this.boxVertLeftShape  = new Shape(this.boxVertLeft,this.uniform);
		this.boxHorizUpShape   = new Shape(this.boxHorizUp,this.uniform);
		this.boxHorizMiddShape = new Shape(this.boxHorizMidd,this.uniform);
		this.boxHorizDownShape = new Shape(this.boxHorizDown,this.uniform);
		
		this.all = new ShapeGroup();
		
		this.all.add(this.boxVertRightShape);
		this.all.add(this.boxVertLeftShape);
		this.all.add(this.boxHorizUpShape);
		this.all.add(this.boxHorizMiddShape);
		this.all.add(this.boxHorizDownShape);
		this.all.initBuffers();
		
		this.boxVertRightShape.translate(1.4,0,0);
		this.boxVertLeftShape.translate(-1.4,0,0);

		this.boxHorizUpShape.translate(0,2.4,0);
		this.boxHorizMiddShape.translate(0,1.25,0);
		this.boxHorizMiddShape.rotate(0,0,-Math.PI/4.5);
		this.boxHorizDownShape.translate(0,0,0);		
    }
	
	this.initTexture = function(texturePath){
		this.texturePath = texturePath;
	}
	
	this.translate = function(dX,dY,dZ){
		this.all.translate(dX,dY,dZ);
	}

	this.rotate = function(angX,angY,angZ){
		this.all.rotate(angX,angY,angZ);
	}

	this.orbit = function(angX,angY,angZ){
		this.all.orbit(angX,angY,angZ);
	}
		
	this.scale = function(eX,eY,eZ){
		this.all.scale(eX,eY,eZ);
	}
		
	this.restore = function(){
		this.all.restore();
	}

	this.acumulate = function(){
		this.all.acumulate();
	}
		
	this.draw = function(worldMatrix){
		this.all.draw(worldMatrix);
	}	
};