var GameObject = (function () {
    function GameObject() {
        this._avatarX = 400;
        this._avatarY = 400;
        this.velY = 0;
        this.velX = 0;
        this.maxSpeed = 10;
    }

    Object.defineProperty(GameObject.prototype, "avatarX", {
        get: function () {
            return this._avatarX;
        },
        set: function (value) {
            if (value < 0) {
                this._avatarX = 0;
            } else if (value > (Game.xBound - 50)) {
                this._avatarX = Game.xBound - 50;
            } else {
                this._avatarX = value;
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(GameObject.prototype, "avatarY", {
        get: function () {
            return this._avatarY;
        },
        set: function (value) {
            if (value < 0) {
                this._avatarY = 0;
            } else if (value > (Game.yBound - 50)) {
                this._avatarY = Game.yBound - 50;
            } else {
                this._avatarY = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    GameObject.prototype.GameObject = function () {
    };

    GameObject.prototype.handleMovement = function () {
        this.avatarX += this.velX;
        this.avatarY += this.velY;
    };

    GameObject.prototype.handleKeys = function (keys) {
        if (keys[37] && this.velX > -this.maxSpeed) {
            this.velX -= 0.5;
        } else if (this.velX < 0) {
            this.velX += 0.25;
        }

        if (keys[39] && this.velX < this.maxSpeed) {
            this.velX += 0.5;
        } else if (this.velX > 0) {
            this.velX -= 0.25;
        }

        if (keys[40] && this.velY < this.maxSpeed) {
            this.velY += 0.5;
        } else if (this.velY > 0) {
            this.velY -= 0.25;
        }

        if (keys[38] && this.velY > -this.maxSpeed) {
            this.velY -= 0.5;
        } else if (this.velY < 0) {
            this.velY += 0.25;
        }
    };
    return GameObject;
})();
//# sourceMappingURL=gameObject.js.map
