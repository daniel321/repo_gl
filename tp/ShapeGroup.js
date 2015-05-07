ShapeGroup = function(){
		this.modelMatrix = mat4.create();
		mat4.identity(this.modelMatrix);
			
		this.rotateMatrix = mat4.create();
		mat4.identity(this.rotateMatrix);

		this.orbitMatrix = mat4.create();
		mat4.identity(this.orbitMatrix);
		
		this.escalateMatrix = mat4.create();
		mat4.identity(this.escalateMatrix);
		
		this.translateMatrix = mat4.create();    
		mat4.identity(this.translateMatrix);  
		
        this.shapes = [];

        this.initBuffers = function(){
			for(shape in this.shapes){
				if(this.shapes[shape] != null)
					this.shapes[shape].initBuffers();
			}
        }

		this.add = function(subshape){
			this.shapes.push(subshape);
		}
		
		this.translate = function(dX,dY,dZ){
			mat4.translate(this.translateMatrix, [dX,dY,dZ]);
		}

		this.rotate = function(angX,angY,angZ){
			mat4.rotate(this.rotateMatrix, angX, [1, 0, 0]);
			mat4.rotate(this.rotateMatrix, angY, [0, 1, 0]);
			mat4.rotate(this.rotateMatrix, angZ, [0, 0, 1]);
		}

		this.orbit = function(angX,angY,angZ){
			mat4.rotate(this.orbitMatrix, angX, [1, 0, 0]);
			mat4.rotate(this.orbitMatrix, angY, [0, 1, 0]);
			mat4.rotate(this.orbitMatrix, angZ, [0, 0, 1]);
		}
		
		this.scale = function(eX,eY,eZ){
			mat4.scale(this.escalateMatrix, [eX,eY,eZ]);	
		}
		
		this.restore = function(){
			mat4.identity(this.modelMatrix);
			
			mat4.identity(this.orbitMatrix);
			mat4.identity(this.rotateMatrix);
			mat4.identity(this.escalateMatrix);  
			mat4.identity(this.translateMatrix);
		}

		this.acumulate = function(){
			mat4.multiply(this.modelMatrix, this.orbitMatrix, this.modelMatrix);			
			mat4.multiply(this.modelMatrix, this.translateMatrix, this.modelMatrix);
			mat4.multiply(this.modelMatrix, this.rotateMatrix, this.modelMatrix);
			mat4.multiply(this.modelMatrix, this.escalateMatrix, this.modelMatrix);
		}

		this.acumulateMatrix = function(matrix){
			mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);	
		}	
		
		this.getMatrix = function(){
			var matrix = mat4.create();
			mat4.identity(matrix);

			mat4.multiply(this.modelMatrix, this.orbitMatrix, matrix);		
			mat4.multiply(matrix, this.translateMatrix, matrix);
			mat4.multiply(matrix, this.rotateMatrix, matrix);
			mat4.multiply(matrix, this.escalateMatrix, matrix);
			
			return matrix;
		}
		
		this.get = function(index){
			if(index < this.shapes.length)
				return this.shapes[index];
			else
				return null;
		}
		
		this.remove = function(index){
			this.shapes.splice(index,1);
		}
		
        this.draw = function(worldMatrix){
			var compositeMatrix = mat4.create();
			mat4.identity(compositeMatrix);
			
			mat4.multiply(this.modelMatrix, worldMatrix, compositeMatrix);
			mat4.multiply(compositeMatrix, this.orbitMatrix, compositeMatrix);			
			mat4.multiply(compositeMatrix, this.translateMatrix, compositeMatrix);
			mat4.multiply(compositeMatrix, this.rotateMatrix, compositeMatrix);
			mat4.multiply(compositeMatrix, this.escalateMatrix, compositeMatrix);
			
			for(shape in this.shapes){
				if(this.shapes[shape] != null)
					this.shapes[shape].draw(compositeMatrix);
			}
        }
		
        this.printMatrix = function(){
			console.log(mat4.str(this.modelMatrix));
		}
    };