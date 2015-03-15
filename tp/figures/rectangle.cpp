#include "rectangle.h"

Rectangle::Rectangle(glm::vec3 center, float width, float height){

	glm::vec3 normFront = glm::vec3(0.0f,0.0f,-1.0f); 			// normals
	glm::vec3 normBack = glm::vec3(0.0f,0.0f,1.0f); 		
	
	glm::vec2 leftFrontTxture = glm::vec2(0.0f,1.0f);  			// textures
	glm::vec2 leftBackTxture = glm::vec2(0.0f,0.0f);
	glm::vec2 rightFrontTxture = glm::vec2(1.0f,1.0f);
	glm::vec2 rightBackTxture = glm::vec2(1.0f,0.0f);

	glm::vec3 leftFront   = center + glm::vec3(-width/2, height/2, 0.0f);  	// vertex
	glm::vec3 leftBack   = center + glm::vec3(-width/2,-height/2, 0.0f);
	glm::vec3 rightFront  = center + glm::vec3( width/2, height/2, 0.0f);
	glm::vec3 rightBack  = center + glm::vec3( width/2,-height/2, 0.0f);

	Vertex vertices[] = {   Vertex(  leftFront,  leftFrontTxture, normFront ),
				Vertex(  leftBack,  leftBackTxture, normFront ),
				Vertex( rightFront, rightFrontTxture, normFront ),
				Vertex( rightBack, rightBackTxture, normFront ),
		
				Vertex(  leftFront,  leftFrontTxture, normBack ),    // 2 sided
				Vertex(  leftBack,  leftBackTxture, normBack ),
				Vertex( rightFront, rightFrontTxture, normBack ),
				Vertex( rightBack, rightBackTxture, normBack )   };

	size_t cantVert = 8;
	size_t cantInd = 12;

	unsigned int indices[12] = { 0,1,2,
				     2,1,3,
				     4,5,6,
				     6,5,7};

	mesh = new Mesh(vertices,cantVert,indices,cantInd);
}

Rectangle::~Rectangle(){
	delete mesh;
}

void Rectangle::Draw(){
	mesh->Draw(GL_TRIANGLES);
}

























