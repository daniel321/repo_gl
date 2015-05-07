
Box = function ( width, height, depth) {

	THREE.Geometry.call( this );
	this.type = 'Box';

	this.parameters = {
		width: width,
		height: height,
		depth: depth
	};
	
	var textures = [];
	var normals = [];
	var scope = this;
	generateShape();

	function addAllVertices(){
		// vertex
		var topLeftFront     = new THREE.Vector3( -width/2,  height/2, depth/2);
		var topRightFront    = new THREE.Vector3(  width/2,  height/2, depth/2);
		var bottomLeftFront  = new THREE.Vector3( -width/2, -height/2, depth/2);
		var bottomRightFront = new THREE.Vector3(  width/2, -height/2, depth/2);
		
		var topLeftBack     = new THREE.Vector3( -width/2,  height/2, -depth/2);
		var topRightBack    = new THREE.Vector3(  width/2,  height/2, -depth/2);
		var bottomLeftBack  = new THREE.Vector3( -width/2, -height/2, -depth/2);
		var bottomRightBack = new THREE.Vector3(  width/2, -height/2, -depth/2);
		
		scope.vertices.push(topLeftFront);
		scope.vertices.push(topRightFront);
		scope.vertices.push(bottomLeftFront);
		scope.vertices.push(bottomRightFront);
		
		scope.vertices.push(topLeftBack);
		scope.vertices.push(topRightBack);
		scope.vertices.push(bottomLeftBack);
		scope.vertices.push(bottomRightBack);
	}
	
	function generateShape(){
		addAllVertices();
			
		// normals
		var normalFront  = new THREE.Vector3(  0,  0,  1);
		var normalBack   = new THREE.Vector3(  0,  0, -1);
		var normalLeft   = new THREE.Vector3( -1,  0,  0);
		var normalRight  = new THREE.Vector3(  1,  0,  0);
		var normalTop    = new THREE.Vector3(  0,  1,  0);
		var normalBottom = new THREE.Vector3(  0, -1,  0);
		
		// texture coords
		var textureBotLeft  = new THREE.Vector2(  0,  0); 
		var textureTopLeft  = new THREE.Vector2(  0,  1); 
		var textureBotRight = new THREE.Vector2(  1,  0); 
		var textureTopRight = new THREE.Vector2(  1,  1); 
		
		addTriangle(0, 2, 1,textureTopLeft,textureBotLeft,textureTopRight,normalFront, 0);  	// front 
		addTriangle(3, 1, 2,textureTopRight,textureBotRight,textureBotLeft,normalFront, 0); 
		
		addTriangle(6, 4, 5,textureTopLeft,textureBotLeft,textureTopRight,normalBack, 1);  		// back 
		addTriangle(6, 5, 7,textureTopRight,textureBotRight,textureBotLeft,normalBack, 1); 

		addTriangle(0, 4, 2,textureTopLeft,textureBotLeft,textureTopRight,normalLeft, 2);  		// left 
		addTriangle(6, 2, 4,textureTopRight,textureBotRight,textureBotLeft,normalLeft, 2); 

		addTriangle(1, 3, 5,textureTopLeft,textureBotLeft,textureTopRight,normalRight, 3);  	// right 
		addTriangle(7, 5, 3,textureTopRight,textureBotRight,textureBotLeft,normalRight, 3); 
		
		addTriangle(0, 1, 4,textureTopLeft,textureBotLeft,textureTopRight,normalTop, 4);  		// top 
		addTriangle(5, 4, 1,textureTopRight,textureBotRight,textureBotLeft,normalTop, 4); 
		
		addTriangle(2, 6, 3,textureTopLeft,textureBotLeft,textureTopRight,normalBottom, 5);  	// bot
		addTriangle(7, 3, 6,textureTopRight,textureBotRight,textureBotLeft,normalBottom, 5); 
	}

	function addTriangle(index1,index2,index3,texture1,texture2,texture3,normal,materialIndex){
		var face = new THREE.Face3( index1, index2, index3 );
		face.normal.copy( normal );
		face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
		face.materialIndex = materialIndex;
		scope.faces.push( face );
		scope.faceVertexUvs[ 0 ].push( [ texture1, texture2, texture3 ] );
	}
	
	this.mergeVertices();
};

Box.prototype = Object.create( THREE.Geometry.prototype );
Box.prototype.constructor = Box;