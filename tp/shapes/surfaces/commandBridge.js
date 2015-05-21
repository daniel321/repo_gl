CommandBridge = function (objectUniform){
    this.uniform = objectUniform;
    
    this.bridge = null;
    this.bridgeBase = null;
    
    this.bridgeShape = null;
    this.bridgeBaseShape = null;
    
    this.all = null;
    
    this.coordTextureSup = null;
    this.coordTextureInf = null;
    
    this.initBuffers = function(){
		this.initCoordTexture();
        
        this.bridge = new Box(3.0, 0.2, 0.4);
        this.bridge.setCoordTexture(this.coordTextureSup);
        this.bridge.initBuffers();
        this.bridge.initTexture("./textures/bridge.jpg");
        
        this.bridgeShape = new Shape(this.bridge, this.uniform);
        
        this.bridgeBase = new Box(2.5, 0.8, 0.25);
        this.bridgeBase.setCoordTexture(this.coordTextureInf);
        this.bridgeBase.initBuffers();
        this.bridgeBase.initTexture("./textures/bridgeBase.jpg");
        
        this.bridgeBaseShape = new Shape(this.bridgeBase, this.uniform);
		
        this.all = new ShapeGroup();
		this.all.add(this.bridgeShape);	
		this.all.add(this.bridgeBaseShape);
        
        this.bridgeShape.translate(0.0, 1.7, 0.0);
        this.bridgeBaseShape.translate(0.0, 1.2, 0.0);
	}
	
	this.initCoordTexture = function(){
        
		var repW = 3.0;
        var repH = 2.0;
		
		this.coordTextureInf = [ 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
								
								 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
                                
                                 0.0,  0.0,
								 repW, 0.0,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  0.0,
								 repW, 0.0,
								 0.0,  0.0,
								 repW, 0.0 ];
        
        repW = 3.0;
        repH = 1.0;
        
        this.coordTextureSup = [ 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
								
								 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
                                
                                 0.0,  0.0,
								 repW, 0.0,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  0.0,
								 repW, 0.0,
								 0.0,  0.0,
								 repW, 0.0 ];
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
