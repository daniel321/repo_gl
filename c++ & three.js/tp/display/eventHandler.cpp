#include "eventHandler.h"

EventHandler::EventHandler(Camera& camera, float velZ, float velX,  float dangX, float dangY):
			   camera(camera), velZ(velZ), velX(velX), dangX(dangX), dangY(dangY){
	mouseX = 0;
	mouseY = 0;
}

bool EventHandler::handleEvents(){
	SDL_Event e;
	while(SDL_PollEvent(&e)){
		if(e.type == SDL_KEYDOWN){
			char key = e.key.keysym.sym;
				
			switch(key){
				case 'q':	
					return false;
				break;
	
				case 'w':	
					camera.velZ = velZ;
				break;

				case 's':	
					camera.velZ = -velZ;
				break;

				case 'a':	
					camera.velX = -velZ;
				break;

				case 'd':	
					camera.velX = velZ;
				break;


				case 'W':	
					camera.velZ = velZ;
				break;

				case 'S':	
					camera.velZ = -velZ;
				break;

				case 'A':	
					camera.velX = -velZ;
				break;

				case 'D':	
					camera.velX = velZ;
				break;

				case '<':
					camera.nextType();
			}
		}
		if(e.type ==  SDL_MOUSEMOTION){
			int x = e.motion.x;
			int y = e.motion.y;

		 	if(mouseX != 0){
				if(mouseX > x)
					camera.angX = -dangX;
				else
					camera.angX = dangX;
			}

		 	if(mouseY != 0){
				if(mouseY > y)
					camera.angY = dangY;
				else
					camera.angY = -dangY;
			}

			mouseX = x;
			mouseY = y;
		}	
	}
	return true;
}
