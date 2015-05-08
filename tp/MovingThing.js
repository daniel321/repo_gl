MovingThing = function(objectUniform){
	this.uniform = objectUniform;
	this.texturePath = null;
	this.CargoTexturePath = null;
	
	this.box = null;
	this.boxRailFront = null;
	this.boxRailBack  = null;
	this.boxRailEnd   = null;
	this.cargoMover   = null;
		
	this.boxShape = null;
	this.boxRailFrontShape   = null;
	this.boxRailBackShape = null;
	this.boxRailEndShape = null;
	
	this.all = null;
	
	this.initBuffers = function(){
		this.box = new Box(1,1,1.4);
		this.boxRailFront = new Box(12,0.2,0.2);
		this.boxRailBack = new Box(12,0.2,0.2);
		this.boxRailEnd = new Box(0.2,0.2,0.6);
		this.cargoMover = new CargoMover(this.uniform);
		
		this.box.initTexture(this.texturePath);
		this.boxRailFront.initTexture(this.texturePath);
		this.boxRailBack.initTexture(this.texturePath);
		this.boxRailEnd.initTexture(this.texturePath);
		this.cargoMover.initTexture(this.texturePath);	
		this.cargoMover.initTextureCargo(this.CargoTexturePath);	
		
		this.boxShape = new Shape(this.box,this.uniform);
		this.boxRailFrontShape = new Shape(this.boxRailFront,this.uniform);
		this.boxRailBackShape = new Shape(this.boxRailBack,this.uniform);
		this.boxRailEndShape = new Shape(this.boxRailEnd,this.uniform);
		
		this.all = new ShapeGroup();
		
		this.all.add(this.boxShape);
		this.all.add(this.boxRailFrontShape);
		this.all.add(this.boxRailBackShape);
		this.all.add(this.boxRailEndShape);	
		this.all.add(this.cargoMover);			
		this.all.initBuffers();
		
		this.boxShape.translate(-2.3,2.4,0.3);
		
		this.boxRailFrontShape.translate(4,2.4,0.7);
		this.boxRailBackShape.translate(4,2.4,-0.1);
		this.boxRailEndShape.translate(9.9 ,2.4,0.3);		
		
		this.cargoMover.translate(6,2.4,0.3);
    }
	
	this.releaseCargo = function(parentMatrix){
		var matrix = mat4.create();
		mat4.identity(matrix);
		mat4.multiply(matrix, parentMatrix, this.getMatrix());
		
		this.cargoMover.releaseCargo(matrix);
	}	
	
	this.attachCargo = function(parentMatrix){
		var matrix = mat4.create();
		mat4.identity(matrix);
        mat4.multiply(matrix, parentMatrix, this.getMatrix());
		
		this.cargoMover.attachCargo(matrix);
	}	
	
	this.moveCargo = function(amount){
		this.cargoMover.moveCargo(amount);
	}
	
	this.moveMover = function(amount){
		this.cargoMover.moveMover(amount);
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