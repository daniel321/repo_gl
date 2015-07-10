Cabin = function(width, height, depth, angle, material){
    this.texturePath = null;
    this.textureNormalMap = null;
    this.material = material;

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.angle = angle;

    this.planeFrontalPositions = [];
    this.planeSidePositions = [];
    this.planeLowerPositions = [];

    this.planeFrontal = null;
    this.planeBack = null;
    this.planeSideLeft = null;
    this.planeSideRight = null;
    this.planeTop = null;
    this.planeLower = null;

    this.planeFrontalShape = null;
    this.planeBackShape = null;
    this.planeSideLeftShape = null;
    this.planeSideRightShape = null;
    this.planeTopShape = null;
    this.planeLowerShape = null;

    this.all = null;

    this.initBuffers = function(){
        var condShader = {
            useNormalMap: true,
            useReflexion: true
        };

        this.createPositions(0.1, 0.4);

        this.planeFrontal = new PlaneWindow(this.planeFrontalPositions, this.material);
        this.planeBack = new Plane(this.width, this.height, 2, 2, false, this.material, condShader);
        this.planeSideLeft = new PlaneWindow(this.planeSidePositions, this.material);
        this.planeSideLeft.setNormal([0.0, 0.0, -1.0]);
        this.planeSideLeft.setTangente([0.0, 1.0, 0.0]);
        this.planeSideRight = new PlaneWindow(this.planeSidePositions, this.material);
        this.planeSideRight.setNormal([0.0, 0.0, 1.0]);
        this.planeSideRight.setTangente([0.0, -1.0, 0.0]);
        this.planeTop = new Plane(this.width, this.depth - (this.height/Math.tan((Math.PI/2) - this.angle)), 2, 2, false, this.material, condShader);
        this.planeTop.setNormal([1.0, 0.0, 0.0]);
        this.planeTop.setTangente([0.0, 0.0, -1.0]);
        this.planeLower = new PlaneWindow(this.planeLowerPositions, this.material);

        this.planeFrontal.initTexture(this.texturePath);
        this.planeBack.initTexture(this.texturePath);
        this.planeSideLeft.initTexture(this.texturePath);
        this.planeSideRight.initTexture(this.texturePath);
        this.planeTop.initTexture(this.texturePath);
        this.planeLower.initTexture(this.texturePath);

        this.planeFrontal.initNormalMap(this.textureNormalMap);
        this.planeBack.initNormalMap(this.textureNormalMap);
        this.planeSideLeft.initNormalMap(this.textureNormalMap);
        this.planeSideRight.initNormalMap(this.textureNormalMap);
        this.planeTop.initNormalMap(this.textureNormalMap);
        this.planeLower.initNormalMap(this.textureNormalMap);

        this.planeFrontalShape = new Shape(this.planeFrontal);
        this.planeBackShape = new Shape(this.planeBack);
        this.planeSideLeftShape = new Shape(this.planeSideLeft);
        this.planeSideRightShape = new Shape(this.planeSideRight);
        this.planeTopShape = new Shape(this.planeTop);
        this.planeLowerShape = new Shape(this.planeLower);

        this.all = new ShapeGroup();

        this.all.add(this.planeFrontalShape);
        this.all.add(this.planeBackShape);
        this.all.add(this.planeSideLeftShape);
        this.all.add(this.planeSideRightShape);
        this.all.add(this.planeTopShape);
        this.all.add(this.planeLowerShape);
        this.all.initBuffers();

        this.planeFrontalShape.rotate(0.0, Math.PI/2, 0.0);
        this.planeFrontalShape.rotate(-this.angle, 0.0, 0.0);
        this.planeFrontalShape.translate(this.depth, 0.0, this.width);

        this.planeBackShape.rotate(0.0, Math.PI/2, 0.0);
        this.planeBackShape.translate(0.0, 0.0, this.width);

        this.planeSideRightShape.translate(0.0,0.0,this.width);

        this.planeTopShape.rotate(Math.PI/2, Math.PI, Math.PI/2);
        this.planeTopShape.translate(0.0, this.height, 0.0);

        this.planeLowerShape.rotate(Math.PI/2, 0.0, 0.0);
    }

    this.initTexture = function(texturePath, textureNormalMap){
		this.texturePath = texturePath;
        this.textureNormalMap = textureNormalMap;
	}

    this.createPositions = function(propBorder, propBlind){

        var a =[0, 0];
        var b =[0, this.height/Math.cos(this.angle)];
        var c =[propBorder, 0];
        var d =[propBorder, propBorder];
        var e =[propBorder, (this.height/Math.cos(this.angle)) - propBorder];
        var f =[propBorder, this.height/Math.cos(this.angle)];
        var g =[this.width - propBorder, propBorder];
        var h =[this.width - propBorder, (this.height/Math.cos(this.angle)) - propBorder];
        var i =[this.width, 0];
        var j =[this.width, (this.height/Math.cos(this.angle))];

        this.planeFrontalPositions.push(a[0]);
        this.planeFrontalPositions.push(a[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(b[0]);
        this.planeFrontalPositions.push(b[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(c[0]);
        this.planeFrontalPositions.push(c[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(d[0]);
        this.planeFrontalPositions.push(d[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(e[0]);
        this.planeFrontalPositions.push(e[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(f[0]);
        this.planeFrontalPositions.push(f[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(g[0]);
        this.planeFrontalPositions.push(g[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(h[0]);
        this.planeFrontalPositions.push(h[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(i[0]);
        this.planeFrontalPositions.push(i[1]);
        this.planeFrontalPositions.push(0);

        this.planeFrontalPositions.push(j[0]);
        this.planeFrontalPositions.push(j[1]);
        this.planeFrontalPositions.push(0);

        a =[0, 0];
        b =[0, this.height];
        c =[propBlind, 0];
        d =[propBlind, propBorder];
        e =[propBlind - ((this.height - (2*propBorder))/(Math.tan((Math.PI/2) - this.angle))), this.height - propBorder];
        f =[propBlind - ((this.height - (2*propBorder))/(Math.tan((Math.PI/2) - this.angle))), this.height];
        g =[this.depth - propBorder, propBorder];
        h =[(this.depth - propBorder) - ((this.height - (2*propBorder))/(Math.tan((Math.PI/2) - this.angle))), this.height - propBorder];
        i =[this.depth, 0];
        j =[this.depth - (this.height/(Math.tan((Math.PI/2) - this.angle))), this.height];

        this.planeSidePositions.push(a[0]);
        this.planeSidePositions.push(a[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(b[0]);
        this.planeSidePositions.push(b[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(c[0]);
        this.planeSidePositions.push(c[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(d[0]);
        this.planeSidePositions.push(d[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(e[0]);
        this.planeSidePositions.push(e[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(f[0]);
        this.planeSidePositions.push(f[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(g[0]);
        this.planeSidePositions.push(g[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(h[0]);
        this.planeSidePositions.push(h[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(i[0]);
        this.planeSidePositions.push(i[1]);
        this.planeSidePositions.push(0);

        this.planeSidePositions.push(j[0]);
        this.planeSidePositions.push(j[1]);
        this.planeSidePositions.push(0);

        a =[0, 0];
        b =[0, this.width];
        c =[propBlind, 0];
        d =[propBlind, propBorder];
        e =[propBlind, this.width - propBorder];
        f =[propBlind, this.width];
        g =[this.depth - propBorder, propBorder];
        h =[this.depth - propBorder, this.width - propBorder];
        i =[this.depth, 0];
        j =[this.depth, this.width];

        this.planeLowerPositions.push(a[0]);
        this.planeLowerPositions.push(a[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(b[0]);
        this.planeLowerPositions.push(b[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(c[0]);
        this.planeLowerPositions.push(c[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(d[0]);
        this.planeLowerPositions.push(d[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(e[0]);
        this.planeLowerPositions.push(e[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(f[0]);
        this.planeLowerPositions.push(f[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(g[0]);
        this.planeLowerPositions.push(g[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(h[0]);
        this.planeLowerPositions.push(h[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(i[0]);
        this.planeLowerPositions.push(i[1]);
        this.planeLowerPositions.push(0);

        this.planeLowerPositions.push(j[0]);
        this.planeLowerPositions.push(j[1]);
        this.planeLowerPositions.push(0);
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