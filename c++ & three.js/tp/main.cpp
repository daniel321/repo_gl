#include <iostream>
#include <SDL2/SDL.h>

#include <GL/glew.h>
#include <GL/glut.h>

#include "display/display.h"
#include "display/eventHandler.h"

#include "display/camera.h"
#include "display/transform.h"
#include "shaders/shader.h"
#include "textures/texture.h"

#include "figures/rectangle.h"
#include "figures/cube.h"
#include "figures/sphere.h"
#include "figures/cylinder.h"
#include "figures/floor.h"

#include "figures/arm.h"


static const int WIDTH = 800;
static const int HEIGHT = 600;

bool moved(float act,float old);
bool checkForImput(Camera& camera);

void loadedMeshTransform(Shader& shader,Transform& transform, Camera& camera, float angle);
void resetTransform(Shader& shader,Transform& transform, Camera& camera);
void sunTransform(Shader& shader,Transform& transform, Camera& camera, float angle, float max);

void rotatingCubeTransform(Shader& shader,Transform& transform, Camera& camera, float angle);
void rotatingSphereTransform(Shader& shader,Transform& transform, Camera& camera, float angle);
void rotatingCylinderTransform(Shader& shader,Transform& transform, Camera& camera, float angle);

int main(int argc, char** argv){
	Display display(WIDTH, HEIGHT, "Ventanita");

	glm::vec3 pos = glm::vec3(0.5f,1.0f,-2.0f);
	Camera camera(pos, 30.0f, (float)WIDTH/(float)HEIGHT, 0.001f, 1000.0f);
	EventHandler handler(camera, 0.05f, 0.05f, 0.01f, 0.01f);
	Transform transform;	

	Shader shader("shaders/basic.vert","shaders/basic.frag");

	Sphere sphere;	
	Cube cube;
	Cylinder cylinder(glm::vec3(0.0f,0.0f,0.0f),0.5f,1.0f);

	Arm arm(glm::vec3(0.0f,0.5f,-1.0f), 0.15f, 0.1f, 0.75f);
	Mesh loadedMesh("figures/models/sword.obj");
	Floor floor(glm::vec3(0.0f,2.0f,0.0f),200.0f,200.0f);

	Texture sunTexture("textures/imgs/sun.bmp");
	Texture blockTexture("textures/imgs/towerBlock.bmp");
	Texture loadedMeshTexture("textures/imgs/stoneFloor.bmp");
	Texture cylTexture("textures/imgs/column.bmp");
	Texture floorTexture("textures/imgs/floor.bmp");

	float angle = 0.0f;
//	float sunAngle = 0.0f,max = 10;
	bool isRunning = true;
	while(isRunning){

		isRunning = handler.handleEvents();
		camera.executeChanges();

		display.centerMouse(WIDTH/2, HEIGHT/2);
		display.Color(0.0f,0.0f,0.0f,0.0f);

		shader.Bind();
		angle += 0.01f;

		// ---------------------------------------------------
//		sunAngle+= 0.01f;
//		sunTexture.Bind();		
//		sunTransform(shader, transform, camera, sunAngle, max);
//		sphere.Draw();
//		resetTransform(shader, transform, camera);
		// ---------------------------------------------------

		// ---------------------------------------
		blockTexture.Bind();
		rotatingCubeTransform(shader, transform, camera, angle);
		cube.Draw();
		resetTransform(shader, transform, camera);
		// ---------------------------------------

		// ---------------------------------------------------
		rotatingCylinderTransform(shader, transform, camera, angle);
		cylTexture.Bind();
		cylinder.Draw();
		resetTransform(shader, transform, camera);
		// ---------------------------------------------------

		// ---------------------------------------------------		
		rotatingSphereTransform(shader, transform, camera, angle);
		sunTexture.Bind();		
		sphere.Draw();
		resetTransform(shader, transform, camera);
		// ---------------------------------------------------


		// ---------------------------------------------------
		loadedMeshTexture.Bind();
		arm.Draw(shader, transform, camera);
//		resetTransform(shader, transform, camera);
		// ---------------------------------------------------

		// ---------------------------------------------------
		loadedMeshTransform(shader, transform, camera, angle);
		loadedMesh.Draw(GL_TRIANGLES);
		resetTransform(shader, transform, camera);
		// ---------------------------------------------------

		// ---------------------------------------------------
		floorTexture.Bind();
		floor.Draw();
		// ---------------------------------------------------

		display.SwapBuffers();
		SDL_Delay(10);
	}
	return 0;
}

void sunTransform(Shader& shader,Transform& transform, Camera& camera, float angle, float max){
	shader.posLight.x = max*cos(angle);
	shader.posLight.y = max*sin(angle);
	shader.posLight.z = 0;

	transform.GetPos()->x = -shader.posLight.x;
	transform.GetPos()->y = -shader.posLight.y;
	transform.GetPos()->z = -shader.posLight.z;

	shader.Update(transform,camera);
}

void loadedMeshTransform(Shader& shader,Transform& transform, Camera& camera, float angle){
	transform.GetPos()->x = 0.0f;
	transform.GetPos()->y = 0.0f;
	transform.GetPos()->z = 2.0f;

	transform.GetRot()->x = PI/2;
	transform.GetRot()->y = angle;
	transform.GetRot()->z = 0.0f;

	transform.GetScale()->x = 0.1f;
	transform.GetScale()->y = 0.1f;
	transform.GetScale()->z = 0.1f;

	shader.Update(transform,camera);
}

void rotatingCubeTransform(Shader& shader,Transform& transform, Camera& camera, float angle){
	transform.GetRot()->x = 2*angle;
	transform.GetRot()->y = angle;
	transform.GetRot()->z = angle;

	transform.GetPos()->x = -2.5f;
	transform.GetPos()->y = 1.0f;
	transform.GetPos()->z = 2.0f;

	shader.Update(transform,camera);
}

void rotatingSphereTransform(Shader& shader,Transform& transform, Camera& camera, float angle){
	transform.GetRot()->x = 2*angle;
	transform.GetRot()->y = angle;
	transform.GetRot()->z = angle;

	transform.GetPos()->x = 0.0f;
	transform.GetPos()->y = 1.0f;
	transform.GetPos()->z = 2.0f;

	shader.Update(transform,camera);
}

void rotatingCylinderTransform(Shader& shader,Transform& transform, Camera& camera, float angle){
	transform.GetRot()->x = PI/2;
	transform.GetRot()->y = angle;

	transform.GetPos()->x = 2.5f;
	transform.GetPos()->y = 1.0f;
	transform.GetPos()->z = 1.0f;

	shader.Update(transform,camera);
}

void resetTransform(Shader& shader,Transform& transform, Camera& camera){
	transform.clean();
	shader.Update(transform,camera);
}
