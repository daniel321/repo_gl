
Arm = function ( scene, center, lenght, rad, texture) {
	this.type = 'Arm';
	
	this.parameters = {
		scene: scene,
		center: center,
		lenght: lenght,
		rad: rad,
		texture: texture
	};
	
	var joint1,joint2,joint3;
	var arm1,arm2;
	var finger1,finger2;
	
	init();
	
	function init(){
		joint1  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		arm1    = new THREE.Mesh( new Cylinder( lenght, 0.25, 0.1), texture);
		joint2  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		arm2    = new THREE.Mesh( new Cylinder( lenght, 0.25, 0.1), texture);
		joint3  = new THREE.Mesh( new Sphere(rad,0.1), texture);
		finger1 = new THREE.Mesh(new Box(2.5*rad,lenght/10,lenght/10), texture);
		finger2 = new THREE.Mesh(new Box(2.5*rad,lenght/10,lenght/10), texture); 		

		joint1.rotation.y += Math.PI/2;
		translate(center[0],center[1],center[2]);
		scene.add(joint1);
		
		arm1.rotation.y += Math.PI/2;
		arm1.position.x += lenght/2;
		scene.add(arm1);

		joint2.rotation.y += Math.PI/2;
		joint2.position.x += lenght;	
		scene.add(joint2);

		arm2.rotation.y += Math.PI/2;
		arm2.position.x += lenght*(3/2);	
		scene.add(arm2);

		joint3.rotation.y += Math.PI/2;
		joint3.position.x += 2*lenght;		
		scene.add(joint3);

		finger1.rotation.y += Math.PI/2;
		finger1.rotation.z += Math.PI/4;
		finger1.rotation.y -= Math.PI/2;
		finger1.position.y += rad/3;	
		finger1.position.x += 2*lenght + rad/2;			
		scene.add(finger1);

		finger2.rotation.y += Math.PI/2;		
		finger2.rotation.z -= Math.PI/4;
		finger2.rotation.y -= Math.PI/2;
		finger2.position.y -= rad/3;			
		finger2.position.x += 2*lenght + rad/2;	
		scene.add(finger2);		
	}

	function translate(posX,posY,posZ){
		translateX(posX);
		translateY(posY);
		translateZ(posZ);
	}
	
	function translateX(pos){
		joint1.position.x += pos;
		arm1.position.x += pos;
		joint2.position.x += pos;
		arm2.position.x += pos;
		joint3.position.x += pos;
		finger1.position.x += pos;
		finger2.position.x += pos;		
	}

	function translateY(pos){
		joint1.position.y += pos;
		arm1.position.y += pos;
		joint2.position.y += pos;
		arm2.position.y += pos;
		joint3.position.y += pos;	
		finger1.position.y += pos;
		finger2.position.y += pos;			
	}
	
	function translateZ(pos){
		joint1.position.z += pos;
		arm1.position.z += pos;
		joint2.position.z += pos;
		arm2.position.z += pos;
		joint3.position.z += pos;	
		finger1.position.z += pos;
		finger2.position.z += pos;			
	}
};