FreeCamera = function(source,target,up){
	this.up = up;
	this.source = source;
	this.target = target;
	this.rotation = [0,0,0];
	
	this.matrix  = null;
	
	this.getMatrix = function(){
		this.matrix  = mat4.create();
		mat4.identity(this.matrix);
		mat4.lookAt(this.source, this.target, this.up,this.matrix);
		return this.matrix;
    }
		
	this.Pitch = function(amount){	
		//var axisDir = this.getDir(this.target,this.source);
		//var axisPoint = this.source;

		var axisDir = this.up;
		var axisPoint = [0,0,0];

		this.target = this.rotateArroundAxis(this.target,axisDir,axisPoint,amount);	
	}	
	
	this.rotateArroundAxis = function(point,axisDir,axisPoint,ang){
		var cos = Math.cos(ang);
		var sin = Math.sin(ang);
		
		var a = axisPoint[0];
		var b = axisPoint[1];
		var c = axisPoint[2];

		var u = axisDir[0];
		var v = axisDir[1];
		var w = axisDir[2];
		
		var x = point[0];
		var y = point[1];
		var z = point[2];
		
		return [ (a*(v*v + w*w) - u*(b*v + c*w - u*x - v*y - w*z))*(1-cos) + x*cos + (-c*v + b*w - w*y + v*z)*sin ,
				 (b*(u*u + w*w) - v*(a*u + c*w - u*x - v*y - w*z))*(1-cos) + y*cos + ( c*u - a*w + w*x - u*z)*sin ,
				 (c*(u*u + v*v) - w*(a*u + b*v - u*x - v*y - w*z))*(1-cos) + z*cos + (-b*u + a*v - v*x + u*y)*sin ];
	}
	
	this.Up = function(amount){
		var increase = this.mult(amount,this.up);
		
		this.source = this.addition(this.source,increase);
		this.target = this.addition(this.target,increase);		
	}
	
	this.Down = function(amount){
		this.Up(-amount);		
	}	
	
	this.Forward = function(amount){
		var diff = this.getDir(this.target,this.source);
		var increase = this.mult(amount,diff);
		
		this.source = this.addition(this.source,increase);
		this.target = this.addition(this.target,increase);		
	}
	
	this.Backwards = function(amount){
		this.Forward(-amount);		
	}	

	this.Left = function(amount){
		var diff = this.getDir(this.source,this.target);
		var dirLeft = this.cross(diff,this.up);
		var increase = this.mult(amount,dirLeft);	
		
		this.source = this.difference(increase,this.source);
		this.target = this.difference(increase,this.target);		
	}
	
	this.Right = function(amount){
		this.Left(-amount);	
	}		
	
	this.cross = function(a,b){
		var res = vec3.create();
		vec3.cross(a, b,res);
		
		return [res[0],res[1],res[2]];
	}
	
	this.getDir = function(a,b){
		return this.normalize(this.difference(a,b));
	}
	
	this.mult = function(k,a){
		return [k*a[0],k*a[1],k*a[2]];
	}
	
	this.addition = function(a,b){
		return [b[0]+a[0],b[1]+a[1],b[2]+a[2]];
	}
	
	this.difference = function(a,b){
		return [b[0]-a[0],b[1]-a[1],b[2]-a[2]];
	}

	this.norm = function(a){
		return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
	}
	
	this.normalize = function(a){
		var norm = this.norm(a); 
		return [ a[0]/norm , a[1]/norm , a[2]/norm];
	}
};