#include "arm.h"

Arm::Arm(glm::vec3 center, float radJoints, float radArms, float lenghtArm){
	glm::vec3 orig = glm::vec3(0.0f,0.0f,0.0f);
	this->center = center;
	this->radJoints = radJoints;
	this->radArms = radArms;
	this->lenghtArm = lenghtArm;

	this->finger1 = new Cube(orig, lenghtArm/3);
	this->finger2 = new Cube(orig, lenghtArm/3);

	this->arm1 = new Cylinder(orig, radArms, lenghtArm);
	this->arm2 = new Cylinder(orig, radArms, lenghtArm);

	this->joint1 = new Sphere(orig, radJoints);
	this->joint2 = new Sphere(orig, radJoints);
	this->joint3 = new Sphere(orig, radJoints);
}

Arm::~Arm(){
	delete finger1;
	delete finger2;

	delete arm1;
	delete arm2;

	delete joint1;
	delete joint2;
	delete joint3;
}

	float joint1Ang = 0.0f;
	float joint1Ang2 = 0.0f;

	float joint2Ang = 0.0f;
	float joint2Ang2 = 0.0f;

	float joint3Ang = 0.0f;
	float joint3Ang2 = 0.0f;

void Arm::Draw(Shader& shader,Transform& transform, Camera& camera){
	joint1Ang  += 0.01f;
//	joint1Ang2 += 0.01f;

	joint2Ang  += 0.01f;
//	joint2Ang2 += 0.01f;

	joint3Ang  += 0.01f;
//	joint3Ang2 += 0.01f;

	transform.save();

	transform.GetPos()->x += center.x;
	transform.GetPos()->y += center.y;
	transform.GetPos()->z += center.z;
	transform.GetRot()->z += joint1Ang;		// (0;360)
	transform.GetRot()->y += PI/2+ joint1Ang2;	// (0;360)
	shader.Update(transform,camera);

	joint1->Draw();

	transform.GetPos()->z += lenghtArm/2;
	shader.Update(transform,camera);

	arm1->Draw();

	transform.GetPos()->z += lenghtArm/2;
	transform.GetRot()->x += (sin(joint2Ang-PI/2)+1)*(PI/4); // (90;0)
	transform.GetRot()->y += (sin(joint2Ang2-PI/2)+1)*(PI/4); // (90;0)
	shader.Update(transform,camera);

	joint2->Draw();

	transform.GetPos()->z += lenghtArm/2;
	shader.Update(transform,camera);

	arm2->Draw(); 

	transform.GetPos()->z += lenghtArm/2;
	transform.GetRot()->x += (PI/2)*sin(joint3Ang);	 // (-90;90)
	transform.GetRot()->z += joint3Ang2; 		 // (0;360)
	shader.Update(transform,camera);

	joint3->Draw();

	transform.GetPos()->z += lenghtArm/4;
	transform.GetPos()->y -= lenghtArm/5;
	transform.GetRot()->x += PI/4;
	transform.acumulate();
	transform.GetScale()->x *= 0.2f;  // problema con el orden del escalado ya que es lo primero que se hace
	transform.GetScale()->y *= 0.4f;
	shader.Update(transform,camera);

	finger1->Draw();

	transform.GetScale()->x /= 0.2f; // problema con el orden del escalado... necesito desescalar primero
	transform.GetScale()->y /= 0.4f;
	transform.acumulate();
	transform.GetPos()->y += lenghtArm/4;
	transform.GetPos()->z -= lenghtArm/4;
	transform.GetRot()->x -= PI/2;
	transform.acumulate();
	transform.GetScale()->x *= 0.2f; // y reescalar al final
	transform.GetScale()->y *= 0.4f;

	shader.Update(transform,camera);

	finger2->Draw();

	transform.restore();
	shader.Update(transform,camera);
}

























