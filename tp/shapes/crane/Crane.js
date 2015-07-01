Crane = function(objectUniform, dist, material){
	this.dist = dist;
	this.movmentAmount = 0;
    this.material = material;
	
	this.uniform = objectUniform;
	this.texturePath = null;
	this.WheelTexturePath = null;
	this.WheelTopTexturePath = null;

	this.CargoTexturePath = null;
	this.CabinTexturePath = null;
	this.SupportTexturePath = null;
	
	this.frameFront      = null;
	this.frameBack       = null;
	this.boxSupportLeft  = null;
	this.boxSupportRight = null;
	this.movingThing     = null;

	this.boxSupportLeftShape  = null;
	this.boxSupportRightShape = null;
	
	this.camera = null;
	this.all = null;
	
	this.initBuffers = function(){
		this.frameFront      = new Frame(this.uniform, this.material);
		this.frameBack       = new Frame(this.uniform, this.material);	
		this.boxSupportLeft  = new Box(0.2,0.2,this.dist, this.material);
		this.boxSupportRight = new Box(0.2,0.2,this.dist, this.material);
		this.movingThing     = new MovingThing(this.uniform, this.material);
		
		this.frameFront.initTexture(this.texturePath);
		this.frameBack.initTexture(this.texturePath);
		this.boxSupportLeft.initTexture(this.texturePath);
		this.boxSupportRight.initTexture(this.texturePath);
		
		this.movingThing.initTexture(this.texturePath);
		this.movingThing.initTextureCargo(this.CargoTexturePath);
		this.movingThing.initTextureCabin(this.CabinTexturePath);
		this.movingThing.initTextureSupport(this.SupportTexturePath);
		
		this.frameFront.initTextureWheel(this.WheelTexturePath,this.WheelTopTexturePath);
		this.frameBack.initTextureWheel(this.WheelTexturePath,this.WheelTopTexturePath);
		
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
		this.boxSupportLeftShape.translate(-1.2,3.5,this.dist/2);
		this.boxSupportRightShape.translate(1.2,3.5,this.dist/2);
	
		this.movingThing.translate(0,1,this.dist/2);
	}
	
	this.moveCrane = function(amount){
		var noSePasaPositivamente = (this.movmentAmount + amount <= (this.dist * 0.5)-2);
		var noSePasaNegativamente = (this.movmentAmount + amount >=  -(this.dist * 0.5)+0.3 );
		
		if(noSePasaPositivamente && noSePasaNegativamente){
			this.movmentAmount += amount;	
			this.movingThing.translate(0,0,amount);
			
			if(this.camera != null)
				this.camera.move(amount,[0,0,1]);
				
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
	
	this.setCabinCamera = function(camera){
		this.camera = camera;
		this.movingThing.setCabinCamera(camera,this.getMatrix());
	}		
	
	this.initTexture = function(texturePath){
		this.texturePath = texturePath;
	}

	this.initTextureCabin = function(CabinTexturePath){
		this.CabinTexturePath = CabinTexturePath;
	}	
	
	this.initTextureCargo = function(CargoTexturePath){
		this.CargoTexturePath = CargoTexturePath;
	}

	this.initTextureSupport = function(SupportTexturePath){
		this.SupportTexturePath = SupportTexturePath;
	}	

	this.initTextureWheel = function(WheelTexturePath,WheelTopTexturePath){
		this.WheelTexturePath = WheelTexturePath;
		this.WheelTopTexturePath = WheelTopTexturePath;
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