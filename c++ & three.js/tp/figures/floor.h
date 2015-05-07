#ifndef FLOOR_INCLUDED_H
#define FLOOR_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <GL/glew.h>
#include <glm/glm.hpp>
#include "mesh.h"

class Floor{
	public:
    		Floor(glm::vec3 center = glm::vec3(0.0f,0.0f,0.0f), float width = 200, float height = 200);
		void Draw();

		virtual ~Floor();
	protected:

	private:
		Mesh* mesh;
};

#endif
