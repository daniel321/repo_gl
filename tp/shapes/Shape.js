Shape = function(shape){
		this.modelMatrix = mat4.create();
		mat4.identity(this.modelMatrix);

		this.orbitMatrix = mat4.create();
		mat4.identity(this.orbitMatrix);
		
		this.rotateMatrix = mat4.create();
		mat4.identity(this.rotateMatrix);
		
		this.escalateMatrix = mat4.create();
		mat4.identity(this.escalateMatrix);
		
		this.translateMatrix = mat4.create();    
		mat4.identity(this.translateMatrix);
		
		this.shape = shape;
		
        this.initBuffers = function(){
			this.shape.initBuffers(); 
        }	
		
		this.add = function(subshape){
			this.subShapes.push(subshape);
		}
		
		this.translate = function(dX,dY,dZ){
			mat4.translate(this.translateMatrix, this.translateMatrix, [dX,dY,dZ]);
		}

		this.rotate = function(angX,angY,angZ){
			mat4.rotate(this.rotateMatrix, this.rotateMatrix, angX, [1, 0, 0]);
			mat4.rotate(this.rotateMatrix, this.rotateMatrix, angY, [0, 1, 0]);
			mat4.rotate(this.rotateMatrix, this.rotateMatrix, angZ, [0, 0, 1]);
		}

		this.orbit = function(angX,angY,angZ){
			mat4.rotate(this.orbitMatrix, this.orbitMatrix, angX, [1, 0, 0]);
			mat4.rotate(this.orbitMatrix, this.orbitMatrix, angY, [0, 1, 0]);
			mat4.rotate(this.orbitMatrix, this.orbitMatrix, angZ, [0, 0, 1]);
		}
		
		this.scale = function(eX,eY,eZ){
			mat4.scale(this.escalateMatrix, this.escalateMatrix, [eX,eY,eZ]);	
		}
		
		this.restore = function(){
			mat4.identity(this.modelMatrix);
			
			mat4.identity(this.orbitMatrix);
			mat4.identity(this.rotateMatrix);
			mat4.identity(this.escalateMatrix);  
			mat4.identity(this.translateMatrix);
		}

		this.acumulate = function(){
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.orbitMatrix);			
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.translateMatrix);
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.rotateMatrix);
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.escalateMatrix);
		}

		this.acumulateMatrix = function(matrix){
			mat4.multiply(this.modelMatrix, this.modelMatrix, matrix);	
		}
		
		this.getMatrix = function(){
			var matrix = mat4.create();
			mat4.identity(matrix);

			mat4.multiply(matrix, this.modelMatrix, this.orbitMatrix);		
			mat4.multiply(matrix, matrix, this.translateMatrix);
			mat4.multiply(matrix, matrix, this.rotateMatrix);
			mat4.multiply(matrix, matrix, this.escalateMatrix);
			
			return matrix;
		}
		
        this.draw = function(worldMatrix){
			var compositeMatrix = mat4.create();
			mat4.identity(compositeMatrix);

			mat4.multiply(compositeMatrix, this.modelMatrix, worldMatrix);
			mat4.multiply(compositeMatrix, compositeMatrix, this.orbitMatrix);			
			mat4.multiply(compositeMatrix, compositeMatrix, this.translateMatrix);
			mat4.multiply(compositeMatrix, compositeMatrix, this.rotateMatrix);
			mat4.multiply(compositeMatrix, compositeMatrix, this.escalateMatrix);
			
			this.shape.draw(compositeMatrix);
        }
        
		this.printMatrix = function(){
			console.log(mat4.str(this.modelMatrix));
		}
    };