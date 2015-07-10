Ship = function(material){
	this.movmentAmount = 0;
    this.material = material;
	
	this.scales = [];
	this.controlPointsPath = [];
	this.controlPointsCurve = [];
    this.coordTexture = [];
	
	this.surfShape = null;
	this.topShape = null;
    this.bridgeShape = null;
	
	this.surf = null;
	this.curve = null;
	this.top = null;
    this.bridge = null;
	
	this.texturePath = null;
	this.textureTopPath = null;
    this.textureNormalMapTop = null;

	this.all = null;
    this.deltaCurve = 10;
    this.cantPath = 6;
    this.deltaPath = 1;
	
	this.initBuffers = function(){
		this.initControlPoints();
        this.initCoordTexture();
		
		this.curve = new BezierCuadCurve(this.controlPointsCurve, [0,1,0], this.deltaCurve);
		this.curve.initBuffers();

		this.generateTop();
		this.top.initBuffers();
	    this.top.initTexture(this.textureTopPath);
        this.top.initNormalMap(this.textureNormalMapTop);
	
		this.topShape = new Shape(this.top);
        
        var condShader = {
            useNormalMap: false,
            useReflexion: true
        };
	
		this.surf = new SupBarr(this.curve,this.controlPointsPath,this.scales, this.material, condShader);
        this.surf.initCoordTexture(this.coordTexture);
		this.surf.initBuffers();
	    this.surf.initTexture(this.texturePath);
		
		this.surfShape = new Shape(this.surf);
	
        this.bridge = new CommandBridge(this.material);
        this.bridge.initBuffers();
        
        this.bridgeShape = new Shape(this.bridge);
        
		this.all = new ShapeGroup();
		this.all.add(this.surfShape);	
		this.all.add(this.topShape);
        this.all.add(this.bridgeShape);
		
		this.surfShape.rotate(0.0,-Math.PI/2,0.0);
		this.topShape.rotate(0.0,-Math.PI/2,0.0);
		this.topShape.translate(0,1,0);
        this.bridgeShape.translate(0.0, 0.2, -0.8);
        this.bridgeShape.scale(1, 1, 2);		
	}
	
	this.initControlPoints = function(){

		for(var i=0; i<=this.cantPath ; i+= this.deltaPath){
			this.controlPointsPath.push(0,i*0.2,0);
			var h = i/this.cantPath;
			var escalaZ = 1+Math.sqrt(h);			
			var escalaX = 1+Math.sqrt(h)*0.5;

			this.scales.push(escalaX,1,escalaZ);
		}	
		
        this.controlPointsCurve = [  -1,  0,  1,
									  1,  0,  1,
									1.5,  0,  0,
									  1,  0, -1,
									 -1,  0, -1,
									 -1,  0,  1,
									 -1,  0,  1 ];	
	}
	
    this.initCoordTexture = function(){
        for(var i=0; i<=this.cantPath; i+=this.deltaPath){ 
            for(var j=0; j<=this.deltaCurve; j++){ 
                this.coordTexture.push(j/this.deltaCurve);
                this.coordTexture.push(0.17 + (i * (0.4/this.cantPath)));
            }
            
            for(var j=0; j<=this.deltaCurve; j++){ 
                this.coordTexture.push(1.0 - j/this.deltaCurve);
                this.coordTexture.push(0.17 + (i * (0.4/this.cantPath)));
            }
            
            for(var j=0; j<=this.deltaCurve; j++){ 
                this.coordTexture.push(j * (0.14/this.deltaCurve));
                this.coordTexture.push(0.17 + (i * (0.4/this.cantPath)));
            }
            
        }
    }
    
	this.generateTop = function(){
		var tamScale = this.scales.length;
		var tamPos = this.controlPointsPath.length;
		
		var scale = [this.scales[tamScale-6] , this.scales[tamScale-5] ,this.scales[tamScale-4]];
		var pos = [this.controlPointsPath[tamPos-6] , this.controlPointsPath[tamPos-5], this.controlPointsPath[tamPos-4]];
		
		var matrix = mat4.create();
		mat4.identity(matrix);
		mat4.scale(matrix,matrix,scale);
        
        var condShader = {
            useNormalMap: true,
            useReflexion: true
        };
		
		this.top = new Fan(this.curve.getPoints(), [0,0,0], matrix, this.material, condShader);
	}
	
	this.initTexture = function(texturePath){
		this.texturePath = texturePath;
	}

    this.initTextureTop = function(texturePath, textureNormalMap){
		this.textureTopPath = texturePath;
        this.textureNormalMapTop = textureNormalMap;
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
