class Player extends MovableObject {
    public health: number = 100;
    public energy: number = 100;
    public shield: number = 100;

    public maxSpeed = 7;
    public image: HTMLElement;
    public shieldImage: HTMLElement;

    public dealingDamage: boolean;

    constructor(xPosition: number, yPosition: number, width: number, height: number) {
        super(xPosition, yPosition, width, height);
        this.velY = 0;
        this.velX = 0;
        this.dealingDamage = false;
        this.image = document.getElementById("enterprise");
        this.shieldImage = document.getElementById("shield");
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

    public dealDamage(damage: number): boolean {
        this.dealingDamage = true;
        if (this.shield > 0) {
            if (this.shield < damage) {
                damage -= this.shield;
                this.shield = 0;
            } else {
                this.shield -= damage;
            }            
        }

        if (this.shield <= 0) {
            this.health -= damage;
            if (this.health <= 0) {
                return true;
            }
        }

        setTimeout(() => {
            this.dealingDamage = false;
        }, 1000);

        return false;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.xPosition, this.yPosition, this.width, this.height);
        if (this.dealingDamage && this.shield > 0) {
            context.drawImage(this.shieldImage, this.xPosition - 17, this.yPosition - 5, 60, 60);
        }
    }

    public fireTorpedo(): Torpedo {
        // Make sure the torpedo comes from the center of the player.
        return new Torpedo(this.xPosition + (this.width / 2), this.yPosition, 14);
    }

    public fireLaser(): Laser {
        return new Laser(this.xPosition + (this.width / 2), this.yPosition);
    }

    public checkBounds(): boolean {
        if (this.xPosition < 0) {
            this.xPosition = 0;
        } else {
            var maxX = 600 - this.width;
            if (this.xPosition > maxX) {
                this.xPosition = maxX;
            }
        }

        if (this.yPosition < 0) {
            this.yPosition = 0;
        } else {
            var maxY = 600 - this.height;
            if (this.yPosition > maxY) {
                this.yPosition = maxY;
            }
        }
        return false;
    }
}