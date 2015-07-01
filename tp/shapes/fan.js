	
	Fan = function ( points, center, matrix, material){
		this.points = points;
		this.center = center;
		this.matrix = matrix;
	
        this.position_buffer = [];
        this.normal_buffer = [];
        this.texture_coord_buffer = [];
        this.index_buffer = [];

        this.webgl_position_buffer = null;
        this.webgl_normal_buffer = null;
        this.webgl_texture_coord_buffer = null;
        this.webgl_index_buffer = null;
        
        this.texture = null;
        this.material = material;

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
		
	this.setVertices = function(){				
		var center = this.center;
		vec3.transformMat4(center,center,matrix);
		this.position_buffer.push(this.center[0]);
		this.position_buffer.push(this.center[1]);
		this.position_buffer.push(this.center[2]);
		
		this.texture_coord_buffer.push(0.5);
		this.texture_coord_buffer.push(0.5);
	
		this.normal_buffer.push(0);				
		this.normal_buffer.push(0);
		this.normal_buffer.push(1);
		
		var cont = 0;
		this.index_buffer.push(cont++);
		
		var numPoints = this.points.length;		
		for (var y=0; y < numPoints ; y+=3){
			var point = [this.points[y],this.points[y+1],this.points[y+2]];
			vec3.transformMat4(point,point,matrix);
			
			this.position_buffer.push(point[0]);
			this.position_buffer.push(point[1]);
			this.position_buffer.push(point[2]);
						
			this.index_buffer.push(cont++);
			
			var utils = new VectorUtils();
			var textCoord = utils.normalize(utils.difference(point,center));
			this.texture_coord_buffer.push( textCoord[0] );	
			this.texture_coord_buffer.push( textCoord[1] );	
			
			this.normal_buffer.push(0);
			this.normal_buffer.push(0);
			this.normal_buffer.push(1);
		}
									 
	}
		
        this.initBuffers = function(){
			this.setVertices();

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
            
            var variables = {
                bufferPosition: this.webgl_position_buffer,
                bufferTextureCoord: this.webgl_texture_coord_buffer,
                bufferNormal: this.webgl_normal_buffer,
                texture: this.texture,
                matrixModel: modelMatrix,
                isWater: false,
                bufferIndex: this.webgl_index_buffer,
                typeDraw: gl.TRIANGLE_FAN,
                material: this.material
            };
            
            program.setVariablesDifuso(variables);
        }
    };