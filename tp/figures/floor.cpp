#include "floor.h"

Floor::Floor(glm::vec3 center, float width, float height){

	glm::vec3 normTop = glm::vec3(0.0f,-1.0f,0.0f); 			// normals
	glm::vec3 normBot = glm::vec3(0.0f,1.0f,0.0f); 		


	float ratio = 5;
	glm::vec2 leftTopTxture = glm::vec2(0.0f,height/ratio);  		// textures
	glm::vec2 leftBotTxture = glm::vec2(0.0f,0.0f);
	glm::vec2 rightTopTxture = glm::vec2(width/ratio,height/ratio);
	glm::vec2 rightBotTxture = glm::vec2(width/ratio,0.0f);

	glm::vec3 leftTop   = center + glm::vec3(-width/2, 0.0f,  height/2);  	// vertex
	glm::vec3 leftBot   = center + glm::vec3(-width/2, 0.0f, -height/2);
	glm::vec3 rightTop  = center + glm::vec3( width/2, 0.0f,  height/2);
	glm::vec3 rightBot  = center + glm::vec3( width/2, 0.0f, -height/2);

	Vertex vertices[] = {	Vertex(  leftTop,  leftTopTxture, normTop ),
				Vertex(  leftBot,  leftBotTxture, normTop ),
				Vertex( rightTop, rightTopTxture, normTop ),
				Vertex( rightBot, rightBotTxture, normTop ),
		
				Vertex(  leftTop,  leftTopTxture, normBot ),    // 2 sided
				Vertex(  leftBot,  leftBotTxture, normBot ),
				Vertex( rightTop, rightTopTxture, normBot ),
				Vertex( rightBot, rightBotTxture, normBot ) };

	size_t cantVert = 8;
	size_t cantInd = 12;

	unsigned int indices[12] = { 0,1,2,
				     2,1,3,
				     4,5,6,
				     6,5,7};

	mesh = new Mesh(vertices,cantVert,indices,cantInd);
}

Floor::~Floor(){
	delete mesh;
}

void Floor::Draw(){
	mesh->Draw(GL_TRIANGLES);
}

























