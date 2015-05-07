#include "shader.h"
#include <iostream>
#include <fstream>

Shader::Shader(const std::string& vertShaderPath, const std::string& fragShaderPath, glm::vec3 posLight){
	m_program = glCreateProgram();
	m_shaders[0] = CreateShader(LoadShader(vertShaderPath), GL_VERTEX_SHADER);
	m_shaders[1] = CreateShader(LoadShader(fragShaderPath), GL_FRAGMENT_SHADER);

	for(unsigned int i = 0; i < NUM_SHADERS; i++)
		glAttachShader(m_program, m_shaders[i]);

	glBindAttribLocation(m_program, 0, "position");
	glBindAttribLocation(m_program, 1, "texCoord");
	glBindAttribLocation(m_program, 2, "normal");

	glLinkProgram(m_program);

	m_uniforms[0] = glGetUniformLocation(m_program, "MVP");
	m_uniforms[1] = glGetUniformLocation(m_program, "Normal");
	m_uniforms[2] = glGetUniformLocation(m_program, "lightDirection");

	posLight = posLight;
}

Shader::~Shader(){
	for(unsigned int i = 0; i < NUM_SHADERS; i++){
        	glDetachShader(m_program, m_shaders[i]);
      	 	glDeleteShader(m_shaders[i]);
	}
	glDeleteProgram(m_program);
}

// binds the program
void Shader::Bind(){
	glUseProgram(m_program);
}

void Shader::Update(Transform& transform, Camera& camera){
	glm::mat4 MVP = transform.GetMVP(camera);
	glm::mat4 Normal = transform.GetModel();

	glUniformMatrix4fv(m_uniforms[0], 1, GL_FALSE, &MVP[0][0]);
	glUniformMatrix4fv(m_uniforms[1], 1, GL_FALSE, &Normal[0][0]);
	glUniform3f(m_uniforms[2], posLight.x, posLight.y, posLight.z);
}

// copys line by line the shader in a string array
std::string Shader::LoadShader(const std::string& fileName){
	std::ifstream file;
	file.open((fileName).c_str());

	std::string output;
	std::string line;

	while(file.good()){
		getline(file, line);
		output.append(line + "\n"); // getline ereases the "\n"
        }

	return output;
}

// creates and compiles the shader
GLuint Shader::CreateShader(const std::string& text, unsigned int type){
	GLuint shader = glCreateShader(type);

	const GLchar* code[1];
	code[0] = text.c_str();
	GLint lengths[1];
	lengths[0] = text.length();

	glShaderSource(shader, 1, code, lengths);
	glCompileShader(shader);

	return shader;
}
