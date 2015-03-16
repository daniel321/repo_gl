
Main = function (lock) {
	this.type = 'Main';

	var scene,camera,renderer;
	var WIDTH,HEIGHT;
	var lights,shapes;	

	var locked = false, mouseMoved = [0,0];

	var velLat = 0, velFw = 0, vel = 0.1;
	var velRotX = 0.02,velRotY = 0.02;
	var keyboard = 0;
	var timer,REFRESH_TIME = 500;


	run();
	
	function run(){
		initScene();
		initLights();			
		initShapes();
		setUpListeners();				
		render();
	}

	// ------------------------------- INIT -----------------------------------------------

	function updateWindowSize(){
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;
	}

	function initScene(){
		scene = new THREE.Scene();

		updateWindowSize();
		camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000);
		camera.position.z = 5;
				
		renderer = new THREE.WebGLRenderer();			
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		
	}
	
	function initLights(){
		lights = [];

		var pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = 25;
		pointLight.position.y = 55;
		pointLight.position.z = 50;

		lights.push(pointLight);
		scene.add(pointLight);
	}
	
	function initShapes(){
		shapes = [];

		var cube = new THREE.Mesh(new Box(2,2,2), repeatTexture('images/crate.jpg',1,1));
		shapes.push(cube);
		scene.add(cube);

		var sphere = new THREE.Mesh( new Sphere(2,0.1), repeatTexture('images/water.jpg',2,2));
		shapes.push(sphere);
		scene.add(sphere);
				
		var cylinder = new THREE.Mesh( new Cylinder( 2, 1, 0.1), repeatTexture('images/wall.jpg',2,2) );
		shapes.push(cylinder);
		scene.add( cylinder );      

		var flooor = new THREE.Mesh(new Floor(200,200), repeatTexture('images/floor.bmp',20,20));
		shapes.push(flooor);
		scene.add(flooor);
	}
	
	function repeatTexture(path,x,y){
		var texture = THREE.ImageUtils.loadTexture( path );
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( x, y );											
		return new THREE.MeshPhongMaterial( { map: texture } );
	}

	// ------------------------------- RENDER / ANIMATION -----------------------------------------------

	function render(){
		requestAnimationFrame(render);
		animate();			
		renderer.render(scene,camera);

		listenKeyboard();
	};
	
	function animate(){
		animateShapes();
		updateCamera();
	}

	function animateShapes(){
		shapes[0].position.z = -1;
		shapes[0].rotation.x += 0.01;	
		shapes[0].rotation.y += 0.01;
		shapes[0].rotation.z += 0.01;

		shapes[1].position.x = 4;
		shapes[1].position.z = -2;
		shapes[1].rotation.x += 0.01;	
		shapes[1].rotation.y += 0.01;	
		shapes[1].rotation.z += 0.01;	

		shapes[2].position.x = -4;
		shapes[2].position.z = -3;					
		shapes[2].rotation.x += 0.01;	
		shapes[2].rotation.y += 0.01;	
		shapes[2].rotation.z += 0.01;

		shapes[3].position.y = -2;
	}

	function updateCamera(){			
		var movDir = new THREE.Vector3( 0, 0, -1 );		
		movDir.applyQuaternion(camera.quaternion).normalize();

		var latDir = new THREE.Vector3();			
		latDir.crossVectors( movDir, camera.up );

		camera.position.x += (movDir.x*velFw) + (latDir.x*velLat);
		camera.position.y += (movDir.y*velFw) + (latDir.y*velLat);
		camera.position.z += (movDir.z*velFw) + (latDir.z*velLat);

		var lookDown = (camera.rotation.x >= -(Math.PI/3) && mouseMoved[1] > 0);
		var lookUp   = (camera.rotation.x <=  (Math.PI/3) && mouseMoved[1] < 0);

		if(lookDown || lookUp) 
			camera.rotation.x -= mouseMoved[1]; 

		camera.rotation.y -= mouseMoved[0]; 
	}

	// ------------------------------- LISTENERS -----------------------------------------------

	function setUpListeners(){
		window.addEventListener( 'resize', onWindowResize, false );

		window.addEventListener('pointerlockchange', pointerlockchange, false);
		window.addEventListener('mozpointerlockchange', pointerlockchange, false);
		window.addEventListener('webkitpointerlockchange', pointerlockchange, false);
	}

	function pointerlockchange() {
		locked = !locked;

		if (locked){
    			window.addEventListener( 'mousemove', onMouseMove, false );
			timer = setInterval(function () { myTimer() }, REFRESH_TIME);
			keyboard = new THREEx.KeyboardState();
  		}else{ 
    			window.removeEventListener( 'mousemove', onMouseMove, false );
			window.clearInterval(timer);
			keyboard.destroy();
			keyboard = 0;
		}
	}

	function myTimer() {
	    mouseMoved = [0,0];
	}

	function listenKeyboard(){
		if (keyboard != 0){
			if( keyboard.pressed("A") || keyboard.pressed("a") )   
				velLat = -vel;			
			else if( keyboard.pressed("D") || keyboard.pressed("D") )   
				velLat = vel;			

			else if( keyboard.pressed("W") || keyboard.pressed("w") )   
				velFw = vel;			
			else if( keyboard.pressed("S") || keyboard.pressed("s") )   
				velFw = -vel;		

			else
				velFw = velLat = 0;	
		}
	}

	function onWindowResize(event) {
		updateWindowSize();
		renderer.setSize( WIDTH, HEIGHT );
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
		camera.setViewOffset( WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT );

		renderer.setSize( WIDTH, HEIGHT );
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
		camera.setViewOffset( WIDTH, HEIGHT, 1, 0, WIDTH, HEIGHT );
	}

	function onMouseMove(e) {
  		mouseMoved[0] = e.movementX       ||
                  		e.mozMovementX    ||
                  		e.webkitMovementX ||
                  		0;

      		mouseMoved[1] = e.movementY       ||
                  		e.mozMovementY    ||
                  		e.webkitMovementY ||
                  		0;

		
		if(mouseMoved[0] > 0)
			mouseMoved[0] = velRotX;
		else if(mouseMoved[0] < 0)
			mouseMoved[0] = -velRotX;

		if(mouseMoved[1] > 0)
			mouseMoved[1] = velRotY;
		if(mouseMoved[1] < 0)
			mouseMoved[1] = -velRotY;
	}
};
