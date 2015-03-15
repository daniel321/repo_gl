#include "sphere.h"
#include "../display/transform.h"
#include <vector>


Sphere::Sphere(glm::vec3 center, float radius){
	std::vector<Vertex> vertices; 
	std::vector<unsigned int> indices; 

 	float x,y,z;
 	float d = 0.05f, distanceJ=0 ,distanceI = 0;
	for(float i=0.0f;(i<2*PI);i+=d) {
		for(float j=0.0f;(j<PI);j+=d) {
 		
			x  = radius*cos(i)*sin(j);
			y  = radius*sin(i)*sin(j);
			z  = radius*cos(j);
	
			glm::vec3 pos = center + glm::vec3(x,y,z);
			glm::vec2 txture = glm::vec2((sin(i)+1)/2,(sin(2*j)+1)/2);
			glm::vec3 norm = glm::vec3(x/radius,y/radius,z/radius);

			vertices.push_back(Vertex( pos,  txture, norm ));
	
			if(i == 0)
				distanceJ++;
		}
		distanceI++;
 	}

	for(int i = 0; i<distanceI; i++){		
		for(int j = 0; j<distanceJ-1 ; j++){
			int actual = (i*distanceJ+j);
			int siguiente;

			siguiente = actual + distanceJ;

			if(i == distanceI -1)		
				siguiente = j;	

			if(j == distanceJ -2){
				int end = vertices.size()-1;	

				indices.push_back(siguiente);	
				indices.push_back(actual);
				indices.push_back(end);

				indices.push_back(siguiente);
				indices.push_back(end);
				indices.push_back(siguiente+1);	
			}else{
				indices.push_back(siguiente);	
				indices.push_back(actual);
				indices.push_back(actual+1);

				indices.push_back(siguiente);
				indices.push_back(actual+1);
				indices.push_back(siguiente+1);	
			}
		}
	}

	size_t cantVert = vertices.size();
	size_t cantInd = indices.size();

	mesh = new Mesh(&vertices[0],cantVert,&indices[0],cantInd);
}

Sphere::~Sphere(){
	delete mesh;
}

void Sphere::Draw(){
	mesh->Draw(GL_TRIANGLES);
//	mesh->Draw(GL_POINTS);
}






















