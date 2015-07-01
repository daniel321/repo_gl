CommandBridge = function (objectUniform, material){
    this.uniform = objectUniform;
    this.material = material;
    
    this.bridge = null;
    this.bridgeBase = null;
    this.door = null;
    this.window = null;
	
    this.doorShape = null;    
    this.bridgeShape = null;
    this.bridgeBaseShape = null;

    this.windowShape = null;   
    this.windowShape2 = null;   	
    this.windowShape3 = null;   
    this.windowShape4 = null;
    this.windowShape5 = null;   
    this.windowShape6 = null;	
	
    this.all = null;
    
    this.coordTextureSup = null;
    this.coordTextureInf = null;
    
    this.initBuffers = function(){
		this.initCoordTexture();
        
        this.bridge = new Box(3.0, 0.2, 0.4, this.material);
        this.bridge.setCoordTexture(this.coordTextureSup);
        this.bridge.initBuffers();
        this.bridge.initTexture("./textures/bridgeBase.jpg");
        
        this.bridgeShape = new Shape(this.bridge, this.uniform);
        
        this.bridgeBase = new Box(2.5, 0.8, 0.25, this.material);
        this.bridgeBase.setCoordTexture(this.coordTextureInf);
        this.bridgeBase.initBuffers();
        this.bridgeBase.initTexture("./textures/bridgeBase.jpg");
        
        this.bridgeBaseShape = new Shape(this.bridgeBase, this.uniform);
		
		this.door = new Box(1, 1, 0.1, this.material);
		this.door.initBuffers();
		this.door.initTexture("./textures/door.jpg");

        this.doorShape = new Shape(this.door, this.uniform);

		this.window = new Box(1, 1, 0.1, this.material);
		this.window.initBuffers();
		this.window.initTexture("./textures/window.png");

        this.windowShape = new Shape(this.window, this.uniform);
		this.windowShape2 = new Shape(this.window, this.uniform);
		this.windowShape3 = new Shape(this.window, this.uniform);
		this.windowShape4 = new Shape(this.window, this.uniform);
		this.windowShape5 = new Shape(this.window, this.uniform);
		this.windowShape6 = new Shape(this.window, this.uniform);
		
        this.all = new ShapeGroup();
		this.all.add(this.bridgeShape);	
		this.all.add(this.bridgeBaseShape);
		this.all.add(this.doorShape);
		
		this.all.add(this.windowShape);
		this.all.add(this.windowShape2);
		this.all.add(this.windowShape3);
		this.all.add(this.windowShape4);
		this.all.add(this.windowShape5);
		this.all.add(this.windowShape6);
        
        this.bridgeShape.translate(0.0, 2.5, 0.0);
        this.bridgeShape.scale(2, 4, 2);
		
        this.bridgeBaseShape.translate(0.0, 1.6, 0.0);
		this.bridgeBaseShape.scale(1, 2, 1.5);
		this.doorShape.translate(0,1.05,0.15);
		this.doorShape.scale(1,0.5,1);

		this.windowShape.translate(1.5,2.5,0.36);
		this.windowShape.scale(1,0.5,1);

		this.windowShape2.translate(-1.5,2.5,0.36);
		this.windowShape2.scale(1,0.5,1);		

		this.windowShape3.rotate(0,Math.PI/2,0);			
		this.windowShape3.translate(-3,2.5,0);
		this.windowShape3.scale(-0.25,0.5,1);		

		this.windowShape4.rotate(0,Math.PI/2,0);			
		this.windowShape4.translate(3,2.5,0);
		this.windowShape4.scale(-0.25,0.5,1);

		this.windowShape5.rotate(0,Math.PI,0);
		this.windowShape5.translate(1.5,2.5,-0.375);
		this.windowShape5.scale(1,0.5,1);

		this.windowShape6.rotate(0,Math.PI,0);
		this.windowShape6.translate(-1.5,2.5,-0.375);
		this.windowShape6.scale(1,0.5,1);			
	}
	
	this.initCoordTexture = function(){
        
		var repW = 3.0;
        var repH = 2.0;
        var repD = 1.0;
		
		this.coordTextureInf = [ 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
								
								 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
                                
                                 0.0,  repH,
								 repW, repH,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  repH,
								 repW, repH,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  repH,
								 repD, repH,
								 0.0,  0.0,
								 repD, 0.0,

								 0.0,  repH,
								 repD, repH,
								 0.0,  0.0,
								 repD, 0.0 ];
        
        repW = 3.0;
        repH = 1.0;
		repD = 1.0;
        
        this.coordTextureSup = [ 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
								
								 0.0,  repH,
								 repW, repH,
                                 0.0,  0.0,
                                 repW, 0.0,
                                
                                 0.0,  repH,
								 repW, repH,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  repH,
								 repW, repH,
								 0.0,  0.0,
								 repW, 0.0,

								 0.0,  repH,
								 repD, repH,
								 0.0,  0.0,
								 repD, 0.0,

								 0.0,  repH,
								 repD, repH,
								 0.0,  0.0,
								 repD, 0.0];
								 
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
