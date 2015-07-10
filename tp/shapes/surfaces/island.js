Island = function(material){
	this.movmentAmount = 0;
	this.material = material;
    
	this.scales = [];
	this.controlPointsPath = [];
	this.controlPointsCurve = [];
    this.coordTexture = [];
	
	this.surfShape = null;	
	this.surf = null;
	
	this.fanScale = null;
	this.fanCenter = null;
	this.fan = null;
	this.fanshape = null;

	this.texturePath = null;
    this.textureNormalMap = null;

	this.all = null;
    this.deltaCurve = 10;
    this.cantPath = 10;
    this.deltaPath = 1;
	
	this.initBuffers = function(){
		this.initControlPoints();
        this.initCoordTexture();
		
		var curve = new BSplineCuadCurve(this.controlPointsCurve, [0,-1,0], this.deltaCurve);
		curve.initBuffers();
	
        var condShader = {
            useNormalMap: true,
            useReflexion: false
        };

        this.surf = new SupBarr(curve,this.controlPointsPath,this.scales, this.material, condShader);
        this.surf.initCoordTexture(this.coordTexture);
		this.surf.initBuffers();
	    this.surf.initTexture(this.texturePath);
        this.surf.initNormalMap(this.textureNormalMap);
		
        condShader.useNormalMap = false;
		this.fan = new Fan(curve.getPoints(),this.fanCenter,this.fanScale, this.material, condShader, true);
		this.fan.initBuffers();
		this.fan.initTexture("./textures/pastoIsla.jpg");

		this.surfShape = new Shape(this.surf);
		this.fanshape = new Shape(this.fan);

		this.all = new ShapeGroup();
		this.all.add(this.surfShape);				
		this.all.add(this.fanshape);
		
		this.surfShape.rotate(0,0,Math.PI);
        this.surfShape.translate(0,0,0.8);
		this.fanshape.rotate(0,0,Math.PI);
		this.fanshape.translate(0,0.415,0.8);
	
	}
	
	this.initControlPoints = function(){	 

        this.fanScale = mat4.create();
		mat4.scale(this.fanScale,this.fanScale,[1.7,1,1.5]);
		
		var acum  = (this.cantPath/3+(-6*this.deltaPath)+1)*0.25;
		this.fanCenter = {
            point: [0,acum,0],
            normal: [0,-1,0],
            tangente: [1,0,0]
        };
        
		for(var i=0; i<=2*this.cantPath ; i+= this.deltaPath){
			this.controlPointsPath.push(0,acum + i*0.25, 0);
			var h = i/this.cantPath;

			var escalaZ = 1 + Math.pow(2, h)*0.5;	
			var escalaX = 1 + Math.pow(2, h)*0.7;
			
			this.scales.push(escalaX,1,escalaZ);
		}	
		
        this.controlPointsCurve = [ -4.0,  0.0, 0.0,
									-3.0,  0.0, 1.0,
									-2.0,  0.0, 1.8,
									-1.0,  0.0, 1.2,
									 0.0,  0.0, 2.5,
									 1.0,  0.0, 1.5,
									 2.0,  0.0, 2.0,
									 3.0,  0.0, 0.8,
									 4.0,  0.0, 0.0,
									 
									 3.0,  0.0,-0.8,
									 2.0,  0.0,-2.5,
									 1.0,  0.0,-1.9,
									 0.0,  0.0,-2.3,
									-1.0,  0.0,-2.8,
									-2.0,  0.0,-2.0,
									-3.0,  0.0,-1.5,
									-4.0,  0.0, 0.0,
									-3.0,  0.0, 1.0	];
	}
    
    this.initCoordTexture = function(){
        for(var i=0; i<=(2*this.cantPath); i+=this.deltaPath){ 
            for(var k=0; k<=16; k++){ 
                for(var j=0; j<=this.deltaCurve; j++){ 
                    this.coordTexture.push(j/this.deltaCurve);
                    this.coordTexture.push(1.0 - (i * (0.7/(2*this.cantPath))));
                }
            }
        }
    }
	
	this.initTexture = function(texturePath, textureNormalMap){
		this.texturePath = texturePath;
        this.textureNormalMap = textureNormalMap;
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
