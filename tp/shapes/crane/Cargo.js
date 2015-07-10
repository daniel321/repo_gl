Cargo = function(material){
    this.material = material;
	this.texturePath = null;
    
    this.coordTexture = null;

	this.box = null;
	this.boxShape = null;

	this.all = null;
	
	this.initBuffers = function(){
        var condShader = {
            useNormalMap: false,
            useReflexion: false
        };
        
        this.initCoordTexture();
		this.box = new Box(0.75,0.75,2.5, this.material, condShader);
        this.box.setCoordTexture(this.coordTexture);
		this.box.initTexture(this.texturePath);	
		this.boxShape = new Shape(this.box);

		this.all = new ShapeGroup();
		
		this.all.add(this.boxShape);
		this.all.initBuffers();		
    }
    
    this.initCoordTexture = function(){
        var width = 0.75;
        var height = 0.75;
		var depth = 2.5;
        
			// front,back,up,down,left,right
			
			this.coordTexture =           [   0, 0.62,
                                              0.38, 0.62,
									          0,    1,
									          0.38,    1,

												 0, 0.62,
                                              0.38, 0.62,
									          0,    1,
									          0.38,    1,											  

											  0,      0.34,
                                              0,      0.61,
									          0.83,  0.34,
									          0.83,  0.61,
											  
											  0,      0.34,
                                              0,      0.61,
									          0.83,  0.34,
									          0.83,  0.61,

											  1,  0.3,
                                            0.1,  0.3,
									          1,    0,
									        0.1,    0,
											
										    0.1,  0.3,
                                              1,  0.3,
									        0.1,    0,
									          1,    0 ];
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