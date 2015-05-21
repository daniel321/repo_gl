  BezierCuadCurve = function (controlPoints, vectPerp, resolution){
		this.tambcuad = resolution;

		this.controlPoints = controlPoints;
		this.vectPerp = vectPerp;
		
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

					//console.log("t: ", t," [" , x, ",", y , "," , z, "]");
					
					this.index_buffer.push(cont++);
					
					this.texture_coord_buffer.push(0);
					this.texture_coord_buffer.push(0);
				}
			}
		}
		
	this.calculateNormals = function(){
		var h = 0.1; 
		var t = 0;
		
		for (t=0; t< this.position_buffer.length-3 ;t+=3){							// dx                      dy              dz
																					// vectPerp[0] vectPerp[1]  vectPerp[2]
			var dx = (this.position_buffer[t+3] - this.position_buffer[t])/h ;		// x' = dy*vectPerp[2]-dz*vectPerp[1]
			var dy = (this.position_buffer[t+4] - this.position_buffer[t+1])/h;		// y' = dz*vectPerp[0]-dx*vectPerp[2]
			var dz = (this.position_buffer[t+5] - this.position_buffer[t+2])/h;		// z' = dx*vectPerp[1]-dy*vectPerp[0]

			var x = dy*vectPerp[2]-dz*vectPerp[1];
			var y = dz*vectPerp[0]-dx*vectPerp[2];
			var z = dx*vectPerp[1]-dy*vectPerp[0];

			var mod = Math.sqrt(x*x+y*y+z*z);

			if (mod != 0){
				x = x/mod;
				y = y/mod;
				z = z/mod;
			}
			
			this.normal_buffer.push(x); 
			this.normal_buffer.push(y); 
			this.normal_buffer.push(z); 			
		}

			var dx = (this.position_buffer[t]   - this.position_buffer[t-3])/h;		
			var dy = (this.position_buffer[t+1] - this.position_buffer[t-2])/h;

			var mod = Math.sqrt(dx*dx+dy*dy);
			if (mod != 0){
				dx = dx/mod;
				dx = dx/mod;
			}
			this.normal_buffer.push(dy); 
			this.normal_buffer.push((-1)*dx); 
			this.normal_buffer.push(0); 			
	}	

        // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
        // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
        // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
        // a todos los triángulos de la esfera
        this.initBuffers = function(){

		    this.position_buffer = [];
			this.normal_buffer = [];
			this.index_buffer = [];
			this.texture_coord_buffer = [];
		
			this.calculateCurve();
			this.calculateNormals();
			
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
		
		this.getPoints = function(){
			return this.position_buffer;
		}
		
		this.getPerp = function(){
			return this.vectPerp;
		}

		this.getNormals = function(){
			return this.normal_buffer;
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
			gl.lineWidth(1.0);	
			
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
            gl.drawElements(gl.LINES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        
    };