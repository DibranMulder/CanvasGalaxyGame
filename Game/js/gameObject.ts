class Player {
    private velY: number = 0;
    private velX: number = 0;

    public maxSpeed = 7;
    public image: HTMLElement;
    public laserFired: boolean = false;

    constructor(public xPosition: number, public yPosition: number, public width: number, public height: number) {
        this.image = document.getElementById("enterprise");
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
        // Enter
        this.laserFired = keys[13];
    }

    public fireTorpedo(): Torpedo {
        // Make sure the torpedo comes from the center of the player.
        return new Torpedo(this.xPosition + (this.width / 2), this.yPosition, 15);
    }
}

class Torpedo {
    private velY: number = 5;
    public color: string;

    constructor(public xPosition: number, public yPosition: number, public diameter: number) {
        this.color = "rgba(251,255,224, 0.5)";
        this.color = "#FBFFE0";
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