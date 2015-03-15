
Cylinder = function ( height, radius, delta) {

	THREE.Geometry.call( this );
	this.type = 'Cylinder';

	this.parameters = {
		height: height,
		radius: radius,
		delta: delta
	};

	var textures = [];
	var normals = [];	
	var scope = this;
	generate();

	function generate(){
		generateIndex();
		generateShapes();
	}
	
	function generateIndex(){
		var centerTop = new THREE.Vector3( 0, 0, height/2); 
		var centerBottom = new THREE.Vector3( 0, 0, -height/2);
		
		scope.vertices.push(centerTop);
		scope.vertices.push(centerBottom);
		
		var textureCenter = new THREE.Vector2( 0.5, 0.5); 
		
		textures.push(textureCenter);
		textures.push(textureCenter);
		
		var normCenterTop = new THREE.Vector3( 0, 1, 0);
		var normCenterBottom = new THREE.Vector3( 0, -1, 0); 
		
		normals.push(normCenterTop);
		normals.push(normCenterBottom);
		
		var i,x,y;
		for(i=0;(i<2*Math.PI);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
	
			var posTop = new THREE.Vector3(x, y, height/2); 
			var posBottom = new THREE.Vector3(x, y, -height/2); 

			scope.vertices.push(posTop);
			scope.vertices.push(posBottom);
				
			var div = 2;
			var txtureTop = new THREE.Vector2((Math.sin(i)+1)/div,1); 
			var txtureBottom = new THREE.Vector2((Math.sin(i)+1)/div, 0);				

			textures.push(txtureTop);
			textures.push(txtureBottom);
			
			var normTop = new THREE.Vector3(x/radius, y/radius, 0); 
			var normBottom = new THREE.Vector3(x/radius, y/radius, 0);		

			normals.push(normTop);
			normals.push(normBottom);			
		}
	}
	
	function generateShapes(){
		
		var i,cont = 2;
		for(i=0;(i<2*Math.PI);i+=delta) {
			x  = radius * Math.cos(i);
			y  = radius * Math.sin(i);
				
			if(i < 2*Math.PI-delta){						// connect the act with the next			
				addTriangle(0, cont, cont+2, 0);  			// top triangle

				addTriangle(cont, cont+1, cont+2, 1);  		// center square
				addTriangle(cont+1, cont+3, cont+2, 1);  

				addTriangle(1, cont+3, cont+1, 0);  		// bot triangle			
			}else{											// connect the last with the first	
				addTriangle(0, cont, 2, 0);  				// top triangle

				addTriangle(cont, cont+1, 2, 1);  			// center square
				addTriangle(cont+1, 3, 2, 1);  
				
				addTriangle(1, 3, cont+1, 0);  				// top triangle
			}		
			cont +=2;
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

Cylinder.prototype = Object.create( THREE.Geometry.prototype );
Cylinder.prototype.constructor = Cylinder;