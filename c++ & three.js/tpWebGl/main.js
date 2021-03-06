
Main = function (lock) {
	this.type = 'Main';

	var scene,camera,renderer;
	var WIDTH,HEIGHT;
	var lights,shapes;	

	var locked = false;
	var controlsObj;
	
	var rotX1 = 0,rotY1 = 0,rotZ1 = 0;
	var rotX2 = 0,rotY2 = 0,rotZ2 = 0;
	var rotX3 = 0,rotY3 = 0,rotZ3 = 0;
	var dAng = 0.01;
	
	var velLat = 0, velFw = 0, vel = 0.1;
	var keyboard = 0, controls = 0;
	var timer,REFRESH_TIME = 500;


	run();
	
	function run(){
		initScene();
		initLights();			
		initShapes();
		setUpListeners();	
		
		setCameraPosition(0,0,2);
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
		
		var arm = new Arm(scene,[-2,0,1],2.5,0.4,repeatTexture('images/wall.jpg',2,2));
		shapes.push(arm);
	}
	
	function repeatTexture(path,x,y){
		var texture = THREE.ImageUtils.loadTexture( path );
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( x, y );											
		return new THREE.MeshPhongMaterial( { map: texture } );
	}

	function setCameraPosition(x,y,z){
		controlsObj = controls.getObject();
		controlsObj.position.x = x;
		controlsObj.position.y = y;
		controlsObj.position.z = z;
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

	var cont = 0;
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

		shapes[4].joint1.rotation.x += rotX1;
		shapes[4].joint1.rotation.y += rotY1;
		shapes[4].joint1.rotation.z += rotZ1;

		shapes[4].joint2.rotation.x += rotX2;
		shapes[4].joint2.rotation.y += rotY2;
		shapes[4].joint2.rotation.z += rotZ2;

		shapes[4].joint3.rotation.x += rotX3;
		shapes[4].joint3.rotation.y += rotY3;
		shapes[4].joint3.rotation.z += rotZ3;
	}

	function updateCamera(){	
		var controlsObj = controls.getObject();
	
		var movDir = controls.getDirection();
		var latDir = new THREE.Vector3();			
		latDir.crossVectors( movDir, controlsObj.up );

		controlsObj.position.x += (movDir.x*velFw) + (latDir.x*velLat);
		controlsObj.position.y += (movDir.y*velFw) + (latDir.y*velLat);
		controlsObj.position.z += (movDir.z*velFw) + (latDir.z*velLat);
		
	}

	// ------------------------------- LISTENERS -----------------------------------------------

	function setUpListeners(){
		controls = new THREE.PointerLockControls(camera);
		scene.add( controls.getObject() );
					
		window.addEventListener( 'resize', onWindowResize, false );

		window.addEventListener('pointerlockchange', pointerlockchange, false);
		window.addEventListener('mozpointerlockchange', pointerlockchange, false);
		window.addEventListener('webkitpointerlockchange', pointerlockchange, false);
	}

	function pointerlockchange() {
		locked = !locked;

		if (locked){
			controls.enabled = true;
			keyboard = new THREEx.KeyboardState();
  		}else{ 		
			controls.enabled = false;
			keyboard.destroy();
			keyboard = 0;
		}
	}

	function listenKeyboard(){
		if (keyboard != 0){

			// ------------------ move ......------------------ 
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

			// ------------------ rotate arm ------------------ 
			if( keyboard.pressed("1") )   
				rotX1 += dAng;
			else if( keyboard.pressed("2"))   
				rotY1 += dAng;
			else if( keyboard.pressed("3"))   
				rotZ1 += dAng;
			else
				rotX1 = rotY1 = rotZ1 = 0;

			if( keyboard.pressed("4") )   
				rotX2 += dAng;
			else if( keyboard.pressed("5"))   
				rotY2 += dAng;
			else if( keyboard.pressed("6"))   
				rotZ2 += dAng;
			else
				rotX2 = rotY2 = rotZ2 = 0;

			if( keyboard.pressed("7") )   
				rotX3 += dAng;
			else if( keyboard.pressed("8"))   
				rotY3 += dAng;
			else if( keyboard.pressed("9"))   
				rotZ3 += dAng;
			else
				rotX3 = rotY3 = rotZ3 = 0;
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
};
