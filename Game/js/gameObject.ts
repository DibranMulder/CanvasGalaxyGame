interface CollisionObject {
    xPosition: number;
    yPosition: number;
    width: number;
    height: number;
}

class GameObject {
    public velY: number;
    public velX: number;

    constructor(public xPosition: number, public yPosition: number) {
    }
}

class Player extends GameObject {
    public maxSpeed = 7;
    public image: HTMLElement;

    constructor(xPosition: number, yPosition: number, public width: number, public height: number) {
        super(xPosition, yPosition);
        this.velY = 0;
        this.velX = 0;
        this.image = document.getElementById("enterprise");
    }

    public handleMovement() {
        this.xPosition += this.velX;
        this.yPosition += this.velY;
    }

    public checkCollision(object: CollisionObject): boolean {
        if (this.xPosition < object.xPosition + object.width &&
            this.xPosition + this.width > object.xPosition &&
            this.yPosition < object.yPosition + object.height &&
            this.height + this.yPosition > object.yPosition) {
            return true;
        }
        return false;
    }

    public handleKeys(keys: boolean[]) {
        // Left
        if (keys[37] && this.velX > -this.maxSpeed) {
            this.velX -= 0.5;
        } else if (this.velX < 0) {
            this.velX += 0.25;
        }
        // Up
        if (keys[39] && this.velX < this.maxSpeed) {
            this.velX += 0.5;
        } else if (this.velX > 0) {
            this.velX -= 0.25;
        }
        // Right
        if (keys[40] && this.velY < this.maxSpeed) {
            this.velY += 0.5;
        } else if (this.velY > 0) {
            this.velY -= 0.25;
        }
        // Down
        if (keys[38] && this.velY > -this.maxSpeed) {
            this.velY -= 0.5;
        } else if (this.velY < 0) {
            this.velY += 0.25;
        }
    }

    public fireTorpedo(): Torpedo {
        // Make sure the torpedo comes from the center of the player.
        return new Torpedo(this.xPosition + (this.width / 2), this.yPosition, 15);
    }

    public fireLaser(): Laser {
        return new Laser(this.xPosition + (this.width / 2), this.yPosition);
    }
}

class Torpedo extends GameObject {
    public color: string;

    constructor(xPosition: number, yPosition: number, public diameter: number) {
        super(xPosition, yPosition);
        this.velY = 5;
        this.color = "rgba(251,255,224, 0.5)";
    }

    public handleMovement(): boolean {
        if (this.yPosition < 0) {
            return false;
        } else {
            this.yPosition -= this.velY;
            return true;
        }
    }
}

class Laser extends GameObject {
    public color: string;
    public height: number = 40;
    public width: number = 3;

    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition);
        this.velY = 10;
        this.color = "#FF1900";
    }

    public handleMovement(): boolean {
        if (this.yPosition < 0) {
            return false;
        } else {
            this.yPosition -= this.velY;
            return true;
        }
    }
}