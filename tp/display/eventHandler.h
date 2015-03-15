#ifndef EVENTHAMDLER_INCLUDED_H
#define EVENTHAMDLER_INCLUDED_H

#include <SDL2/SDL.h>
#include "camera.h"

struct EventHandler{
	public:
		EventHandler(Camera& camera, float velZ, float velX, float dangX, float dangY);

		bool handleEvents();		

	protected:

	private:
		Camera& camera;
		float velZ, velX, dangX, dangY;	
		int mouseX, mouseY;
};

#endif
