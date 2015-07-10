BezierCuadCurve = function (controlPoints, vectPerp, resolution){
    this.tambcuad = resolution;

    this.controlPoints = controlPoints;
    this.vectPerp = vectPerp;

    this.position_buffer = [];
    this.normal_buffer = [];
    this.index_buffer = [];

    this.calculateCurve = function(){		
        var cont = 0;
        for (var p=0; p < controlPoints.length-6; p+=6){

            var p0 = [controlPoints[p],controlPoints[p+1],controlPoints[p+2]];
            var p1 = [controlPoints[p+3],controlPoints[p+4],controlPoints[p+5]];
            var p2 = [controlPoints[p+6],controlPoints[p+7],controlPoints[p+8]];

            for (var t=0.0; t<=1; t+= (1.0/this.tambcuad)){

                var b0 = (1-t)*(1-t);
                var b1 = 2*(1-t)*t;
                var b2 = (t*t);

                var x = p0[0]*b0 + p1[0]*b1 + p2[0]*b2;
                var y = p0[1]*b0 + p1[1]*b1 + p2[1]*b2;	
                var z = p0[2]*b0 + p1[2]*b1 + p2[2]*b2;

                this.position_buffer.push(x);
                this.position_buffer.push(y);
                this.position_buffer.push(z);

                this.index_buffer.push(cont++);
            }
        }
    }

    this.calculateNormals = function(){
        var utils = new VectorUtils();
        
        for (var p=0; p < controlPoints.length-6; p+=6){

            var p0 = [controlPoints[p],controlPoints[p+1],controlPoints[p+2]];
            var p1 = [controlPoints[p+3],controlPoints[p+4],controlPoints[p+5]];
            var p2 = [controlPoints[p+6],controlPoints[p+7],controlPoints[p+8]];

            for (var t=0.0; t<=1; t+= (1.0/this.tambcuad)){

                var b0 = (2*t)-2;
                var b1 = -(4*t)+2;
                var b2 = (2*t);

                var x = p0[0]*b0 + p1[0]*b1 + p2[0]*b2;
                var y = p0[1]*b0 + p1[1]*b1 + p2[1]*b2;	
                var z = p0[2]*b0 + p1[2]*b1 + p2[2]*b2;
                
                var tg = utils.normalize([x, y, z]);
                var normal = utils.normalize(utils.cross(this.vectPerp, tg));

                this.normal_buffer.push(normal[0]);
                this.normal_buffer.push(normal[1]);
                this.normal_buffer.push(normal[2]);
            }
        }
    }	

    this.initBuffers = function(){
        this.calculateCurve();
        this.calculateNormals();
    }	

    this.getPoints = function(){
        return this.position_buffer;
    }

    this.getPerp = function(){
        return this.vectPerp;
    }

    this.getNormals = function(){
        return this.normal_buffer;
    }
};
