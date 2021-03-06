
Floor = function ( width, depth) {

	THREE.Geometry.call( this );
	this.type = 'Floor';

	this.parameters = {
		width: width,
		depth: depth
	};
	
	var textures = [];
	var normals = [];
	var scope = this;

	generateShape();

	function generateShape(){
		// vertex
		var leftFront  = new THREE.Vector3( -width/2, 0,  depth/2);
		var rightFront = new THREE.Vector3(  width/2, 0,  depth/2);
		var leftBack   = new THREE.Vector3( -width/2, 0, -depth/2);
		var rightBack  = new THREE.Vector3(  width/2, 0, -depth/2);
		
		scope.vertices.push(leftFront);
		scope.vertices.push(rightFront);
		scope.vertices.push(leftBack);
		scope.vertices.push(rightBack);


		var normal = new THREE.Vector3(  0,  1,  0);
		normals.push(normal);
		normals.push(normal);
		normals.push(normal);
		normals.push(normal);

		var textureLeftFront  = new THREE.Vector2( 0, 0); 
		var textureRightFront = new THREE.Vector2( 1, 0); 
		var textureLeftBack   = new THREE.Vector2( 0, 1); 
		var textureRightBack  = new THREE.Vector2( 1, 1); 

		textures.push(textureLeftFront);
		textures.push(textureRightFront);
		textures.push(textureLeftBack);
		textures.push(textureRightBack);

		addTriangle(0, 1, 2, 0);  	
		addTriangle(3, 2, 1, 0); 
	}

	function addTriangle(index1,index2,index3,materialIndex){
		var face = new THREE.Face3( index1, index2, index3 );
		var normal = normals[index1];
		face.normal.copy( normal );
		face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
		face.materialIndex = materialIndex;
		scope.faces.push( face );
		scope.faceVertexUvs[ 0 ].push( [ textures[index1], textures[index2], textures[index3] ] );
	}
	
	this.mergeVertices();
};

Floor.prototype = Object.create( THREE.Geometry.prototype );
Floor.prototype.constructor = Floor;
