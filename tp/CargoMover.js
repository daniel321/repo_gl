CargoMover = function(objectUniform){
	this.uniform = objectUniform;
	this.movmentCargoAmount = 0;
	this.movmentAmount = 0;
	
	this.texturePath = null;
	this.CargoTexturePath = null;

	this.camera = null;
	
	this.cargo = null;
	this.box   = null;

	this.wireLeftFront = null;
	this.wireLeftBack = null;
	this.wireRightFront = null;
	this.wireRightBack = null;
	
	this.cargoSupportLeft = null;
	this.cargoSupportRight = null;
	this.oldCargo = null;

	this.boxShape = null;
	this.cargoSupportLeftShape = null;
	this.cargoSupportRightShape = null;	

	this.wireLeftFrontShape = null;
	this.wireLeftBackShape = null;
	this.wireRightFrontShape = null;
	this.wireRightBackShape = null;
	this.wires = null;	
	
	this.all = null;
    var d = -0.8;

	this.errAdmitido = [0.3,0.75,0.5];
	
	this.initBuffers = function(){
        var width = 0.99;
        var height = 0.8;
        var depth = 1.0;
        var angle = (20 * Math.PI)/180;
        
		this.box = new Cabin(this.uniform, width, height, depth, angle);

		var h = 2.0;
		this.wireLeftFront  = new Box(0.01,h,0.01);
		this.wireLeftBack   = new Box(0.01,h,0.01);
		this.wireRightFront = new Box(0.01,h,0.01);
		this.wireRightBack  = new Box(0.01,h,0.01);
		
		this.cargoSupportLeft  = new Box(0.8,0.05,0.05);
		this.cargoSupportRight = new Box(0.8,0.05,0.05);	
		this.cargo = new Cargo(this.uniform);	
		
		this.box.initTexture(this.texturePath);		
		
		this.wireLeftFront.initTexture(this.texturePath);
		this.wireLeftBack.initTexture(this.texturePath);
		this.wireRightFront.initTexture(this.texturePath);
		this.wireRightBack.initTexture(this.texturePath);
		
		this.cargoSupportLeft.initTexture(this.texturePath);		
		this.cargoSupportRight.initTexture(this.texturePath);		
		this.cargo.initTexture(this.CargoTexturePath);		
		
		this.boxShape = new Shape(this.box,this.uniform);
		this.cargoSupportLeftShape = new Shape(this.cargoSupportLeft,this.uniform);
		this.cargoSupportRightShape = new Shape(this.cargoSupportRight,this.uniform);
		
		this.wireLeftFrontShape = new Shape(this.wireLeftFront,this.uniform);
		this.wireLeftBackShape = new Shape(this.wireLeftBack,this.uniform);
		this.wireRightFrontShape = new Shape(this.wireRightFront,this.uniform);
		this.wireRightBackShape = new Shape(this.wireRightBack,this.uniform);
		
		this.oldCargo = new ShapeGroup();
		
		this.createOldCargo();
		
		this.wires = new ShapeGroup();
		this.wires.add(this.wireLeftFrontShape);	
		this.wires.add(this.wireLeftBackShape);	
		this.wires.add(this.wireRightFrontShape);	
		this.wires.add(this.wireRightBackShape);	
		
		this.all = new ShapeGroup();
		
		this.all.add(this.boxShape);
		this.all.add(this.wires);
		this.all.add(this.cargoSupportLeftShape);	
		this.all.add(this.cargoSupportRightShape);	
		this.all.add(this.cargo);			

		this.all.initBuffers();
		this.boxShape.translate(-0.65,-0.8,-0.495);
        
        this.wireLeftFrontShape.translate(-0.3,0,0.25);
		this.wireLeftBackShape.translate(-0.3,0,-0.25);
		this.wireRightFrontShape.translate(0.3,0,0.25);
		this.wireRightBackShape.translate(0.3,0,-0.25);	
		
		this.cargoSupportRightShape.translate(0,-2.0+d,0.25);
		this.cargoSupportLeftShape.translate(0,-2.0+d,-0.25);
		this.cargo.translate(0,-2.4+d,0);
    }

	this.createOldCargo = function(){
		for (var i=0 ; i<=5 ; i++){
			var cargo_i = new Cargo(this.uniform);
			cargo_i.initTexture(this.CargoTexturePath);
		
			this.oldCargo.add(cargo_i);
		}
		
		this.oldCargo.initBuffers();
        
        var floorPos = -5;
		this.oldCargo.get(0).translate(5.0,floorPos,12);
		this.oldCargo.get(1).translate(5.0,floorPos,15);	
		this.oldCargo.get(2).translate(6.0,floorPos,12);	
		this.oldCargo.get(3).translate(6.0,floorPos,15);
		this.oldCargo.get(4).translate(7.0,floorPos,12);	
		this.oldCargo.get(5).translate(7.0,floorPos,15);
	}
	
	this.releaseCargo = function(parentMatrix){
		var matrix = this.acumulateParentMatrix(parentMatrix);
		
		if(this.cargo != null){
			this.cargo.acumulateMatrix(matrix);
			this.oldCargo.add(this.cargo);
			this.all.remove(4);
			this.cargo = null;
		}
	}	
	
	this.attachCargo = function(parentMatrix){	
		var matrix = this.acumulateParentMatrix(parentMatrix);
		mat4.multiply(matrix, matrix, this.cargoSupportRightShape.getMatrix());
		var pos = [0,0,0];
        vec3.transformMat4(pos, pos, matrix);
	
		var i = this.getCargoNearby(pos);	
		
		if((i != -1) && (this.cargo == null)){	
			this.cargo = this.oldCargo.get(i);
			this.all.add(this.cargo);
			
			this.cargo.restore();
			this.cargo.translate(this.movmentAmount,this.movmentCargoAmount+d-2.4,0);
			
			this.oldCargo.remove(i);
		}
	}	
	
	this.getCargoNearby = function(pos){			
		var i=0;
		var cargo = this.oldCargo.get(i);
		while (cargo != null){
			var mat = mat4.create();
			mat4.identity(mat);
			mat4.multiply(mat, mat, cargo.getMatrix());
			var posCargo = [0,0,0];
			vec3.transformMat4(posCargo, posCargo, mat);

			if(this.coincidenPosiciones(pos,posCargo)){
				return i;
			}
			
			i++;
			cargo = this.oldCargo.get(i);
		}
		
		return -1; 
	}

	this.coincidenPosiciones = function(pos,posCargo,errAdmitido){
		var diff = [Math.abs(pos[0]-posCargo[0]),Math.abs(pos[1]-posCargo[1]),Math.abs(pos[2]-posCargo[2])]
		
		if( (diff[0] < this.errAdmitido[0]) && (diff[1] < this.errAdmitido[1]) && (diff[2] < this.errAdmitido[2]) )
			return true;
		return false;
	}
	
	this.moveMover = function(amount){
		var noSePasaPositivamente = (this.movmentAmount + amount <= 3);
		var noSePasaNegativamente = (this.movmentAmount + amount >=  -3 );
		
		if(noSePasaPositivamente && noSePasaNegativamente){
			this.movmentAmount += amount;	
			this.boxShape.translate(amount,0,0);		

			this.cargoSupportRightShape.translate(amount,0,0);
			this.cargoSupportLeftShape.translate(amount,0,0);

			if(this.camera != null)
				this.camera.move(amount,[1,0,0]);
			
			if(this.cargo != null)
				this.cargo.translate(amount,0,0);
		}
	}
	
	this.moveCargo = function(amount){
		var noSePasaPositivamente = (this.movmentCargoAmount + amount <= 2.0);
		var noSePasaNegativamente = (this.movmentCargoAmount + amount >=  -2.0 );
		
		if(noSePasaPositivamente && noSePasaNegativamente){
			this.movmentCargoAmount += amount;	
			
			if(this.cargo != null)
				this.cargo.translate(0,amount,0);
	
			this.cargoSupportRightShape.translate(0,amount,0);
			this.cargoSupportLeftShape.translate(0,amount,0);	
		}
	}

	this.setCabinCamera = function(camera,parentMatrix){
		var matrix = this.acumulateParentMatrix(parentMatrix);
		mat4.multiply(matrix, matrix, this.boxShape.getMatrix());
        mat4.translate(matrix, matrix, [0.5, 0.5, 0.5]);
		
		this.camera = camera;
		this.camera.applyMatrix(matrix);
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

	this.getMatrix = function(){
		return this.all.getMatrix();
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
	
	this.draw = function(worldMatrix){
		this.wires.restore();
		this.wires.translate(this.movmentAmount,-1+d+this.movmentCargoAmount/2,0);
		this.wires.scale(1,1-this.movmentCargoAmount/2,1);
		
		this.all.draw(worldMatrix);
		
		var id = mat4.create();
		mat4.identity(id);
		this.oldCargo.draw(id);
	}	
};