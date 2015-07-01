FreeCamera = function(source,target,up){
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
    
	this.updateBinormal = function(){
		var tgt = this.utils.getDir(this.target,this.source);
		
		var bin =  [ tgt[1]*up[2]-tgt[2]*up[1] , -tgt[0]*up[2]+tgt[2]*up[0], tgt[0]*up[1]-tgt[1]*up[0] ]
		this.binorm = bin;	
	}		
		
	this.Pitch = function(amount){			
		var axisDir = this.up;
		var axisPoint = this.source;

		this.target = this.utils.rotateArroundAxis(this.target,axisDir,axisPoint,amount);	
		this.pitch += amount;
		
		this.updateBinormal();
	}	
	
	this.Yaw = function(amount){	
		var axisDir = this.utils.normalize(this.binorm);
		var axisPoint = this.source;

		this.target = this.utils.rotateArroundAxis(this.target,axisDir,axisPoint,amount);	
		this.yaw += amount;	

		this.updateBinormal();		
	}		
	
	this.Up = function(amount){
		var increase = this.utils.mult(amount,this.up);
		
		this.source = this.utils.addition(this.source,increase);
		this.target = this.utils.addition(this.target,increase);	
		
		this.updateBinormal();
	}
	
	this.Forward = function(amount){
		var diff = this.utils.getDir(this.target,this.source);
		var increase = this.utils.mult(amount,diff);
		
		this.source = this.utils.addition(this.source,increase);
		this.target = this.utils.addition(this.target,increase);	

		this.updateBinormal();		
	}

	this.Left = function(amount){
		var diff = this.utils.getDir(this.source,this.target);
		var dirLeft = this.utils.cross(diff,this.up);
		var increase = this.utils.mult(amount,dirLeft);	
		
		this.source = this.utils.difference(increase,this.source);
		this.target = this.utils.difference(increase,this.target);	

		this.updateBinormal();		
	}
};