TexturedSphere = function (latitude_bands, longitude_bands, material, isLightCrane){

    this.latitudeBands = latitude_bands;
    this.longitudeBands = longitude_bands;
    this.material = material;
    this.isLightCrane = isLightCrane;

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

    this.initTexture = function(texture_file){
        this.texture = initThisTexture(texture_file);
    }

    // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
    // Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
    // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices 
    // a todos los triángulos de la esfera
    this.initBuffers = function(){

        this.position_buffer = [];
        this.normal_buffer = [];
        this.texture_coord_buffer = [];
        this.tangente_buffer = [];

        var latNumber;
        var longNumber;

        for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / this.latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1.0 - (longNumber / this.longitudeBands);
                var v = 1.0 - (latNumber / this.latitudeBands);

                this.normal_buffer.push(x);
                this.normal_buffer.push(y);
                this.normal_buffer.push(z);

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);

                this.position_buffer.push(x);
                this.position_buffer.push(y);
                this.position_buffer.push(z);

                //Basura, no se usa
                this.tangente_buffer.push(x);
                this.tangente_buffer.push(y);
                this.tangente_buffer.push(z);
            }
        }

        // Buffer de indices de los triangulos
        this.index_buffer = [];

        for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
            for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
                var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                var second = first + this.longitudeBands + 1;
                this.index_buffer.push(first);
                this.index_buffer.push(second);
                this.index_buffer.push(first + 1);

                this.index_buffer.push(second);
                this.index_buffer.push(second + 1);
                this.index_buffer.push(first + 1);
            }
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
            matrixModel: modelMatrix,
            isWater: false,
            proyTexture: false,
            withNormalMap: false,
            withReflexion: true,
            bufferIndex: this.webgl_index_buffer,
            typeDraw: gl.TRIANGLES,
            material: this.material
        };

        program.setVariables(variables);

        if (this.isLightCrane) {
            var lightPosition = [0.0, 0.0, 0.0];
            vec3.transformMat4(lightPosition, lightPosition, modelMatrix);
            gl.uniform3fv(shaderProgram.lightPosition0, lightPosition);
        }
    }
};