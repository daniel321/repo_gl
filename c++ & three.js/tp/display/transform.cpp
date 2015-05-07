#include "transform.h"

Transform::Transform(const glm::vec3& pos, const glm::vec3& rot, const glm::vec3& scale, 
		     const glm::mat4 acum, const glm::mat4 backup){
	this->pos = pos;
	this->rot = rot;
	this->scale = scale;

	this->acum = acum;
	this->backup = backup;
	save();
}

void Transform::save(){
	acumulate();
	for(int i=0; i<=3 ; i++)
		for(int j=0; j<=3 ; j++)
			backup[i][j] = acum[i][j];
	cleanTransf();
}

void Transform::restore(){
	for(int i=0; i<=3 ; i++)
		for(int j=0; j<=3 ; j++)
			acum[i][j] = backup[i][j];
	cleanTransf();
}

void Transform::clean(){
	cleanTransf();
	acum = glm::mat4(1.0);
}

void Transform::cleanTransf(){
	GetPos()->x = 0.0f;
	GetPos()->y = 0.0f;
	GetPos()->z = 0.0f;

	GetRot()->x = 0;
	GetRot()->y = 0;
	GetRot()->z = 0;

	GetScale()->x = 1.0f;
	GetScale()->y = 1.0f;
	GetScale()->z = 1.0f;
}

void Transform::acumulate(){
	glm::mat4 posMat = glm::translate(pos);
	glm::mat4 scaleMat = glm::scale(scale);

	glm::mat4 rotX = glm::rotate(rot.x, glm::vec3(1.0, 0.0, 0.0));
	glm::mat4 rotY = glm::rotate(rot.y, glm::vec3(0.0, 1.0, 0.0));
	glm::mat4 rotZ = glm::rotate(rot.z, glm::vec3(0.0, 0.0, 1.0));
	glm::mat4 rotMat = rotZ * rotY * rotX;

	acum *= (posMat * rotMat * scaleMat);
	cleanTransf();
}

glm::mat4 Transform::GetModel() {
	acumulate();
	return acum;
}

glm::mat4 Transform::GetMVP(Camera& camera) {
	glm::mat4 VP = camera.GetViewProjection();
	glm::mat4 M = GetModel();
	return VP * M;
}

glm::vec3* Transform::GetPos() { 
	return &pos; 
}

glm::vec3* Transform::GetRot() { 
	return &rot; 
}

glm::vec3* Transform::GetScale() { 
	return &scale; 
}

void Transform::SetPos(glm::vec3& pos) { 
	this->pos = pos; 
}

void Transform::SetRot(glm::vec3& rot) { 
	this->rot = rot; 
}
	
void Transform::SetScale(glm::vec3& scale) { 
	this->scale = scale; 
}

