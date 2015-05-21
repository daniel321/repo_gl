Cargo = function(objectUniform){
	this.uniform = objectUniform;
	this.texturePath = null;
    
    this.coordTexture = null;

	this.box = null;
	this.boxShape = null;

	this.all = null;
	
	this.initBuffers = function(){
//        this.initCoordTexture();
		this.box = new Box(0.75,0.75,2.5);
//        this.box.setCoordTexture(this.coordTexture);
		this.box.initTexture(this.texturePath);	
		this.boxShape = new Shape(this.box,this.uniform);

		this.all = new ShapeGroup();
		
		this.all.add(this.boxShape);
		this.all.initBuffers();		
    }
    
    this.initCoordTexture = function(){
        var width = 512;
        var height = 512;
        
		this.coordTexture = [0/width,   193/height,
                             195/width, 193/height,
							 0/width,   0/height,
							 195/width, 0/height,
							
							 195/width, 193/height,
                             0/width,   193/height,
							 195/width, 0/height,
							 0/width,   0/height,
                                
                             512/width, 359/height,
                             425/width, 337/height,
							 5/width,   359/height,
							 1/width,   337/height,

							 512/width, 512/height,
                             1/width,   202/height,
							 5/width,   512/height,
							 425/width, 202/height ];
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