	Cylinder = function ( radius,height,delta, material){
		this.radius = radius;
		this.height = height;
		this.delta = delta;
        this.material = material;
		
		this.topShape = null;
		this.botShape = null;
		
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
        this.textureTopBot = null;
		
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

	this.initBot_Top = function(){
		var points = [];
		
		var i,x,y;
		for(i=0;(i< 2*Math.PI + delta);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
			
			points.push(x);
			points.push(y);
			points.push(0);

		}
		
		var matrix = mat4.create();
		mat4.identity(matrix);
		
		var top = new Fan(points, [0,0,0], matrix, this.material);
		var bot = new Fan(points, [0,0,0], matrix, this.material);
		
		top.initBuffers();
		bot.initBuffers();

		top.initTexture(this.textureTopBot);
		bot.initTexture(this.textureTopBot);
		
		this.topShape = new Shape(top,null);
		this.botShape = new Shape(bot,null);

		this.botShape.translate(0,0,height/2);
		this.topShape.translate(0,0,-height/2);		
		this.topShape.rotate(Math.PI,0,0);
	}	
		
	this.initBot_TopTexture = function(texture){
		this.textureTopBot = texture;
	}	
		
	this.generateVertex = function(radius,height,delta){	
		var i,x,y,cont=0;
		for(i=0;(i< 2*Math.PI + delta);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
	
			var posTop = [ x, y, height/2 ]; 
			var posBottom = [ x, y, -height/2 ]; 

			this.pos.push(posTop);
			this.pos.push(posBottom);							

			this.norm.push([x,y,0]);			
			this.norm.push([x,y,0]);						
			
			var a = Math.PI;
			this.text.push([i/a,0]);
			this.text.push([i/a,1]);

			this.index_buffer.push(cont++); 				
			this.index_buffer.push(cont++);				
		}
	}
	
        this.initBuffers = function(){
			this.generateVertex(this.radius,this.height,this.delta);
			this.initBot_Top();
		  
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
            var variables = {
                bufferPosition: this.webgl_position_buffer,
                bufferTextureCoord: this.webgl_texture_coord_buffer,
                bufferNormal: this.webgl_normal_buffer,
                texture: this.texture,
                matrixModel: modelMatrix,
                isWater: false,
                bufferIndex: this.webgl_index_buffer,
                typeDraw: gl.TRIANGLE_STRIP,
                material: this.material
            };
            
            program.setVariablesDifuso(variables);

			this.topShape.draw(modelMatrix);
			this.botShape.draw(modelMatrix);			
        }
    };