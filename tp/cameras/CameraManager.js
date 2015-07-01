CameraManager = function(){
	this.cameras = [];
	this.active = 0;
	
	this.add = function(camera){
		this.cameras.push(camera);
	}
	
	this.cycleCamera = function(){
		var cant = this.cameras.length;
		this.active = (this.active+1)%cant;
	}
	
	this.ToCamera = function(index){
		var cant = this.cameras.length;
		if(index < cant)
			this.active = index;
	}	
	
	this.getMatrix = function(){
		return this.getActive().getMatrix();
    }
	
	this.Pitch = function(amount){			
		this.getActive().Pitch(amount);
	}	
	
	this.Yaw = function(amount){	
		this.getActive().Yaw(amount);
	}		
	
	this.Up = function(amount){
		this.getActive().Up(amount);	
	}
	
	this.Down = function(amount){
		this.getActive().Up(-amount);		
	}	
	
	this.Forward = function(amount){
		this.getActive().Forward(amount);		
	}
	
	this.Backwards = function(amount){
		this.getActive().Forward(-amount);		
	}	

	this.Left = function(amount){
		this.getActive().Left(amount);			
	}
	
	this.Right = function(amount){
		this.getActive().Left(-amount);	
	}		
	
	this.getActive = function(){
		return this.cameras[this.active];
	}
    
    this.getPosition = function() {
        return this.getActive().getPosition();	
    }
};