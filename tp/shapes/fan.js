Fan = function (points, center, matrix, material, conditionShader, proyTexture){
    this.points = points;
    this.centerPoint = center.point;
    this.centerNormal = center.normal;
    this.centerTangente = center.tangente;
    this.matrix = matrix;
    
    this.proyTexture = proyTexture;

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
        this.texture = initThisTexture(texture_file);
    }

    this.initNormalMap = function(texture){
        this.normalMap = texture;
    }

    this.setVertices = function(){				
        var utils = new VectorUtils();

        var center = this.centerPoint;
        vec3.transformMat4(center,center,matrix);
        this.position_buffer.push(center[0]);
        this.position_buffer.push(center[1]);
        this.position_buffer.push(center[2]);

        this.texture_coord_buffer.push(0.5);
        this.texture_coord_buffer.push(0.5);

        this.normal_buffer.push(this.centerNormal[0]);
        this.normal_buffer.push(this.centerNormal[1]);
        this.normal_buffer.push(this.centerNormal[2]);

        this.tangente_buffer.push(this.centerTangente[0]);
        this.tangente_buffer.push(this.centerTangente[1]);
        this.tangente_buffer.push(this.centerTangente[2]);

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

            this.normal_buffer.push(this.centerNormal[0]);
            this.normal_buffer.push(this.centerNormal[1]);
            this.normal_buffer.push(this.centerNormal[2]);

            this.tangente_buffer.push(this.centerTangente[0]);
            this.tangente_buffer.push(this.centerTangente[1]);
            this.tangente_buffer.push(this.centerTangente[2]);
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
            proyTexture: this.proyTexture,
            withNormalMap: this.withNormalMap,
            withReflexion: this.withReflexion,
            bufferIndex: this.webgl_index_buffer,
            typeDraw: gl.TRIANGLE_FAN,
            material: this.material
        };

        program.setVariables(variables);
    }
};
