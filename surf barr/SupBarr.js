  SupBarr = function (shape, path){

        this.shape = shape.getPoints();
        this.normals = shape.getNormals();

        this.path = path.getPoints();
  		this.normal = path.getPerp();
		
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
		
        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triángulos de la esfera
        this.initBuffers = function(){

            this.position_buffer = [];
            this.normal_buffer = [];
            this.texture_coord_buffer = [];
            this.index_buffer = [];

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
        }

		this.cross = function(p1,p2){
			var sol = [];
			
			sol.push(      (p1[1] * p2[2]) - (p2[1] * p1[2]) );
			sol.push( (-1)*(p1[0] * p2[2]) - (p2[0] * p1[2]) );
			sol.push(      (p1[0] * p2[1]) - (p2[0] * p1[1]) );
		
			return sol;
		}
		
		this.calculateRot = function(center, centerNext){
				var dx = (centerNext[0]-center[0]);
				var dy = (centerNext[1]-center[1]);
				var dz = (centerNext[2]-center[2]);
				
				var angRot = [0,0,0];

				if ( dz != 0 )
				angRot[0] = Math.atan( dy / dz );     

				if ( dz != 0 )				
				angRot[1] = Math.atan( dx / dz );				

				if ( dx != 0 )
				angRot[2] = Math.atan( dy / dx ); 
				
				return angRot;
		}
		
		this.calculateShape = function(){		
			var numShapes = this.path.length;
			var pointsPerShape = this.shape.length; 
			
			var cont = 0;
			for (var y=0; y < numShapes ; y+=3){			
				var center = [ this.path[y] , this.path[y+1] , this.path[y+2] ];
				var centerNext = [ this.path[y+3] , this.path[y+4] , this.path[y+5] ];				
				//var angRot = this.calculateRot(center,centerNext);
				
				var tg = [ centerNext[0]-center[0] , centerNext[1]-center[1], centerNext[2]-center[2]];
				var mod = Math.sqrt(tg[0]*tg[0] + tg[1]*tg[1] + tg[2]*tg[2]);
				tg = [tg[0]/mod, tg[1]/mod , tg[2]/mod];
				var normal = this.normal;
	
				var up = vec3.create();
				vec3.cross(vec3.create(tg),vec3.create(normal),up);

				
				for (var x=0; x < pointsPerShape; x+=3){			

					var rotate = mat4.create();
					mat4.identity(rotate);
				
					mat4.lookAt(up, centerNext, center,rotate);
					//mat4.rotate(rotate, angRot[0], [1, 0, 0]);
					//mat4.rotate(rotate, angRot[1], [0, 1, 0]);
					//mat4.rotate(rotate, angRot[2], [0, 0, 1]);
					
					var transform = mat4.create();
					mat4.identity(transform);
					mat4.translate(transform, center);
					mat4.multiply(transform, rotate);
					
					// ---------- puntos ----------
					var point = [this.shape[x],this.shape[x+1],this.shape[x+2]];
					mat4.multiplyVec3(transform, point);

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
					var normals = [this.normals[y] , this.normals[y+1] , this.normals[y+2]];				
					mat4.multiplyVec3(rotate, normals);

					this.normal_buffer.push(normals[0]); 
					this.normal_buffer.push(normals[1]); 
					this.normal_buffer.push(normals[2]); 
	
					// ---------- texturas ----------	
					this.texture_coord_buffer.push((1.0*x)/pointsPerShape);
					this.texture_coord_buffer.push((1.0*y)/numShapes);	
				}			
			}
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
            mat4.toInverseMat3(modelMatrix, normalMatrix);
            mat3.transpose(normalMatrix);
            gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
			//gl.drawElements(gl.LINES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
    };