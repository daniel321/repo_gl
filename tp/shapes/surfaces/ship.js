Ship = function(objectUniform){
	this.movmentAmount = 0;
	
	this.scales = [];
	this.controlPointsPath = [];
	this.controlPointsCurve = [];
	
	this.surfShape = null;
	this.topShape = null;
	
	this.surf = null;
	this.curve = null;
	this.top = null;
	
	this.uniform = objectUniform;
	this.texturePath = null;

	this.all = null;
	
	this.initBuffers = function(){
		this.initControlPoints();
		
		this.curve = new BezierCuadCurve(this.controlPointsCurve, [0,0,1], 10);
		this.curve.initBuffers();
	    this.curve.initTexture("./textures/red.jpg");		

		this.generateTop();
		this.top.initBuffers();
	    this.top.initTexture(this.texturePath);
	
		this.topShape = new Shape(this.top,this.uniform);
	
		this.surf = new SupBarr(this.curve,this.controlPointsPath,this.scales);
		this.surf.initBuffers();
	    this.surf.initTexture(this.texturePath);
		
		this.surfShape = new Shape(this.surf,this.uniform);
	
		this.all = new ShapeGroup();
		this.all.add(this.surfShape);	
		this.all.add(this.topShape);			
		
		this.surfShape.rotate(Math.PI/2,Math.PI,Math.PI/2);
		this.topShape.rotate(Math.PI/2,Math.PI,Math.PI/2);
		this.topShape.translate(0,0.8,0);
	}
	
	this.initControlPoints = function(){	 
		var delta = 1;
		var m = 6;

		for(var i=0; i<m ; i+= delta){
			this.controlPointsPath.push(0,0,i*0.2);
			var h = i/m;
			var escalaY = 1+Math.sqrt(h);			
			var escalaX = 1+Math.sqrt(h)*0.5;

			this.scales.push(escalaX,escalaY,1);
		}	
		
		this.controlPointsCurve = [  -1,   1,0,
									  1,   1,0,
									1.5,   0,0,
									  1,  -1,0,
									 -1,  -1,0,
									 -1,   1,0,
									 -1,   1,0 ];		
	}
	
	this.generateTop = function(){
		var tamScale = this.scales.length;
		var tamPos = this.controlPointsPath.length;
		
		var scale = [this.scales[tamScale-6] , this.scales[tamScale-5] ,this.scales[tamScale-4]];
		var pos = [this.controlPointsPath[tamPos-6] , this.controlPointsPath[tamPos-5], this.controlPointsPath[tamPos-4]];
		
		var matrix = mat4.create();
		mat4.identity(matrix);
		mat4.scale(matrix,matrix,scale);
		mat3.translate(matrix,matrix,pos);
		
		this.top = new Fan(this.curve.getPoints(), [0,0,0], matrix);
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