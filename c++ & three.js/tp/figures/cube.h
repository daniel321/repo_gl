#ifndef CUBE_INCLUDED_H
#define CUBE_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>
#include "mesh.h"

class Cube{
	public:
    		Cube(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float size = 1);
		void Draw();

		virtual ~Cube();
	protected:

	private:
		Mesh* mesh;	
};

#endif
