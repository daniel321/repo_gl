Program = function (gl, idVertex, idFragment) {
    this.gl = gl;
    this.idVertex = idVertex;
    this.idFragment = idFragment;

    this.program = null;

    this.getProgram = function() {
        return this.program;
    }

    this.initShaders = function() {        
        var vertexShader = this.getShader(this.idVertex, this.gl.VERTEX_SHADER);
        var fragmentShader = this.getShader(this.idFragment, this.gl.FRAGMENT_SHADER);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    }

    this.getShader = function(id, type) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    this.setVariables = function(variables) {
         this.gl.useProgram(this.program);

        // Se configuran los buffers que alimentarán el pipeline
        this.gl.bindBuffer(gl.ARRAY_BUFFER, variables.bufferPosition);
        this.gl.vertexAttribPointer(this.program.vertexPositionAttribute, variables.bufferPosition.itemSize, gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(gl.ARRAY_BUFFER, variables.bufferTextureCoord);
        this.gl.vertexAttribPointer(this.program.textureCoordAttribute, variables.bufferTextureCoord.itemSize, gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(gl.ARRAY_BUFFER, variables.bufferNormal);
        this.gl.vertexAttribPointer(this.program.vertexNormalAttribute, variables.bufferNormal.itemSize, gl.FLOAT, false, 0, 0);
        
        this.gl.bindBuffer(gl.ARRAY_BUFFER, variables.bufferTangente);
        this.gl.vertexAttribPointer(this.program.vertexTangenteAttribute, variables.bufferTangente.itemSize, gl.FLOAT, false, 0, 0);
        
        if (variables.withNormalMap) {
            this.gl.activeTexture(this.gl.TEXTURE1);
            this.gl.bindTexture(this.gl.TEXTURE_2D, variables.normalMap);
            this.gl.uniform1i(this.program.textureNormalMap, 1);
        }
        
        if (variables.withReflexion) {
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, textureReflexion);
            gl.uniform1i(shaderProgram.textureReflexion, 2);
        }
            
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, variables.texture);
        this.gl.uniform1i(this.program.samplerUniform, 0);

        this.gl.uniformMatrix4fv(this.program.ModelMatrixUniform, false, variables.matrixModel);

        var normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, variables.matrixModel);
        mat3.transpose(normalMatrix, normalMatrix);
        this.gl.uniformMatrix3fv(this.program.nMatrixUniform, false, normalMatrix);

        this.gl.uniform1i(this.program.isWater, variables.isWater);
        this.gl.uniform1i(this.program.withNormalMap, variables.withNormalMap);
        this.gl.uniform1i(this.program.withReflexion, variables.withReflexion);

        this.gl.uniform3f(this.program.materialKa, variables.material.ka[0], variables.material.ka[1], variables.material.ka[2]);
        this.gl.uniform3f(this.program.materialKd, variables.material.kd[0], variables.material.kd[1], variables.material.kd[2]);
        this.gl.uniform3f(this.program.materialKs, variables.material.ks[0], variables.material.ks[1], variables.material.ks[2]);
        this.gl.uniform1f(this.program.materialShininess, variables.material.shininess);

        this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, variables.bufferIndex);
        this.gl.drawElements(variables.typeDraw, variables.bufferIndex.numItems, gl.UNSIGNED_SHORT, 0);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
    
    this.definitionVariables = function() {
        this.gl.useProgram(this.program);

        this.program.vertexPositionAttribute = this.gl.getAttribLocation(this.program, "aVertexPosition");
        this.gl.enableVertexAttribArray(this.program.vertexPositionAttribute);

        this.program.vertexNormalAttribute = this.gl.getAttribLocation(this.program, "aVertexNormal");
        this.gl.enableVertexAttribArray(this.program.vertexNormalAttribute);

        this.program.textureCoordAttribute = this.gl.getAttribLocation(this.program, "aTextureCoord");
        this.gl.enableVertexAttribArray(this.program.textureCoordAttribute);
        
        this.program.vertexTangenteAttribute = this.gl.getAttribLocation(this.program, "aVertexTangente");
        this.gl.enableVertexAttribArray(this.program.vertexTangenteAttribute);

        this.program.ModelMatrixUniform = this.gl.getUniformLocation(this.program, "uModelMatrix");
        this.program.ViewMatrixUniform = this.gl.getUniformLocation(this.program, "uViewMatrix");
        this.program.pMatrixUniform = this.gl.getUniformLocation(this.program, "uPMatrix");
        this.program.nMatrixUniform = this.gl.getUniformLocation(this.program, "uNMatrix");

        this.program.samplerUniform = this.gl.getUniformLocation(this.program, "uSampler");
        
        this.program.textureReflexion = this.gl.getUniformLocation(this.program, "uReflTexture");
        this.program.withReflexion = this.gl.getUniformLocation(this.program, "uWithReflexion");
        
        this.program.utick = this.gl.getUniformLocation(this.program, "utick");
        this.program.isWater = this.gl.getUniformLocation(this.program, "isWater");
        
        this.program.textureNormalMap = this.gl.getUniformLocation(this.program, "uNormalMapTexture");
        this.program.withNormalMap = this.gl.getUniformLocation(this.program, "uWithNormalMap");

        this.program.cameraPosition = this.gl.getUniformLocation(this.program, "uCameraPosition");
        
        this.program.lightColor = this.gl.getUniformLocation(this.program, "uLightColor");

        this.program.lightPosition0 = this.gl.getUniformLocation(this.program, "lights[0]");
        this.program.lightPosition1 = this.gl.getUniformLocation(this.program, "lights[1]");
        this.program.lightPosition2 = this.gl.getUniformLocation(this.program, "lights[2]");

        this.program.materialKa = this.gl.getUniformLocation(this.program, "material.Ka");
        this.program.materialKd = this.gl.getUniformLocation(this.program, "material.Kd");
        this.program.materialKs = this.gl.getUniformLocation(this.program, "material.Ks");
        this.program.materialShininess = this.gl.getUniformLocation(this.program, "material.Shininess");

    }
}