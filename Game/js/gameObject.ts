class GameObject {
    private _avatarX: number = 400;
    public set avatarX(value: number) {
        if (value < 0) {
            this._avatarX = 0;
        } else if (value > (550)) {
            this._avatarX = 550;
        } else {
            this._avatarX = value;
        }
    }

    public get avatarX(): number {
        return this._avatarX;
    }

    private _avatarY: number = 400;
    public set avatarY(value: number) {
        if (value < 0) {
            this._avatarY = 0;
        } else if (value > (550)) {
            this._avatarY = 550;
        } else {
            this._avatarY = value;
        }
    }

    public get avatarY(): number {
        return this._avatarY;
    }

    public velY: number = 0;
    public velX: number = 0;

    public maxSpeed = 10;

    public GameObject() {

    }

    public handleMovement() {
        this.avatarX += this.velX;
        this.avatarY += this.velY;
    }

    public handleKeys(keys: boolean[]) {
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
    }
} 