Pharo = function(objectUniform, height, radioPoste, radioPharo, delta){
    this.uniform = objectUniform;
    this.texturePathPoste = null;
    this.texturePathPharo = null;

    this.height = height;
    this.radioPoste = radioPoste;
    this.radioPharo = radioPharo;
    this.delta = delta;

    this.poste = null;
    this.faro = null;

    this.posteShape = null;
    this.faroShape = null;

    this.all = null;

    this.initBuffers = function(){

        this.poste = new Cylinder(this.radioPoste, this.height, 1/this.delta);
        this.faro = new TexturedSphere(this.delta, this.delta);

        this.poste.initTexture(this.texturePathPoste);
        this.poste.initBot_TopTexture(this.texturePathPoste);
        this.faro.initTexture(this.texturePathPharo);

        this.posteShape = new Shape(this.poste, this.uniform);
        this.faroShape = new Shape(this.faro, this.uniform);

        this.all = new ShapeGroup();

        this.all.add(this.posteShape);
        this.all.add(this.faroShape);
        this.all.initBuffers();

        this.posteShape.rotate(Math.PI/2, 0.0, 0.0);
        this.posteShape.translate(0.0, -this.height/2 - 0.45, 0.0);

        this.faroShape.scale(radioPharo, radioPharo, radioPharo);
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