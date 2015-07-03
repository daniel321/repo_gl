  SupBarr = function (shape, path, scales, material, conditionShader){

        this.shape = shape.getPoints();
        this.normals = shape.getNormals();
        this.binormal = shape.getPerp();
		this.scales = scales;
        this.material = material;
        this.withNormalMap = conditionShader.useNormalMap;
        this.withReflexion = conditionShader.useReflexion;
		
        this.path = path;
		
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
		
        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triángulos de la esfera
        this.initBuffers = function(){

            this.position_buffer = [];
            this.normal_buffer = [];
            this.texture_coord_buffer = [];
            this.index_buffer = [];
            this.tangente_buffer = [];

			this.calculateShape();
			
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
		
		this.calculateShape = function(){		
			var numShapes = this.path.length;
			var pointsPerShape = this.shape.length; 
	
			var centerFirst = [ this.path[0] , this.path[1] , this.path[2] ];
			var centerLast = [ this.path[numShapes-3] , this.path[numShapes-2] , this.path[numShapes-1] ];	
		
			var cont = 0;
			for (var y=0; y < numShapes ; y+=3){			
				var center = [ this.path[y] , this.path[y+1] , this.path[y+2] ];
				var centerNext = [ this.path[y+3] , this.path[y+4] , this.path[y+5] ];		
				var scale = [this.scales[y], this.scales[y+1] , this.scales[y+2] ];

				
				for (var x=0; x < pointsPerShape; x+=3){			
		
					var transform = mat4.create();
					mat4.identity(transform);
					mat4.translate(transform, transform, center);
					mat4.scale(transform, transform, scale);

					// ---------- puntos ----------
					var point = [this.shape[x],this.shape[x+1],this.shape[x+2]];
					vec3.transformMat4(point,point,transform);

					this.position_buffer.push(point[0]);
					this.position_buffer.push(point[1]);
					this.position_buffer.push(point[2]);
			
					// ---------- indices ----------
					var act = ((pointsPerShape/3)*(y/3))+(x/3);
					if(y > 0){
						this.index_buffer.push(act);
						this.index_buffer.push(act - (pointsPerShape/3));
					}
					
					// ---------- normales ----------				
					var normals = [this.normals[x] , this.normals[x+1] , this.normals[x+2]];				

//                    var transformNormal = mat3.create();
//					mat3.identity(transformNormal);
//					mat3.normalFromMat4(transformNormal, transform);
//                    vec3.transformMat4(normals, normals, transformNormal);
                    
					this.normal_buffer.push(normals[0]); 
					this.normal_buffer.push(normals[1]); 
					this.normal_buffer.push(normals[2]); 
	
					// ---------- texturas ----------	
					
					var utils = new VectorUtils();
					var textCoord = utils.normalize(utils.difference(centerFirst,point));
					
					
					this.texture_coord_buffer.push(-textCoord[0]);
					this.texture_coord_buffer.push(-textCoord[2]);
					
//					this.texture_coord_buffer.push(20*x/pointsPerShape);
//					this.texture_coord_buffer.push(1-(y/1.5)/numShapes);
                    
                    // ---------- tangentes ----------	
					
					var tang = utils.normalize(utils.cross(this.binormal, normals));
                    
                    this.tangente_buffer.push(tang[0]); 
					this.tangente_buffer.push(tang[1]); 
					this.tangente_buffer.push(tang[2]);
				}			
			}
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
                isWater: this.isWater,
                withNormalMap: this.withNormalMap,
                withReflexion: this.withReflexion,
                bufferIndex: this.webgl_index_buffer,
                typeDraw: gl.TRIANGLE_STRIP,
                material: this.material
            };
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

            program.setVariables(variables);
        }
    };
