Light = function(material){
    this.material = material;
    this.texturePath = null;

    this.ball = null;
    this.ballShape = null;

    this.all = null;

    this.initBuffers = function(){

        var deltaSphere = 32;
        var radioSphere = 0.1;

        this.ball = new TexturedSphere(deltaSphere, deltaSphere, this.material, true);
        this.ball.initTexture(this.texturePath);

        this.ballShape = new Shape(this.ball);

        this.all = new ShapeGroup();

        this.all.add(this.ballShape);
        this.all.initBuffers();

        this.ballShape.scale(radioSphere, radioSphere, radioSphere);
    }

    this.initTexture = function(texturePath){
        this.texturePath = texturePath;
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