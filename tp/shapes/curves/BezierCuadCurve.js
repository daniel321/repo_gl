  BezierCuadCurve = function (controlPoints, vectPerp, resolution){
		this.tambcuad = resolution;

		this.controlPoints = controlPoints;
		this.vectPerp = vectPerp;
		
        this.position_buffer = null;
        this.normal_buffer = null;
		this.index_buffer = null;
      
		this.calculateCurve = function(){		
			var cont = 0;
			for (var p=0; p < controlPoints.length-6; p+=6){

				var p0 = [controlPoints[p],controlPoints[p+1],controlPoints[p+2]];
				var p1 = [controlPoints[p+3],controlPoints[p+4],controlPoints[p+5]];
				var p2 = [controlPoints[p+6],controlPoints[p+7],controlPoints[p+8]];

				for (var t=0.0; t<=1; t+= (1.0/this.tambcuad)){
 
					var b0 = (1-t)*(1-t);
					var b1 = 2*(1-t)*t;
					var b2 = (t*t);

					var x = p0[0]*b0 + p1[0]*b1 + p2[0]*b2;
					var y = p0[1]*b0 + p1[1]*b1 + p2[1]*b2;	
					var z = p0[2]*b0 + p1[2]*b1 + p2[2]*b2;

					this.position_buffer.push(x);
					this.position_buffer.push(y);
					this.position_buffer.push(z);

					this.index_buffer.push(cont++);
				}
			}
		}
		
	this.calculateNormals = function(){
		var h = 0.01; 
		var t = 0;
		
		for (t=0; t<this.position_buffer.length-3 ;t+=3){	// dx                      dy              dz
									// vectPerp[0]             vectPerp[1]     vectPerp[2]
			var dx = (this.position_buffer[t+3] - this.position_buffer[t])/h ;		// x' = dy*vectPerp[2]-dz*vectPerp[1]
			var dy = (this.position_buffer[t+4] - this.position_buffer[t+1])/h;		// y' = dz*vectPerp[0]-dx*vectPerp[2]
			var dz = (this.position_buffer[t+5] - this.position_buffer[t+2])/h;		// z' = dx*vectPerp[1]-dy*vectPerp[0]

			var x = dy*vectPerp[2]-dz*vectPerp[1];
			var y = dz*vectPerp[0]-dx*vectPerp[2];
			var z = dx*vectPerp[1]-dy*vectPerp[0];

			var mod = Math.sqrt(x*x+y*y+z*z);

			if(x == 0 || y==0){
				x = this.normal_buffer[this.normal_buffer.length-3];
				y = this.normal_buffer[this.normal_buffer.length-2];
				z = this.normal_buffer[this.normal_buffer.length-1];

				this.normal_buffer.push(x); 
				this.normal_buffer.push(y); 
				this.normal_buffer.push(z); 
			}else{
				this.normal_buffer.push(-x/mod); 
				this.normal_buffer.push(-y/mod); 
				this.normal_buffer.push(-z/mod); 
			}			
		}

			var dx = (this.position_buffer[t]   - this.position_buffer[t-3])/h;		
			var dy = (this.position_buffer[t+1] - this.position_buffer[t-2])/h;

			var mod = Math.sqrt(dx*dx+dy*dy);
			if (mod != 0){
				dx = dx/mod;
				dy = dy/mod;
			}
		
			if(x == 0 || y==0){
				var x = this.normal_buffer[0];
				var y = this.normal_buffer[1];
				var z = this.normal_buffer[2];

				this.normal_buffer.push(x); 
				this.normal_buffer.push(y); 
				this.normal_buffer.push(z); 
			}else{
				this.normal_buffer.push(dy); 
				this.normal_buffer.push((-1)*dx); 
				this.normal_buffer.push(0); 
			}			
	}	

        this.initBuffers = function(){

		    this.position_buffer = [];
			this.normal_buffer = [];
			this.index_buffer = [];
			this.texture_coord_buffer = [];
		
			this.calculateCurve();
			this.calculateNormals();
	     }	
		
		this.getPoints = function(){
			return this.position_buffer;
		}
		
		this.getPerp = function(){
			return this.vectPerp;
		}

		this.getNormals = function(){
			return this.normal_buffer;
		}
    };
