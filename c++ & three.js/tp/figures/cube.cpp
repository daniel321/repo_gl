#include "cube.h"

Cube::Cube(glm::vec3 center, float size){
	float unit = 1.0f / sqrt(3);

	glm::vec3 leftTopNorm = glm::vec3(-unit,unit,unit); 			
	glm::vec3 leftBotNorm = glm::vec3(-unit,-unit,unit); 			
	glm::vec3 rightTopNorm = glm::vec3(unit,unit,unit); 			
	glm::vec3 rightBotNorm = glm::vec3(unit,-unit,unit); 			
	glm::vec3 leftTopBackNorm = glm::vec3(-unit,unit,-unit); 			
	glm::vec3 leftBotBackNorm = glm::vec3(-unit,-unit,-unit); 			
	glm::vec3 rightTopBackNorm = glm::vec3(unit,unit,-unit); 			
	glm::vec3 rightBotBackNorm = glm::vec3(unit,-unit,-unit); 			


	glm::vec2 leftTopTxture = glm::vec2(0.0f,1.0f);  		// textures
	glm::vec2 leftBotTxture = glm::vec2(0.0f,0.0f);
	glm::vec2 rightTopTxture = glm::vec2(1.0f,1.0f);
	glm::vec2 rightBotTxture = glm::vec2(1.0f,0.0f);

	glm::vec3 leftTop   = center + glm::vec3(-size/2, size/2, size/2);  	// vertex
	glm::vec3 leftBot   = center + glm::vec3(-size/2,-size/2, size/2);
	glm::vec3 rightTop  = center + glm::vec3( size/2, size/2, size/2);
	glm::vec3 rightBot  = center + glm::vec3( size/2,-size/2, size/2);

	glm::vec3 leftTopBack  = center + glm::vec3(-size/2, size/2, -size/2);  	
	glm::vec3 leftBotBack  = center + glm::vec3(-size/2,-size/2, -size/2);
	glm::vec3 rightTopBack = center + glm::vec3( size/2, size/2, -size/2);
	glm::vec3 rightBotBack = center + glm::vec3( size/2,-size/2, -size/2);

	Vertex vertices[] = {  	Vertex( rightTop, rightTopTxture, rightTopNorm ),
				Vertex( rightBot, rightBotTxture, rightBotNorm ),  
				Vertex(  leftTop,  leftTopTxture, leftTopNorm ),
				Vertex(  leftBot,  leftBotTxture, leftBotNorm ),

				Vertex( leftTopBack, rightTopTxture, leftTopBackNorm ),
				Vertex( leftBotBack, rightBotTxture, leftBotBackNorm ),  
				Vertex( rightTopBack,  leftTopTxture, rightTopBackNorm ),
				Vertex( rightBotBack,  leftBotTxture, rightBotBackNorm ),

				Vertex( rightTop, rightBotTxture, rightTopNorm ),
				Vertex( rightBot, rightTopTxture, rightBotNorm ),  
				Vertex(  leftTop,  leftBotTxture, leftTopNorm ),
				Vertex(  leftBot,  leftTopTxture, leftBotNorm ),

				Vertex( leftTopBack, leftTopTxture, leftTopBackNorm ),
				Vertex( leftBotBack, leftBotTxture, leftBotBackNorm ),  
				Vertex( rightTopBack, rightTopTxture, rightTopBackNorm ),
				Vertex( rightBotBack, rightBotTxture, rightBotBackNorm )  };
	

	unsigned int indices[36] = {  1,0,2,   1,2,3, 		//back
			     	      5,4,6,   5,6,7,		//front
			    	      0,1,6,   6,1,7,		//right 
			    	      3,2,4,   3,4,5,		//left
			     	      10,8,12, 12,8,14, 	//bot
			     	      9,11,15, 11,13,15 }; 	//top


	size_t cantVert = 16; // had to duplicate some vertex for the texture coordenates on top & bottom
	size_t cantInd = 36;

	mesh = new Mesh(vertices,cantVert,indices,cantInd);
}

Cube::~Cube(){
	delete mesh;
}

void Cube::Draw(){
	mesh->Draw(GL_TRIANGLES);
}

























