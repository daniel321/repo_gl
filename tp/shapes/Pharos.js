Pharos = function(objectUniform, height, radioPoste, radioPharo){
    this.uniform = objectUniform;
    this.texturePathPoste = null;
    this.texturePathPharo = null;

    this.height = height;
    this.radioPoste = radioPoste;
    this.radioPharo = radioPharo;

    this.pharo0 = null;
    this.pharo1 = null;

    this.pharo0Shape = null;
    this.pharo1Shape = null;

    this.all = null;
    
    this.initBuffers = function(){
        var delta = 32;
        
        this.pharo0 = new Pharo(this.uniform, this.height, this.radioPoste, this.radioPharo, delta);
        this.pharo0.initTexture(this.texturePathPoste, this.texturePathPharo);
		
		this.pharo0Shape = new Shape(this.pharo0, this.uniform);
        
        this.pharo1 = new Pharo(this.uniform, this.height, this.radioPoste, this.radioPharo, delta);
        this.pharo1.initTexture(this.texturePathPoste, this.texturePathPharo);
		
		this.pharo1Shape = new Shape(this.pharo1, this.uniform);

        this.all = new ShapeGroup();

        this.all.add(this.pharo0Shape);
        this.all.add(this.pharo1Shape);
        this.all.initBuffers();

		this.pharo0Shape.translate(0.0, -0.3, 24.5);
		this.pharo1Shape.translate(0.0, -0.3, 4.0);  
    }

    this.initTexture = function(texturePathPoste, texturePathPharo){
        this.texturePathPoste = texturePathPoste;
        this.texturePathPharo = texturePathPharo;
    }
    
    this.translate = function(dX,dY,dZ){
        this.all.translate(dX,dY,dZ);
    }

    this.rotate = function(angX,angY,angZ){
        this.all.rotate(angX,angY,angZ);
    }

    this.orbit = function(angX,angY,angZ){
        this.all.orbit(angX,angY,angZ);
    }

    this.scale = function(eX,eY,eZ){
        this.all.scale(eX,eY,eZ);
    }

    this.restore = function(){
        this.all.restore();
    }

    this.acumulate = function(){
        this.all.acumulate();
    }

    this.draw = function(worldMatrix){
        this.all.draw(worldMatrix);
    }
};