CC = g++
CFLAGS = -Wall -g -pedantic -std=c++11
PROG = main.exe
LIBS = -lglut -lGL -lGLU -lGLEW -lm -lSDL2
SRCS = main.cpp shader.o texture.o mesh.o cube.o rectangle.o floor.o cylinder.o sphere.o arm.o obj_loader.o imageloader.o display.o eventHandler.o transform.o camera.o

all: $(PROG) ejecutar

ejecutar: $(PROG)
	./main.exe

imageloader.o: textures/imageloader.h textures/imageloader.cpp
	$(CC) $(CFLAGS) -c textures/imageloader.cpp

texture.o: textures/imageloader.h textures/texture.h textures/texture.cpp 
	$(CC) $(CFLAGS) -c textures/texture.cpp

eventHandler.o: display/camera.h display/eventHandler.h display/eventHandler.cpp 
	$(CC) $(CFLAGS) -c display/eventHandler.cpp

obj_loader.o: figures/obj_loader.h figures/obj_loader.cpp 
	$(CC) $(CFLAGS) -c figures/obj_loader.cpp

sphere.o: figures/mesh.h display/transform.h figures/sphere.h figures/sphere.cpp 
	$(CC) $(CFLAGS) -c figures/sphere.cpp

cylinder.o: figures/mesh.h display/transform.h figures/cylinder.h figures/cylinder.cpp 
	$(CC) $(CFLAGS) -c figures/cylinder.cpp

rectangle.o: figures/mesh.h figures/rectangle.h figures/rectangle.cpp 
	$(CC) $(CFLAGS) -c figures/rectangle.cpp

floor.o: figures/mesh.h figures/floor.h figures/floor.cpp 
	$(CC) $(CFLAGS) -c figures/floor.cpp

cube.o: figures/mesh.h figures/cube.h figures/cube.cpp 
	$(CC) $(CFLAGS) -c figures/cube.cpp

arm.o: shaders/shader.h display/transform.h display/camera.h figures/cube.h figures/sphere.h figures/cylinder.h figures/sphere.h figures/arm.cpp 
	$(CC) $(CFLAGS) -c figures/arm.cpp

mesh.o: figures/obj_loader.h utils/debugTimer.h utils/util.h figures/mesh.h figures/mesh.cpp 
	$(CC) $(CFLAGS) -c figures/mesh.cpp

display.o: display/display.h display/display.cpp
	$(CC) $(CFLAGS) -c display/display.cpp

camera.o: display/camera.h display/camera.cpp
	$(CC) $(CFLAGS) -c display/camera.cpp

transform.o: display/camera.h display/transform.h display/transform.cpp
	$(CC) $(CFLAGS) -c display/transform.cpp

shader.o: display/transform.h shaders/shader.h shaders/shader.cpp 
	$(CC) $(CFLAGS) -c shaders/shader.cpp

$(PROG):$(SRCS) 
	$(CC) $(CFLAGS) -o $(PROG) $(SRCS) $(LIBS)

clean:
	rm -f *.o
	rm -f $(PROG)
