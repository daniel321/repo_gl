OrbitalCamera = function(source,target,up){
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
	
    this.getPosition = function(){
		return this.source;
    }
    
	this.Pitch = function(amount){			
		var axisDir = this.up;
		var axisPoint = this.target;

		this.source = this.utils.rotateArroundAxis(this.source,axisDir,axisPoint,amount);	
		this.pitch += amount;
		this.updateBinormal();
	}	
	
	this.updateBinormal = function(){
		var tgt = this.utils.getDir(this.target,this.source);
		this.binorm = [ tgt[1]*up[2]-tgt[2]*up[1] , -tgt[0]*up[2]+tgt[2]*up[0], tgt[0]*up[1]-tgt[1]*up[0] ];	
	}
	
	this.Yaw = function(amount){	
		var axisDir = this.utils.normalize(this.binorm);
		var axisPoint = this.target;
		
		this.source = this.utils.rotateArroundAxis(this.source,axisDir,axisPoint,amount);	
		this.yaw += amount;	
		
		this.updateBinormal();
	}		
	
	this.Up = function(amount){
		this.Yaw(amount);	
	}
	
	this.Forward = function(amount){
		var diff = this.utils.getDir(this.target,this.source);
		var increase = this.utils.mult(amount,diff);
		
		this.source = this.utils.addition(this.source,increase);		
	}

	this.Left = function(amount){
		this.Pitch(amount);		
	}
};