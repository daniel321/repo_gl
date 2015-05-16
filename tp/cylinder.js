	Cylinder = function ( radius,height,delta){
		this.radius = radius;
		this.height = height;
		this.delta = delta;
		
        this.position_buffer = [];
        this.normal_buffer = [];
        this.texture_coord_buffer = [];
        this.index_buffer = [];

        this.pos = [];
        this.norm = [];
        this.text = [];	
		
        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_texture_coord_buffer = null;
        this.webgl_index_buffer = null;
        
        this.texture = null;

        this.initTexture = function(texture_file){
            
            var aux_texture = gl.createTexture();
            this.texture = aux_texture;
            this.texture.image = new Image();

			var texture = this.texture;
			var image = this.texture.image;
			
            this.texture.image.onload = function () {
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
				gl.generateMipmap(gl.TEXTURE_2D);

				gl.bindTexture(gl.TEXTURE_2D, null);
            }
            this.texture.image.src = texture_file;
        }

	this.generateVertex = function(radius,height,delta){
		var centerTop = [ 0, 0, height/2 ]; 
		var centerBottom = [ 0, 0, -height/2 ];

		this.text.push([0.5,0.5]);
		this.text.push([0.5,0.5]);
		
		this.pos.push(centerTop);
		this.pos.push(centerBottom);
		
		this.norm.push([0,0,1]);
		this.norm.push([0,0,-1]);
		
		var i,x,y;
		for(i=0;(i<=2*Math.PI + delta);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
	
			var posTop = [ x, y, height/2 ]; 
			var posBottom = [ x, y, -height/2 ]; 

			this.pos.push(posTop);
			this.pos.push(posBottom);					
			this.pos.push(posTop);
			this.pos.push(posBottom);		

			this.norm.push([x,y,1]);			
			this.norm.push([x,y,-1]);			
			this.norm.push([x,y,1]);			
			this.norm.push([x,y,-1]);			
			
			this.text.push([x,0]);
			this.text.push([x,1]);			
			this.text.push([x,0]);			
			this.text.push([x,1]);			
		}
	}
  
	this.generateIndex = function(radius,delta){
  		var i,cont = 2;

		for(i=0;(i<=2*Math.PI);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
							
			this.index_buffer.push(0);					//                    0
			this.index_buffer.push(0); 					//                   /  \	
			this.index_buffer.push(cont); 				//	    cont cont+2  ---- cont+4 cont+6 
			this.index_buffer.push(cont+4);				//			        |    |
													//	            	|    |
			this.index_buffer.push(cont+2);				//	            	|    |
			this.index_buffer.push(cont+6);				//		            |    |
			this.index_buffer.push(cont+1);				//	                |    |
			this.index_buffer.push(cont+5);				//                  |    |           
													//	                |    |
			this.index_buffer.push(cont+3);				//     cont+1 cont+3 ---- cont+5 cont+7
			this.index_buffer.push(cont+7);				//			         \  / 
			this.index_buffer.push(1);					//		               1
					
			cont +=4;
		}
	}
	
        this.initBuffers = function(){
			this.generateVertex(this.radius,this.height,this.delta);
			this.generateIndex(this.radius,this.delta);
		  
			  // Replicamos los colores de cada cara 3 veces.
			this.texture_coord_buffer = [];
			for (var j=0; j<this.text.length; j++) {
				var c = this.text[j];
				this.texture_coord_buffer = this.texture_coord_buffer.concat(c);
			}

			this.normal_buffer = [];
			for (var j=0; j<this.norm.length; j++) {
			  var c = this.norm[j];
			  this.normal_buffer = this.normal_buffer.concat(c);
			}
			
			this.position_buffer = [];
			for (var j=0; j<this.pos.length; j++) {
			  var c = this.pos[j];
			  this.position_buffer = this.position_buffer.concat(c);
			}
		
            // Creación e Inicialización de los buffers a nivel de OpenGL
            this.webgl_normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
            this.webgl_normal_buffer.itemSize = 3;
            this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

            this.webgl_texture_coord_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
            this.webgl_texture_coord_buffer.itemSize = 2;
            this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

            this.webgl_position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
            this.webgl_position_buffer.itemSize = 3;
            this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

            this.webgl_index_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
            this.webgl_index_buffer.itemSize = 1;
            this.webgl_index_buffer.numItems = this.index_buffer.length;
        }

        this.draw = function(modelMatrix){

            // Se configuran los buffers que alimentarán el pipeline
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
            var normalMatrix = mat3.create();
            mat3.normalFromMat4(normalMatrix, modelMatrix);            
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
    };