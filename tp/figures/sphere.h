#ifndef SPHERE_INCLUDED_H
#define SPHERE_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>
#include "mesh.h"

class Sphere{
	public:
    		Sphere(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float radius = 1);
		void Draw();

		virtual ~Sphere();
	protected:

	private:
		Mesh* mesh;
};

#endif
