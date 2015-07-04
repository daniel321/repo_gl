Fan = function (points, center, matrix, material, conditionShader){
    this.points = points;
    this.center = center;
    this.matrix = matrix;

    this.position_buffer = [];
    this.normal_buffer = [];
    this.texture_coord_buffer = [];
    this.index_buffer = [];
    this.tangente_buffer = [];

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_index_buffer = null;
    this.webgl_tangente_buffer = null;

    this.texture = null;
    this.normalMap = null;
    this.material = material;
    this.withNormalMap = conditionShader.useNormalMap;
    this.withReflexion = conditionShader.useReflexion;

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

    this.setVertices = function(){				
	var utils = new VectorUtils();

        var center = this.center;
        vec3.transformMat4(center,center,matrix);
        this.position_buffer.push(this.center[0]);
        this.position_buffer.push(this.center[1]);
        this.position_buffer.push(this.center[2]);

        this.texture_coord_buffer.push(0.5);
        this.texture_coord_buffer.push(0.5);

	    this.normal_buffer.push(0.0);
	    this.normal_buffer.push(0.0);
	    this.normal_buffer.push(1.0);

        this.tangente_buffer.push(1.0);
        this.tangente_buffer.push(0.0);
        this.tangente_buffer.push(0.0);

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

            var textCoord = utils.normalize(utils.difference(point,center));
            this.texture_coord_buffer.push( textCoord[0] );	
            this.texture_coord_buffer.push( textCoord[1] );
        }

       for (var y=0; y < numPoints-3 ; y+=3){
            var point = [this.points[y],this.points[y+1],this.points[y+2]];
            var sig = [this.points[y+3],this.points[y+4],this.points[y+5]];

            vec3.transformMat4(point,point,matrix);
	    vec3.transformMat4(sig,sig,matrix);

	    var tg = utils.normalize(utils.difference(sig,point));
	    var bin = utils.normalize(utils.difference(center,point));
	    var norm = utils.normalize(utils.cross(tg,bin));

	    if (norm[0] == 0 || norm[1] == 0) {
	  	 var a = this.normal_buffer[this.normal_buffer.length-3];
	  	 var b = this.normal_buffer[this.normal_buffer.length-2];
	  	 var c = this.normal_buffer[this.normal_buffer.length-1];

	   	 this.normal_buffer.push(a);
	   	 this.normal_buffer.push(b);
	   	 this.normal_buffer.push(c);

	  	 a = this.tangente_buffer[this.tangente_buffer.length-3];
	  	 b = this.tangente_buffer[this.tangente_buffer.length-2];
	  	 c = this.tangente_buffer[this.tangente_buffer.length-1];

          	 this.tangente_buffer.push(a);
           	 this.tangente_buffer.push(b);
            	 this.tangente_buffer.push(c);
	    } else {
	    	this.normal_buffer.push(norm[0]);
	    	this.normal_buffer.push(norm[1]);
	    	this.normal_buffer.push(norm[2]);

            	this.tangente_buffer.push(tg[0]);
            	this.tangente_buffer.push(tg[1]);
	        this.tangente_buffer.push(tg[2]);
	    }
        }

	    	this.normal_buffer.push(this.normal_buffer[0]);
	    	this.normal_buffer.push(this.normal_buffer[1]);
	    	this.normal_buffer.push(this.normal_buffer[2]);

            	this.tangente_buffer.push(this.tangente_buffer[0]);
            	this.tangente_buffer.push(this.tangente_buffer[1]);
	        this.tangente_buffer.push(this.tangente_buffer[2]);
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
            typeDraw: gl.TRIANGLE_FAN,
            material: this.material
        };

        program.setVariables(variables);
    }
};
