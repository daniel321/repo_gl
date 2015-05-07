#ifndef SHADER_INCLUDED_H
#define SHADER_INCLUDED_H

#define GLM_FORCE_RADIANS 30

#include <string>
#include <GL/glew.h>
#include <glm/glm.hpp>

#include "../display/transform.h"

class Shader{
	public:
		Shader(	const std::string& vertShaderPath, 
		       	const std::string& fragShaderPath, 
			glm::vec3 posLight = glm::vec3(0.0f,-0.5f,-1.0f));

		void Bind();
		void Update(Transform& transform, Camera& camera);

		virtual ~Shader();

		glm::vec3 posLight;

	protected:

	private:
		static const unsigned int NUM_SHADERS = 2;
		static const unsigned int NUM_UNIFORMS = 3;
		void operator=(const Shader& shader) {}
		Shader(const Shader& shader) {}

		std::string LoadShader(const std::string& fileName);
		void CheckShaderError(GLuint shader, GLuint flag, bool isProgram, const std::string& errorMessage);
		GLuint CreateShader(const std::string& text, unsigned int type);

		GLuint m_program;
		GLuint m_shaders[NUM_SHADERS];
		GLuint m_uniforms[NUM_UNIFORMS];
};

#endif
