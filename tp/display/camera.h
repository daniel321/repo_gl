#ifndef CAMERA_INCLUDED_H
#define CAMERA_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <glm/glm.hpp>
#include <glm/gtx/transform.hpp>

#define cantTypes 2

struct Camera
{
public:
	Camera(const glm::vec3& pos, float fov, float aspect, float zNear, float zFar);
	glm::mat4 GetViewProjection() const;
	glm::vec3 GetPos();

	void executeChanges();
	void nextType();

	float angX,angY,velZ,velX; // buffers for the next movment of the camera
	int type;		   // camera type

protected:
private:
	glm::mat4 projection;
	glm::vec3 pos,posBackup;		// backups are for changing from 1 camera to another
	glm::vec3 forward,forwardBackup;	// widout loosing the first one
	glm::vec3 up,upBackup;

	void swap(glm::vec3& first, glm::vec3& sec);

	void movmentType0();
	void movmentType1();

	void MoveForward(float amt);
	void MoveRight(float amt);

	void WalkForward(float amt);
	void WalkRight(float amt);

	void Pitch(float angle);
	void RotateY(float angle);

	void resetValues();
};

#endif
