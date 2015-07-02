Plane = function (width, height, cols, rows, isWater, material){
    this.width = width;
    this.height = height;

    this.cols = cols;
    this.rows = rows;
    
    this.material = material;

    this.position_buffer = null;
    this.normal_buffer = null;
    this.texture_coord_buffer = null;
    this.index_buffer = [];

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;
    this.isWater = isWater;

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

    this.setNormal = function(normal) {
        this.normal_buffer = [];
            
        for (var i = 0.0; i < this.rows; i++) { 
            for (var j = 0.0; j < this.cols; j++) {
                this.normal_buffer.push(normal[0]);
                this.normal_buffer.push(normal[1]);
                this.normal_buffer.push(normal[2]);
            }
        }
    }
    
    this.setVertices = function(width, height){

        var incW = width/(this.cols-1);
        var incH = height/(this.rows-1);

        this.position_buffer = [];
        this.texture_coord_buffer = [];

        for (var i = 0.0; i < this.rows; i++) { 
            for (var j = 0.0; j < this.cols; j++) {

                // Para cada vertice definimos su posicion
                // como coordenada (x, y, z=0)
                this.position_buffer.push(j * incW);
                this.position_buffer.push(i * incH);
                this.position_buffer.push(0);
                
                this.texture_coord_buffer.push(j);
                this.texture_coord_buffer.push(i);
            }
        }
        
        if (this.normal_buffer == null) {
            this.normal_buffer = [];
            
            for (var i = 0.0; i < this.rows; i++) { 
                for (var j = 0.0; j < this.cols; j++) {
                    this.normal_buffer.push(0.0);
                    this.normal_buffer.push(0.0);
                    this.normal_buffer.push(-1.0);
                }
            }
        }
        
        this.index_buffer = [];
        for (var i = 0; i < (this.rows-1); i++) { 

            for (var j = 0; j < this.cols; j++) {
                this.index_buffer.push((this.cols * i) + j);
                this.index_buffer.push((this.cols * (i+1)) + j);
            }

            //Verifico si debo degenerar el index para hacer la siguiente "banda"
            if ((i+2) < this.rows) {
                this.index_buffer.push(this.index_buffer[this.index_buffer.length-1]);
                this.index_buffer.push(this.cols * (i+1));
            }
        }
    }


    this.initBuffers = function(){
        this.setVertices(this.width, this.height);

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
            isWater: this.isWater,
            bufferIndex: this.webgl_index_buffer,
            typeDraw: gl.TRIANGLE_STRIP,
            material: this.material
        };

        program.setVariablesDifuso(variables);
    }
};