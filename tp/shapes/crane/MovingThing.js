MovingThing = function(material){
    this.material = material;
	this.texturePath = null;
    this.textureNormalMap = null;
	this.CargoTexturePath = null;
	this.CabinTexturePath = null;
	this.SupportTexturePath = null;
    this.LightTexturePath = null;
	
	this.box = null;
	this.boxRailFront = null;
	this.boxRailBack  = null;
	this.boxRailEnd   = null;
	this.cargoMover   = null;
    
    this.light = null;
		
	this.boxShape = null;
	this.boxRailFrontShape   = null;
	this.boxRailBackShape = null;
	this.boxRailEndShape = null;
    
    this.lightShape = null;
	
	this.all = null;
	
	this.initBuffers = function(){
        var condShader = {
            useNormalMap: true,
            useReflexion: false
        };
        
		this.box = new Box(1,1,1.6, this.material.materialCrane, condShader);
		this.boxRailFront = new Box(14,0.2,0.2, this.material.materialCrane, condShader);
		this.boxRailBack = new Box(14,0.2,0.2, this.material.materialCrane, condShader);
		this.boxRailEnd = new Box(0.2,0.2,1.0, this.material.materialCrane, condShader);
		this.cargoMover = new CargoMover(this.material);
        this.light = new Light(this.material.materialLight);
		
		this.box.initTexture(this.SupportTexturePath);
		this.boxRailFront.initTexture(this.texturePath);
		this.boxRailBack.initTexture(this.texturePath);
		this.boxRailEnd.initTexture(this.texturePath);
		this.cargoMover.initTexture(this.texturePath, this.textureNormalMap);
        
        this.box.initNormalMap(this.textureNormalMap);
		this.boxRailFront.initNormalMap(this.textureNormalMap);
		this.boxRailBack.initNormalMap(this.textureNormalMap);
		this.boxRailEnd.initNormalMap(this.textureNormalMap);

		this.cargoMover.initTextureCargo(this.CargoTexturePath);	
		this.cargoMover.initTextureCabin(this.CabinTexturePath);
        
        this.light.initTexture(this.LightTexturePath);
		
		this.boxShape = new Shape(this.box);
		this.boxRailFrontShape = new Shape(this.boxRailFront);
		this.boxRailBackShape = new Shape(this.boxRailBack);
		this.boxRailEndShape = new Shape(this.boxRailEnd);
        
        this.lightShape = new Shape(this.light);
		
		this.all = new ShapeGroup();
		
		this.all.add(this.boxShape);
		this.all.add(this.boxRailFrontShape);
		this.all.add(this.boxRailBackShape);
		this.all.add(this.boxRailEndShape);	
		this.all.add(this.cargoMover);
        this.all.add(this.lightShape);
		this.all.initBuffers();
		
		this.boxShape.translate(-2.505,2.4,0.3);
		
		this.boxRailFrontShape.translate(5,2.4,0.9);
		this.boxRailBackShape.translate(5,2.4,-0.3);
		this.boxRailEndShape.translate(11.9 ,2.4,0.3);		
		
		this.cargoMover.translate(6,2.4,0.3);
        
        this.lightShape.translate(11.9, 2.2, 0.3);	
    }
	
	this.releaseCargo = function(parentMatrix){
		var matrix = this.acumulateParentMatrix(parentMatrix);	
		this.cargoMover.releaseCargo(matrix);
	}	
	
	this.attachCargo = function(parentMatrix){
		var matrix = this.acumulateParentMatrix(parentMatrix);
		this.cargoMover.attachCargo(matrix);
	}	
	
	this.moveCargo = function(amount){
		this.cargoMover.moveCargo(amount);
	}
	
	this.setCabinCamera = function(camera,parentMatrix){
		var matrix = this.acumulateParentMatrix(parentMatrix);
		this.cargoMover.setCabinCamera(camera,matrix);
	}	
	
	this.moveMover = function(amount){
		this.cargoMover.moveMover(amount);
	}	
	
	this.initTexture = function(texturePath, textureNormalMap){
        this.texturePath = texturePath;
        this.textureNormalMap = textureNormalMap;
    }
	
	this.initTextureCargo = function(CargoTexturePath){
		this.CargoTexturePath = CargoTexturePath;
	}
    
	this.initTextureCabin = function(CabinTexturePath){
		this.CabinTexturePath = CabinTexturePath;
	}	

	this.initTextureSupport = function(SupportTexturePath){
		this.SupportTexturePath = SupportTexturePath;
	}
    
    this.initTextureLight = function(LightTexturePath){
		this.LightTexturePath = LightTexturePath;
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
	
	this.acumulateParentMatrix = function(parentMatrix){
		var matrix = mat4.create();
		mat4.identity(matrix);
		mat4.multiply(matrix, parentMatrix, this.getMatrix());
		
		return matrix;
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