PlaneWindow = function (positions, material){
    this.material = material;

    this.position_buffer = positions;
    this.normal_buffer = null;
    this.texture_coord_buffer = [];
    this.index_buffer = [];
    this.tangente_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_index_buffer = null;
    this.webgl_tangente_buffer = null;

    this.texture = null;
    this.normalMap = null;

    this.initTexture = function(texture_file){
        this.texture = initThisTexture(texture_file);
    }

    this.initNormalMap = function(texture){
        this.normalMap = texture;
    }

    this.setNormal = function(normal) {
        this.normal_buffer = [];

        for (var i = 0; i < this.position_buffer.length; i = i+3) {
            this.normal_buffer.push(normal[0]);
            this.normal_buffer.push(normal[1]);
            this.normal_buffer.push(normal[2]);
        }
    }
    
    this.setTangente = function(tangente) {
        this.tangente_buffer = [];

        for (var i = 0; i < this.position_buffer.length; i = i+3) {
            this.tangente_buffer.push(tangente[0]);
            this.tangente_buffer.push(tangente[1]);
            this.tangente_buffer.push(tangente[2]);
        }
    }

    this.setVertices = function(){	

        if (this.normal_buffer == null) {
            this.normal_buffer = [];
            for (var i = 0; i < this.position_buffer.length; i = i+3) {
                this.normal_buffer.push(0.0);
                this.normal_buffer.push(0.0);
                this.normal_buffer.push(-1.0);
            }
        }
        
        if (this.tangente_buffer == null) {
            this.tangente_buffer = [];
            for (var i = 0; i < this.position_buffer.length; i = i+3) {
                this.tangente_buffer.push(-1.0);
                this.tangente_buffer.push(0.0);
                this.tangente_buffer.push(0.0);
            }
        }

        for (var i = 0; i < this.position_buffer.length; i = i+3) {
            this.texture_coord_buffer.push(this.position_buffer[i]);
            this.texture_coord_buffer.push(this.position_buffer[i+1]);
        }

        //VECTOR = {A,B,C,F,C,D,I,G,J,H,F,E}
        //VECTOR = {0,1,2,5,2,3,8,6,9,7,5,4}
        this.index_buffer.push(0);
        this.index_buffer.push(1);
        this.index_buffer.push(2);
        this.index_buffer.push(5);
        this.index_buffer.push(2);
        this.index_buffer.push(3);
        this.index_buffer.push(8);
        this.index_buffer.push(6);
        this.index_buffer.push(9);
        this.index_buffer.push(7);
        this.index_buffer.push(5);
        this.index_buffer.push(4);
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
            withNormalMap: true,
            withReflexion: true,
            bufferIndex: this.webgl_index_buffer,
            typeDraw: gl.TRIANGLE_STRIP,
            material: this.material
        };

        program.setVariables(variables);
    }
};