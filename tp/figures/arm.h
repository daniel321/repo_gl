#ifndef ARM_INCLUDED_H
#define ARM_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>

#include "../display/camera.h"
#include "../display/transform.h"
#include "../shaders/shader.h"

#include "cylinder.h"
#include "cube.h"
#include "sphere.h"

class Arm{
	public:
    		Arm(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float radJoints = 1, float radArms = 1, float lenghtArm = 2);
		void Draw(Shader& shader,Transform& transform, Camera& camera);

		virtual ~Arm();
	protected:

	private:
		Cube *finger1, *finger2;
		Sphere *joint1, *joint2, *joint3;
		Cylinder *arm1, *arm2;

		glm::vec3 center;
		float radJoints, radArms, lenghtArm;
};

#endif
