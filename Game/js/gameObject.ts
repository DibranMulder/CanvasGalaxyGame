class Player {
    private velY: number = 0;
    private velX: number = 0;

    public maxSpeed = 10;
    public image: HTMLElement;

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

    public fireTorpedo(): Torpedo {
        // Make sure the torpedo comes from the center of the player.
        return new Torpedo(this.xPosition + (this.width / 2), this.yPosition, 3, 3);
    }
}

class Torpedo {
    private velY: number = 5;
    public color: string;

    constructor(public xPosition: number, public yPosition: number, public width: number, public height: number) {
        this.color = "#FF0000";
    }

    public handleMovement() {
        this.yPosition -= this.velY;
    }
}