Island = function(objectUniform){
	this.movmentAmount = 0;
	
	this.scales = [];
	this.controlPointsPath = [];
	this.controlPointsCurve = [];
	
	this.surfShape = null;
	this.surfShape2 = null;		
	
	this.surf = null;
	
	this.uniform = objectUniform;
	this.texturePath = null;

	this.all = null;
	
	var cont = 0;
	
	this.initBuffers = function(){
		this.initControlPoints();
		
		var curve = new BSplineCuadCurve(this.controlPointsCurve, [0,0,1], 10);
		curve.initBuffers();
	    curve.initTexture("./textures/red.jpg");		
	
		this.surf = new SupBarr(curve,this.controlPointsPath,this.scales);
		this.surf.initBuffers();
	    this.surf.initTexture(this.texturePath);
			
		this.surfShape = new Shape(this.surf,this.uniform);
		this.surfShape2 = new Shape(this.surf,this.uniform);
		
		this.all = new ShapeGroup();
		this.all.add(this.surfShape);	
		this.all.add(this.surfShape2);			
		
		this.surfShape.rotate(Math.PI*3/2,-Math.PI,0);
		this.surfShape2.rotate(Math.PI*3/2,-Math.PI,-Math.PI);		

		this.surfShape2.translate(1.5,0,0);
	}
	
	
	this.initControlPoints = function(){	 
		var delta = 1;
		var m = 10;

		for(var i=0; i<m/3 ; i+= delta){
			this.controlPointsPath.push(0,0,i*0.02);
			var h = i/m;
			var escalaY = Math.sqrt(h)*1.0;			
			var escalaX = Math.sqrt(h)*0.75;
			
			this.scales.push(escalaX,escalaY,1);
		}
		
		for(var i=0; i<m ; i+= delta){
			this.controlPointsPath.push(0,0,(m/3)*0.2+(i+1)*0.2);
			var h = i/m;
			var escalaY = 1+Math.sqrt(h);			
			var escalaX = 1+Math.sqrt(h)*0.5;

			this.scales.push(escalaX,escalaY,1);
		}	

		for(var i=0; i<m ; i+= delta){
			this.controlPointsPath.push(0,0,(m/3+m)*0.2+(i+1)*0.2);
			var h = i/m;
			var escalaY = 2+Math.sqrt(h)*1.14;			
			var escalaX = 2+Math.sqrt(h)*0.35;

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
									-4.0,  0.0, 0.0 ];		
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