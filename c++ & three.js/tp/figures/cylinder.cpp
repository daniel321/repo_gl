#include "cylinder.h"
#include "../display/transform.h"
#include <vector>


Cylinder::Cylinder(glm::vec3 center, float radius, float height){
	std::vector<Vertex> vertices; 
	std::vector<unsigned int> indices; 

	// -------------------------------                           // central points
	glm::vec3 centerTop = center + glm::vec3(0.0f,0.0f,height/2);         
	glm::vec3 normCenterTop = glm::vec3(0.0f,1.0f,0.0f);

	glm::vec3 centerBottom = center - glm::vec3(0.0f,0.0f,height/2);         
	glm::vec3 normCenterBottom = glm::vec3(0.0f,-1.0f,0.0f);

	glm::vec2 txtureCenter = glm::vec2(0.5f,0.5f);

	vertices.push_back(Vertex( centerTop,    txtureCenter, normCenterTop ));
	vertices.push_back(Vertex( centerBottom, txtureCenter, normCenterBottom ));

	// -------------------------------

	float x,y;

	int cont = 2;
 	float d = 0.05f;
 	for(float i=0;(i<2*PI);i+=d) {

 		x  = radius*cos(i);
		y  = radius*sin(i);
	
		glm::vec3 posTop    = center + glm::vec3(x,y,height/2);         
		glm::vec2 txtureTop = glm::vec2(sin(i),1.0f);
		glm::vec3 normTop   = glm::vec3(x/radius,y/radius,0.0f);

		glm::vec3 posBottom    = center + glm::vec3(x,y,-height/2);         
		glm::vec2 txtureBottom = glm::vec2(sin(i),0.0f);
		glm::vec3 normBottom   = glm::vec3(x/radius,y/radius,0.0f);

		vertices.push_back(Vertex( posTop, txtureTop, normTop ));
		vertices.push_back(Vertex( posBottom,  txtureBottom, normBottom ));


		if(i < 2*PI-d){				// connect the act with the next
			indices.push_back(0);
			indices.push_back(cont);
			indices.push_back(cont+2);

			indices.push_back(cont);
			indices.push_back(cont+1);
			indices.push_back(cont+2);

			indices.push_back(cont+1);
			indices.push_back(cont+3);
			indices.push_back(cont+2);

			indices.push_back(1);
			indices.push_back(cont+3);
			indices.push_back(cont+1);

		}else{					// connect the last with the first
			indices.push_back(0);
			indices.push_back(cont);
			indices.push_back(2);

			indices.push_back(cont);
			indices.push_back(cont+1);
			indices.push_back(2);

			indices.push_back(cont+1);
			indices.push_back(3);
			indices.push_back(2);

			indices.push_back(1);
			indices.push_back(3);
			indices.push_back(cont+1);
		}

		cont +=2;	
 	}	

	size_t cantVert = vertices.size();
	size_t cantInd = indices.size();

	mesh = new Mesh(&vertices[0],cantVert,&indices[0],cantInd);
}

Cylinder::~Cylinder(){
	delete mesh;
}

void Cylinder::Draw(){
	mesh->Draw(GL_TRIANGLES);
}






















