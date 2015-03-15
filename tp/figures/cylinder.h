#ifndef CYLINDER_INCLUDED_H
#define CYLINDER_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>
#include "mesh.h"

class Cylinder{
	public:
    		Cylinder(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float radius = 1, float height = 1);
		void Draw();

		virtual ~Cylinder();
	protected:

	private:
		Mesh* mesh;
};

#endif
