
Arm = function ( scene, center, lenght, rad, texture) {
	this.type = 'Arm';
	
	this.parameters = {
		scene: scene,
		center: center,
		lenght: lenght,
		rad: rad,
		texture: texture
	};
	
	var scope = this;

	init();
	
	function init(){
		createParts();		
		groupParts();

		scope.joint1.rotation.y += Math.PI/2;

		scope.joint1.position.x += center[0];
		scope.joint1.position.y += center[1];
		scope.joint1.position.z += center[2];
	
		scope.arm1.position.z += lenght/2;

		scope.joint2.position.z += lenght/2;
	
		scope.arm2.position.z += lenght/2;

		scope.joint3.position.z += lenght/2;

		scope.finger1.rotation.z += Math.PI/4;
		scope.finger1.rotation.y -= Math.PI/2;	
		scope.finger1.position.z += rad/2;	
		scope.finger1.position.y += rad/3;

		scope.finger2.rotation.z += Math.PI/4;
		scope.finger2.rotation.y += Math.PI/2;	
		scope.finger2.position.z += rad/2;	
		scope.finger2.position.y -= rad/3;	

		scene.add( scope.joint1 );	
	}

	function createParts(){
		scope.joint1  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		scope.arm1    = new THREE.Mesh( new Cylinder( lenght, 0.25, 0.1), texture);
		scope.joint2  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		scope.arm2    = new THREE.Mesh( new Cylinder( lenght, 0.25, 0.1), texture);
		scope.joint3  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		scope.finger1 = new THREE.Mesh(new Box(2.5*rad,lenght/10,lenght/10), texture);
		scope.finger2 = new THREE.Mesh(new Box(2.5*rad,lenght/10,lenght/10), texture); 		
	}

	function groupParts(){
		scope.joint1.add( scope.arm1 );
		scope.arm1.add( scope.joint2 );
		scope.joint2.add( scope.arm2 );
		scope.arm2.add( scope.joint3 );
		scope.joint3.add( scope.finger1 );
		scope.joint3.add( scope.finger2 );
	}
};
