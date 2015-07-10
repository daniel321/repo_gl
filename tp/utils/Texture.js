Texture = function (texture_file) {

    this.texture = null;
    this.texture_file = texture_file;

    this.initTexture = function(){

        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        var texture = this.texture;
        var image = this.texture.image;

        this.texture.image.onload = function () {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);

            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        this.texture.image.src = this.texture_file;
    }

    this.getTexture = function() {
        return this.texture;
    }
}