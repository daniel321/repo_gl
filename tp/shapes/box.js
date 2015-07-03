	
	Box = function (width, height, depth, material, conditionShader){
		this.width = width;
		this.height = height;
		this.depth = depth;
        this.material = material;
        this.withNormalMap = conditionShader.useNormalMap;
        this.withReflexion = conditionShader.useReflexion;
		
        this.position_buffer = null;
        this.normal_buffer = null;
        this.texture_coord_buffer = null;
        this.index_buffer = null;
        this.tangente_buffer = null;

        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_texture_coord_buffer = null;
        this.webgl_index_buffer = null;
        this.webgl_tangente_buffer = null;
        
        this.texture = null;
        this.normalMap = null;

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
        
        this.initNormalMap = function(texture){
            this.normalMap = texture;
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
        
        this.tangente_buffer = [1.0,  0.0, 0.0,
				                1.0,  0.0, 0.0,
							    1.0,  0.0, 0.0,
								1.0,  0.0, 0.0,

				                -1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,	
								
								1.0,  0.0, 0.0,
				                1.0,  0.0, 0.0,
							    1.0,  0.0, 0.0,
								1.0,  0.0, 0.0,

								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								-1.0,  0.0, 0.0,
								  
								 0.0,  1.0, 0.0,
								 0.0,  1.0, 0.0,
								 0.0,  1.0, 0.0,
								 0.0,  1.0, 0.0,
								 
								 0.0, -1.0, 0.0,
								 0.0, -1.0, 0.0,
								 0.0, -1.0, 0.0,
								 0.0, -1.0, 0.0								  
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
            
            this.webgl_tangente_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangente_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangente_buffer), gl.STATIC_DRAW);
            this.webgl_tangente_buffer.itemSize = 3;
            this.webgl_tangente_buffer.numItems = this.tangente_buffer.length / 3;
        }

        this.draw = function(modelMatrix){
            
            var variables = {
                bufferPosition: this.webgl_position_buffer,
                bufferTextureCoord: this.webgl_texture_coord_buffer,
                bufferNormal: this.webgl_normal_buffer,
                bufferTangente: this.webgl_tangente_buffer,
                texture: this.texture,
                normalMap: this.normalMap,
                matrixModel: modelMatrix,
                isWater: false,
                withNormalMap: this.withNormalMap,
                withReflexion: this.withReflexion,
                bufferIndex: this.webgl_index_buffer,
                typeDraw: gl.TRIANGLES,
                material: this.material
            };
            
            program.setVariables(variables);
        }
    };
	
