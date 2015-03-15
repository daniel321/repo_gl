#include "camera.h"

Camera::Camera(const glm::vec3& pos, float fov, float aspect, float zNear, float zFar){
	this->pos = pos;
	this->forward = glm::vec3(0, 0, 1);
	this->up = glm::vec3(0, 1, 0);
	this->projection = glm::perspective(fov, aspect, zNear, zFar);

	this->type = 0;

	this->posBackup = pos;
	this->forwardBackup = glm::vec3(0, 0, 1);
	this->upBackup = glm::vec3(0, 1, 0);

	resetValues();
}

void Camera::nextType(){
	this->type = ((this->type+1)%(cantTypes));
}

void Camera::executeChanges(){
	
	if(this->type == 0)
		movmentType0();

	if(this->type == 1)
		movmentType1();

	resetValues();
}

// noclip mode
void Camera::movmentType0(){
	if(this->posBackup.y != 0){	
		swap(pos,posBackup);
		swap(forward,forwardBackup);
		swap(up,upBackup);
		this->posBackup.y = 0;
	}

	MoveForward(this->velZ);
	MoveRight(this->velX);

	Pitch(this->angY);
	RotateY(this->angX);
}

// walking mode
void Camera::movmentType1(){
	if(this->pos.y != 0){	
		swap(pos,posBackup);
		swap(forward,forwardBackup);
		swap(up,upBackup);
		this->pos.y = 0;
	}

	WalkForward(this->velZ);
	WalkRight(this->velX);

	Pitch(this->angY);
	RotateY(this->angX);
}

void Camera::swap(glm::vec3& first, glm::vec3& sec){
	glm::vec3 aux = glm::vec3( first.x, first.y, first.z);

	first.x = sec.x;
	first.y = sec.y;
	first.z = sec.z;

	sec.x = aux.x;
	sec.y = aux.y;
	sec.z = aux.z;
}

void Camera::resetValues(){
	this->angX = 0.0f;
	this->angY = 0.0f;
	this->velZ = 0.0f;
	this->velX = 0.0f;
}

glm::mat4 Camera::GetViewProjection() const{
	return projection * glm::lookAt(pos, pos + forward, up);
}

glm::vec3 Camera::GetPos(){
	return pos;
}

void Camera::MoveForward(float amt){
	pos += forward * amt;
}

void Camera::WalkForward(float amt){
	pos += glm::vec3(forward.x * amt, 0.0f,forward.z * amt);
}

void Camera::MoveRight(float amt){
	pos += glm::cross(up, forward) * amt;
}

void Camera::WalkRight(float amt){
	pos += glm::vec3((glm::cross(up, forward) * amt).x, 0.0f, (glm::cross(up, forward) * amt).z);
}

void Camera::Pitch(float angle){
	glm::vec3 right = glm::normalize(glm::cross(up, forward));
	forward = glm::vec3(glm::normalize(glm::rotate(angle, right) * glm::vec4(forward, 0.0)));
	up = glm::normalize(glm::cross(forward, right));
}

void Camera::RotateY(float angle){
	static const glm::vec3 UP(0, 1, 0);
	glm::mat4 rotation = glm::rotate(angle, UP);
	forward = glm::vec3(glm::normalize(rotation * glm::vec4(forward, 0.0)));
	up = glm::vec3(glm::normalize(rotation * glm::vec4(up, 0.0)));
}
