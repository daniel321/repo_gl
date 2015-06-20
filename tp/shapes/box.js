	
	Box = function ( width, height, depth){
		this.width = width;
		this.height = height;
		this.depth = depth;
		
        this.position_buffer = null;
        this.normal_buffer = null;
        this.texture_coord_buffer = null;
        this.index_buffer = null;

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
		
	this.setVertices = function(width, height, depth){	
	
		// front,back,up,down,left,right
		this.position_buffer = [ -width/2,  height/2, depth/2,
								 width/2,  height/2, depth/2,
								-width/2, -height/2, depth/2,
								 width/2, -height/2, depth/2,
								 
								 -width/2,  height/2, -depth/2,
								  width/2,  height/2, -depth/2,
								 -width/2, -height/2, -depth/2,
								  width/2, -height/2, -depth/2,

								 -width/2,  height/2,  depth/2,
								  width/2,  height/2,  depth/2,
								 -width/2,  height/2, -depth/2,
								  width/2,  height/2, -depth/2,
								  
								  -width/2, -height/2, depth/2,
								   width/2, -height/2, depth/2,
								 -width/2, -height/2, -depth/2,
								  width/2, -height/2, -depth/2,

								 -width/2,  height/2,  depth/2,
								 -width/2,  height/2, -depth/2,
								 -width/2, -height/2,  depth/2,
								 -width/2, -height/2, -depth/2, 
								  
								 width/2,  height/2,  depth/2,
								 width/2,  height/2, -depth/2,
								 width/2, -height/2,  depth/2,
								 width/2, -height/2, -depth/2 ];
		
		this.normal_buffer = [  0.0,  0.0, 1.0,
								0.0,  0.0, 1.0,
							    0.0,  0.0, 1.0,
								0.0,  0.0, 1.0,

								0.0,  0.0, -1.0,
								0.0,  0.0, -1.0,
							    0.0,  0.0, -1.0,
								0.0,  0.0, -1.0,	
								
								0.0,  1.0, 0.0,
								0.0,  1.0, 0.0,
							    0.0,  1.0, 0.0,
								0.0,  1.0, 0.0,

								0.0, -1.0, 0.0,
								0.0, -1.0, 0.0,
							    0.0, -1.0, 0.0,
								0.0, -1.0, 0.0,
								  
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								 
								 1.0, 0.0, 0.0,
								 1.0, 0.0, 0.0,
								 1.0, 0.0, 0.0,
								 1.0, 0.0, 0.0								  
							];
		
        if (this.texture_coord_buffer == null) {
			var x = 1;
		    
			// front,back,up,down,left,right
			
			this.texture_coord_buffer =   [         0,        0,
                                              width/x,        0,
									                0, height/x,
									          width/x, height/x,

													0,        0,
                                              width/x,        0,
									                0, height/x,
									          width/x, height/x,											  

													0,        0,
                                              width/x,        0,
									                0,  depth/x,
									          width/x,  depth/x,
											  
													0,        0,
                                              width/x,        0,
									                0,  depth/x,
									          width/x,  depth/x,

													0,        0,
                                              depth/x,        0,
									                0,  height/x,
									          depth/x,  height/x,											  
											  
													0,        0,
                                              depth/x,        0,
									                0,  height/x,
									          depth/x,  height/x  ];
        }
            
		this.index_buffer = [ 0, 1, 2,
							 1, 2, 3,
							 
							 20, 21, 22,
							 21, 22, 23,
							 
							 5, 4, 7,
							 4, 7, 6,
							 
							 17, 16, 19,
							 16, 19, 18,
							 
							 8,  9, 10,
							 9, 10, 11,
							 
							 12,13,14,
							 13,14,15 ];						
		}
    
        this.setCoordTexture = function(coord){
            this.texture_coord_buffer = coord;
        }
		
        this.initBuffers = function(){
			this.setVertices(this.width, this.height, this.depth);

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

            var isWater = false;
            gl.uniform1i(shaderProgram.isWater, isWater);
            
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
    };
	
