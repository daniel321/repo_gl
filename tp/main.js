Main = function (lock) {
    var gl;
    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
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

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    var shaderProgram;

       function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
        shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
    }

    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

	var currentlyPressedKeys = {};
	
	var all = null;
	var bckShape = null;
	var floorShape = null;
	
    var bck = null;
	var floor = null;
	var crane = null;
	
	var camera = null;
	
    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

    function setViewProjectionMatrix() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, camera.getMatrix());        
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

	function sourceUniform(){
		gl.uniform3f(shaderProgram.ambientColorUniform, 1.0, 1.0, 1.0 );
	}

	function objectUniform(){
        gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
        gl.uniform3f(shaderProgram.directionalColorUniform, 0.2, 0.2, 0.2);
	}	
	
    function drawScene() {
	
		// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda 
		// el área disponible
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		
		// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Se configura la matriz de proyección
        mat4.perspective(pMatrix, -30, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

        /////////////////////////////////////////////////////
        // Configuración de la luz
        // Se inicializan las variables asociadas con la Iluminación
        var lighting;
        lighting = true;
        gl.uniform1i(shaderProgram.useLightingUniform, lighting);       
        var lightPosition = [0.0,0.0, 0.0];
        vec3.transformMat4(lightPosition, lightPosition, camera.getMatrix());
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);       	
		
        /////////////////////////////////////////////////////
		// Definimos la ubicación de la camara
		// Pensamos por el momento sunamente la posición de la cámara, la cual siempre mira al sun.
		var matriz_camara = camera.getMatrix();
		
        setViewProjectionMatrix();
		
		var identity = mat4.create();
		mat4.identity(identity);
	    all.draw(identity);
    }
	
	function handleKeys(event){ 		
		if( currentlyPressedKeys["1".charCodeAt(0)]){
			camera.Pitch(0.01);
		}
		if( currentlyPressedKeys["2".charCodeAt(0)]){
			camera.Pitch(-0.01);
		}	

		if( currentlyPressedKeys["3".charCodeAt(0)]){
			camera.Yaw(0.01);
		}
		if( currentlyPressedKeys["4".charCodeAt(0)]){
			camera.Yaw(-0.01);
		}
		
		if( currentlyPressedKeys["q".charCodeAt(0)] || currentlyPressedKeys["Q".charCodeAt(0)]){
			camera.Down(0.1);
		}
		if( currentlyPressedKeys["e".charCodeAt(0)] || currentlyPressedKeys["E".charCodeAt(0)]){
			camera.Up(0.1);
		}
		
		if( currentlyPressedKeys["s".charCodeAt(0)] || currentlyPressedKeys["S".charCodeAt(0)]){
			camera.Forward(0.1);
		}
		if( currentlyPressedKeys["w".charCodeAt(0)] || currentlyPressedKeys["W".charCodeAt(0)]){
			camera.Backwards(0.1);
		}
	
		if( currentlyPressedKeys["a".charCodeAt(0)] || currentlyPressedKeys["A".charCodeAt(0)]){
			camera.Left(0.1);
		}		
		if( currentlyPressedKeys["d".charCodeAt(0)] || currentlyPressedKeys["D".charCodeAt(0)]){
			camera.Right(0.1);
		}
	

		
		if( currentlyPressedKeys["i".charCodeAt(0)] || currentlyPressedKeys["I".charCodeAt(0)]){
			crane.moveCrane(-0.1);
		}	
		if( currentlyPressedKeys["k".charCodeAt(0)] || currentlyPressedKeys["K".charCodeAt(0)]){
			crane.moveCrane(0.1);
		}
		
		if( currentlyPressedKeys["j".charCodeAt(0)] || currentlyPressedKeys["J".charCodeAt(0)]){
			crane.moveMover(-0.1);
		}		
		if( currentlyPressedKeys["l".charCodeAt(0)] || currentlyPressedKeys["L".charCodeAt(0)]){
			crane.moveMover(0.1);
		}	
		
		if( currentlyPressedKeys["u".charCodeAt(0)] || currentlyPressedKeys["U".charCodeAt(0)]){
			crane.moveCargo(0.1);
		}				
		if( currentlyPressedKeys["o".charCodeAt(0)] || currentlyPressedKeys["O".charCodeAt(0)]){
			crane.moveCargo(-0.1);
		}		
		
		if( currentlyPressedKeys["9".charCodeAt(0)]){
			crane.releaseCargo();
		}		
		if( currentlyPressedKeys["0".charCodeAt(0)] ){
			crane.attachCargo();
		}			
	}
	
    function tick() {
        requestAnimFrame(tick);
		
		bckShape.rotate(0,0.001,0);
		
		handleKeys();
        drawScene();
    }

	function handleKeyDown(event){
		currentlyPressedKeys[event.keyCode] = true;
	}
	
	function handleKeyUp(event) {
		currentlyPressedKeys[event.keyCode] = false;
	}
	
    function webGLStart() {
        var canvas = document.getElementById("tp");
        initGL(canvas);
        initShaders();
		
		all = new ShapeGroup();
	
		//--------------------bck---------------------------
		bck = new Background(64, 64);
        bck.initTexture("sky.jpg");	
		
		bckShape = new Shape(bck,sourceUniform);
		bckShape.scale(40.0, 15.0, 40.0);

		all.add(bckShape);
		//--------------------------------------------------

		//--------------------floor---------------------------
		floor = new Floor(40, 40);
        floor.initTexture("floor.bmp");	
		
		floorShape = new Shape(floor,sourceUniform);
		floorShape.translate(0, -5 , 0);
		
		all.add(floorShape);
		//--------------------------------------------------

		
		//-----------------crane------------------------------
		crane = new Crane(objectUniform,6);
	    crane.initTexture("crane.jpg");
		crane.initTextureCargo("cargo.jpg");
		
		all.add(crane);
		//--------------------------------------------------
	
		all.initBuffers();
	
		crane.translate(0, -2 , 0);
	
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

		camera = new FreeCamera([0, 0, 30],[0,0,1],[0,1,0]);
		
        tick();
    }
};