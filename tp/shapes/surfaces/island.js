Island = function(objectUniform, material){
	this.movmentAmount = 0;
	this.material = material;
    
	this.scales = [];
	this.controlPointsPath = [];
	this.controlPointsCurve = [];
	
	this.surfShape = null;	
	this.surf = null;
	
	this.fanScale = null;
	this.fanCenter = null;
	this.fan = null;
	this.fanshape = null;

	this.uniform = objectUniform;
	this.texturePath = null;

	this.all = null;
	
	var cont = 0;
	
	this.initBuffers = function(){
		this.initControlPoints();
		
		var curve = new BSplineCuadCurve(this.controlPointsCurve, [0,0,1], 10);
		curve.initBuffers();
	
		this.surf = new SupBarr(curve,this.controlPointsPath,this.scales, this.material);
		this.surf.initBuffers();
	    this.surf.initTexture(this.texturePath);
		
		this.fan = new Fan(curve.getPoints(),this.fanCenter,this.fanScale, this.material);
        this.fan.setNormal([0.0, 0.0, -1.0]);
		this.fan.initBuffers();
		this.fan.initTexture("./textures/pastoIsla.jpg");	

		this.surfShape = new Shape(this.surf,this.uniform);
		this.fanshape = new Shape(this.fan,this.uniform);

		this.all = new ShapeGroup();
		this.all.add(this.surfShape);				
		this.all.add(this.fanshape);
		
		this.surfShape.rotate(Math.PI*3/2,-Math.PI,0);	
		this.fanshape.rotate(Math.PI*3/2,-Math.PI,0);
		this.fanshape.translate(0,0.415,0);
	
	}
	
	
	this.initControlPoints = function(){	 
		var delta = 1;
		var m = 10;

		this.fanScale = mat4.create();
		mat4.scale(this.fanScale,this.fanScale,[1,1,1]);
		
		var acum  = (m/3+(-6*delta)+1)*0.25;
		this.fanCenter = [0,0,acum];
	
	
		for(var i=0; i<=2*m ; i+= delta){
			this.controlPointsPath.push(0,0,acum + i*0.25);
			var h = i/m;

			var escalaY = 1 + Math.sqrt(h)*1.25;	
			var escalaX = 1 + Math.sqrt(h)*1.0;
			
			this.scales.push(escalaX,escalaY,1);
		}	
		
		this.controlPointsCurve = [ -4.0,  0.0, 0.0,
									-3.0,  1.0, 0.0,
									-2.0,  1.8, 0.0,
									-1.0,  1.2, 0.0,
									 0.0,  3.0, 0.0,
									 1.0,  1.0, 0.0,
									 2.0,  2.0, 0.0,
									 3.0,  0.8, 0.0,
									 4.0,  0.0, 0.0,
									 
									 4.0,  0.0, 0.0,
									 3.0, -1.2, 0.0,
									 2.0, -1.7, 0.0,
									 1.0, -1.9, 0.0,
									 0.0, -2.3, 0.0,
									-1.0, -2.8, 0.0,
									-2.0, -2.0, 0.0,
									-3.0, -1.5, 0.0,
									-4.0,  0.0, 0.0,
									-3.0,  1.0, 0.0	
														];		
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
