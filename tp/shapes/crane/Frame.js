Frame = function(objectUniform, material){

    this.uniform = objectUniform;
    this.material = material;
    this.texturePath = null;
    this.textureNormalMap = null;
    this.WheelTexturePath = null;
    this.WheelTopTexturePath = null;
    this.WheelTextureNormalMap = null;

    this.wheelRight = null;
    this.wheelLeft = null;

    this.boxVertRight = null;
    this.boxVertLeft  = null;

    this.boxHorizUp   = null;
    this.boxHorizMidd = null;
    this.boxHorizDown = null;

    this.wheelRightShape = null;
    this.wheelLeftShape = null;	

    this.boxVertRightShape = null;
    this.boxVertLeftShape  = null;

    this.boxHorizUpShape   = null;
    this.boxHorizMiddShape = null;
    this.boxHorizDownShape = null;

    this.all = null;

    this.initBuffers = function(){
        var condShader = {
            useNormalMap: true,
            useReflexion: false
        };

        this.boxVertRight = new Box(0.2,7,0.2, this.material, condShader);
        this.boxVertLeft = new Box(0.2,7,0.2, this.material, condShader);
        this.boxHorizUp = new Box(2.6,0.2,0.2, this.material, condShader);
        this.boxHorizMidd = new Box(3.4,0.15,0.15, this.material, condShader);
        this.boxHorizDown = new Box(2.6,0.2,0.2, this.material, condShader);

        this.wheelRight = new Cylinder(0.3,0.3,0.1, this.material, condShader);
        this.wheelLeft = new Cylinder(0.3,0.3,0.1, this.material, condShader);		

        this.boxVertRight.initTexture(this.texturePath);
        this.boxVertLeft.initTexture(this.texturePath);
        this.boxHorizUp.initTexture(this.texturePath);
        this.boxHorizMidd.initTexture(this.texturePath);
        this.boxHorizDown.initTexture(this.texturePath);

        this.boxVertRight.initNormalMap(this.textureNormalMap);
        this.boxVertLeft.initNormalMap(this.textureNormalMap);
        this.boxHorizUp.initNormalMap(this.textureNormalMap);
        this.boxHorizMidd.initNormalMap(this.textureNormalMap);
        this.boxHorizDown.initNormalMap(this.textureNormalMap);

        this.wheelRight.initBuffers();
        this.wheelRight.initTexture(this.WheelTexturePath, this.WheelTextureNormalMap);
        this.wheelRight.initBot_TopTexture(this.WheelTopTexturePath);

        this.wheelLeft.initBuffers();
        this.wheelLeft.initTexture(this.WheelTexturePath, this.WheelTextureNormalMap);
        this.wheelLeft.initBot_TopTexture(this.WheelTopTexturePath);

        this.boxVertRightShape = new Shape(this.boxVertRight,this.uniform);
        this.boxVertLeftShape  = new Shape(this.boxVertLeft,this.uniform);
        this.boxHorizUpShape   = new Shape(this.boxHorizUp,this.uniform);
        this.boxHorizMiddShape = new Shape(this.boxHorizMidd,this.uniform);
        this.boxHorizDownShape = new Shape(this.boxHorizDown,this.uniform);

        this.wheelRightShape = new Shape(this.wheelRight,this.uniform);
        this.wheelLeftShape = new Shape(this.wheelLeft,this.uniform);

        this.all = new ShapeGroup();

        this.all.add(this.boxVertRightShape);
        this.all.add(this.boxVertLeftShape);
        this.all.add(this.boxHorizUpShape);
        this.all.add(this.boxHorizMiddShape);
        this.all.add(this.boxHorizDownShape);
        this.all.add(this.wheelRightShape);
        this.all.add(this.wheelLeftShape);		
        this.all.initBuffers();

        this.boxVertRightShape.translate(1.4,0,0);
        this.boxVertLeftShape.translate(-1.4,0,0);

        this.wheelLeftShape.translate(-1.4,-3.5,0);
        this.wheelRightShape.translate(1.4,-3.5,0);
        this.wheelLeftShape.rotate(Math.PI,-Math.PI/2,0.0);
        this.wheelRightShape.rotate(Math.PI,-Math.PI/2,0.0);

        this.boxHorizUpShape.translate(0,3.4,0);
        this.boxHorizMiddShape.translate(0,2.25,0);
        this.boxHorizMiddShape.rotate(0,0,-Math.PI/4.5);
        this.boxHorizDownShape.translate(0,1,0);		
    }

    this.initTexture = function(texturePath, textureNormalMap){
        this.texturePath = texturePath;
        this.textureNormalMap = textureNormalMap;
    }

    this.initTextureWheel = function(WheelTexturePath,WheelTopTexturePath, WheelNormalMap){
        this.WheelTexturePath = WheelTexturePath;
        this.WheelTopTexturePath = WheelTopTexturePath;
        this.WheelTextureNormalMap = WheelNormalMap;
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