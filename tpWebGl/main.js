
Main = function () {
	this.type = 'Main';
	var scene,camera,renderer;
	var lights,shapes;
	
	run();
	
	function run(){
		initScene();
		initLights();			
		initShapes();				
		render();
	}
	
	function initScene(){
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;
				
		renderer = new THREE.WebGLRenderer();			
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		
	}
	
	function initLights(){
		lights = [];
		
		pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;
		
		lights.push(pointLight);
		scene.add(pointLight);
	}
	
	function initShapes(){
		shapes = [];
/*
		var cube = new THREE.Mesh(new Box(1,1,1), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/crate.jpg')}));
		shapes.push(cube);
		scene.add(cube);
*/
/*		var sphere = new THREE.Mesh( new Sphere(2,0.05), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/water.jpg')}));
		shapes.push(sphere);
		scene.add(sphere);
*/				
		var cylinder = new THREE.Mesh( new Cylinder( 2, 1, 0.05), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/wall.jpg')}));
		shapes.push(cylinder);
		scene.add(cylinder);	
	}
	
	function render(){
		requestAnimationFrame(render);
		animate();			
		renderer.render(scene,camera);
	};
	
	function animate(){
		shapes[0].rotation.x += 0.01;	
		shapes[0].rotation.y += 0.01;
		shapes[0].rotation.z += 0.01;

/*		shapes[1].rotation.x += 0.01;	
		shapes[1].rotation.y += 0.01;	
		shapes[1].rotation.z += 0.01;	
*/					
/*		shapes[2].rotation.x += 0.01;	
		shapes[2].rotation.y += 0.01;	
		shapes[2].rotation.z += 0.01;
*/	}
};