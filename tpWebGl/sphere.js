
Sphere = function ( radius, delta ) {

	THREE.Geometry.call( this );
	this.type = 'Sphere';
	
	this.parameters = {
		radius: radius,
		delta: delta
	};
	
	var textures = [];
	var normals = [];
	var distanceJ = 0 ,distanceI = 0;
	
	var scope = this;
	generate();

	function generate(){
		generateIndex();
		generateShapes();
	}
	
	function generateIndex(){
		var i,j,x,y,z;
		for(i=0;(i<2*Math.PI);i+=delta) {
			for(j=0;(j<Math.PI);j+=delta) {
 		
				x  = radius*Math.cos(i)*Math.sin(j);
				y  = radius*Math.sin(i)*Math.sin(j);
				z  = radius*Math.cos(j);
	
				var pos = new THREE.Vector3(x,y,z); 
				var texture = new THREE.Vector2((Math.sin(i)+1)/2,(Math.sin(2*j)+1)/2);
				var norm = new THREE.Vector3(x/radius,y/radius,z/radius); 

				scope.vertices.push(pos);
				textures.push(texture);
				normals.push(norm);
				
				if(i == 0)
					distanceJ++;
			}
			distanceI++;
		}		
	}
	
	function generateShapes(){
		var i,j;
		for(i = 0; i<distanceI; i++){		
			for(j = 0; j<distanceJ-1 ; j++){
				var actual = (i*distanceJ+j);
				var siguiente;

				siguiente = actual + distanceJ;

				if(i == distanceI -1)		
					siguiente = j;	

				if(j == distanceJ -2){					
					var end = scope.vertices.length-1;	
					addTriangle(siguiente, actual, end, 0);
					addTriangle(siguiente, end, siguiente+1, 0);
				}else{	
					addTriangle(siguiente, actual, actual+1, 0);
					addTriangle(siguiente, actual+1, siguiente+1, 0);
				}
			}
		}
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

Sphere.prototype = Object.create( THREE.Geometry.prototype );
Sphere.prototype.constructor = Sphere;