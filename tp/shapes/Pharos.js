Pharos = function(height, radioPoste, radioPharo, delta, material){
    this.material = material;
    this.texturePathPoste = null;
    this.texturePathPharo = null;

    this.height = height;
    this.radioPoste = radioPoste;
    this.radioPharo = radioPharo;
    this.delta = delta;

    this.pharo0 = null;
    this.pharo1 = null;

    this.pharo0Shape = null;
    this.pharo1Shape = null;

    this.all = null;
    
    this.initBuffers = function(){
        
        this.pharo0 = new Pharo(this.height, this.radioPoste, this.radioPharo, this.delta, this.material);
        this.pharo0.initTexture(this.texturePathPoste, this.texturePathPharo);
		
		this.pharo0Shape = new Shape(this.pharo0);
        
        this.pharo1 = new Pharo(this.height, this.radioPoste, this.radioPharo, this.delta, this.material);
        this.pharo1.initTexture(this.texturePathPoste, this.texturePathPharo);
		
		this.pharo1Shape = new Shape(this.pharo1);

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