#ifndef TRANSFORM_INCLUDED_H
#define TRANSFORM_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <glm/glm.hpp>
#include <glm/gtx/transform.hpp>
#include "camera.h"

#define PI 3.1415926535897

struct Transform{
	public:

		Transform(const glm::vec3& pos = glm::vec3(), const glm::vec3& rot = glm::vec3(),
			  const glm::vec3& scale = glm::vec3(1.0f, 1.0f, 1.0f), 
			  const glm::mat4 acum = glm::mat4(1.0), const glm::mat4 backup = glm::mat4(1.0));

		void clean();
		void cleanTransf();
		void save();
		void restore();
		void acumulate();

		glm::mat4 GetModel();
		glm::mat4 GetMVP(Camera& camera);

		glm::vec3* GetPos();
		glm::vec3* GetRot();
		glm::vec3* GetScale();

		void SetPos(glm::vec3& pos);
		void SetRot(glm::vec3& rot);
		void SetScale(glm::vec3& scale);

	protected:

	private:
		glm::mat4 acum,backup;

		glm::vec3 pos;
		glm::vec3 rot;
		glm::vec3 scale;
};

#endif
