class GameObject {
    private velY: number = 0;
    private velX: number = 0;

    public maxSpeed = 10;

    constructor(public xPosition: number, public yPosition: number, public width: number, public height: number) {
    }

    public handleMovement(wall: Wall): boolean {
        this.xPosition += this.velX;
        this.yPosition += this.velY;

        if (this.xPosition < wall.x + wall.width &&
            this.xPosition + this.width > wall.x &&
            this.yPosition < wall.y + wall.height &&
            this.height + this.yPosition > wall.y) {
            return true;
        }
        return false;
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