WalkingCamera = function(source,target,up){
	this.up = up;
	this.source = source;
	this.target = target;
	this.binorm = [ target[1]*up[2]-target[2]*up[1] , -target[0]*up[2]+target[2]*up[0], target[0]*up[1]-target[1]*up[0] ];
	
	this.pitch = 0;	
	this.yaw = 0;
	
	this.matrix  = null;
	this.utils = new VectorUtils();
	
	this.getMatrix = function(){
		this.matrix  = mat4.create();
		mat4.identity(this.matrix);
		mat4.lookAt(this.matrix, this.source, this.target, this.up);
		return this.matrix;
    }
		
	this.Pitch = function(amount){			
		var axisDir = this.up;
		var axisPoint = this.source;

		this.target = this.utils.rotateArroundAxis(this.target,axisDir,axisPoint,amount);	
		this.pitch += amount;
		
		this.binorm = [ target[1]*up[2]-target[2]*up[1] , -target[0]*up[2]+target[2]*up[0], target[0]*up[1]-target[1]*up[0] ];		
	}	
	
	this.Yaw = function(amount){	
		var axisDir = this.utils.normalize(this.binorm);
		var axisPoint = this.source;
		
		if(this.source[2] < this.target[2]){
			amount = -amount;
		}
		
		this.target = this.utils.rotateArroundAxis(this.target,axisDir,axisPoint,amount);	
		this.yaw += amount;		
	}		
	
	this.Up = function(amount){}
	
	this.Forward = function(amount){
		var diff = this.utils.getDir(this.target,this.source);
		var increase = this.utils.mult(amount,diff);
		
		increase[1] = 0;
		
		this.source = this.utils.addition(this.source,increase);
		this.target = this.utils.addition(this.target,increase);		
	}

	this.Left = function(amount){
		var diff = this.utils.getDir(this.source,this.target);
		var dirLeft = this.utils.cross(diff,this.up);
		var increase = this.utils.mult(amount,dirLeft);	
		
		increase[1] = 0;
		
		this.source = this.utils.difference(increase,this.source);
		this.target = this.utils.difference(increase,this.target);		
	}
};