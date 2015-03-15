#ifndef RECTANGLE_INCLUDED_H
#define RECTANGLE_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>
#include "mesh.h"

class Rectangle{
	public:
    		Rectangle(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float width = 1, float height = 1);
		void Draw();

		virtual ~Rectangle();
	protected:

	private:
		Mesh* mesh;
};

#endif
