Crane = function(objectUniform,dist){
	this.dist = dist;
	this.movmentAmount = 0;
	
	this.uniform = objectUniform;
	this.texturePath = null;
	this.CargoTexturePath = null;
	
	this.frameFront      = null;
	this.frameBack       = null;
	this.boxSupportLeft  = null;
	this.boxSupportRight = null;
	this.movingThing     = null;

	this.boxSupportLeftShape  = null;
	this.boxSupportRightShape = null;
	
	this.all = null;
	
	this.initBuffers = function(){
		this.frameFront      = new Frame(this.uniform);
		this.frameBack       = new Frame(this.uniform);	
		this.boxSupportLeft  = new Box(0.2,0.2,this.dist);
		this.boxSupportRight = new Box(0.2,0.2,this.dist);
		this.movingThing     = new MovingThing(this.uniform);
		
		this.frameFront.initTexture(this.texturePath);
		this.frameBack.initTexture(this.texturePath);
		this.boxSupportLeft.initTexture(this.texturePath);
		this.boxSupportRight.initTexture(this.texturePath);
		
		this.movingThing.initTexture(this.texturePath);
		this.movingThing.initTextureCargo(this.CargoTexturePath);
		
		this.boxSupportLeftShape = new Shape(this.boxSupportLeft,this.uniform);
		this.boxSupportRightShape = new Shape(this.boxSupportRight,this.uniform);
	
		this.all = new ShapeGroup();
		
		this.all.add(this.frameFront);
		this.all.add(this.frameBack);
		this.all.add(this.boxSupportLeftShape);
		this.all.add(this.boxSupportRightShape);
		this.all.add(this.movingThing);	
		
		this.all.initBuffers();
		
		this.frameBack.translate(0,0,this.dist);
		this.boxSupportLeftShape.translate(-1.2,2.5,this.dist/2);
		this.boxSupportRightShape.translate(1.2,2.5,this.dist/2);

		this.movingThing.translate(0,0,this.dist/2);
	}
	
	this.moveCrane = function(amount){
		var noSePasaPositivamente = (this.movmentAmount + amount <= (this.dist * 0.5)-1);
		var noSePasaNegativamente = (this.movmentAmount + amount >=  -(this.dist * 0.5)+0.3 );
		
		if(noSePasaPositivamente && noSePasaNegativamente){
			this.movmentAmount += amount;	
			this.movingThing.translate(0,0,amount);
		}
	}
	
	this.releaseCargo = function(){
		this.movingThing.releaseCargo(this.getMatrix());
	}
	
	this.attachCargo = function(){
		this.movingThing.attachCargo(this.getMatrix());
	}
		
	this.moveCargo = function(amount){
		this.movingThing.moveCargo(amount);
	}	
	
	this.moveMover = function(amount){
		this.movingThing.moveMover(amount);
	}		
	
	this.initTexture = function(texturePath){
		this.texturePath = texturePath;
	}

	this.initTextureCargo = function(CargoTexturePath){
		this.CargoTexturePath = CargoTexturePath;
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

	this.acumulateMatrix = function(matrix){
		this.all.acumulateMatrix(matrix);
	}	
	
	this.getMatrix = function(){
		return this.all.getMatrix();
	}	
	
	this.draw = function(worldMatrix){
		this.all.draw(worldMatrix);
	}	
};