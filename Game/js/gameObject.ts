class GameObject {
    private velY: number = 0;
    private velX: number = 0;

    public maxSpeed = 10;

    constructor(public xPosition: number, public yPosition: number, public width: number, public height: number) {
    }

    public handleMovement(wall: Wall): boolean {
        var xCol: boolean = false;
        var yCol: boolean = false;

        var newXFromPosition = this.xPosition += this.velX;
        var newXToPosition = newXFromPosition + this.width;
        if (this.velX > 0) {
            if (newXToPosition > wall.x && newXToPosition < (wall.x + wall.width)) {
                xCol = true;
            }
        } else {
            if (newXFromPosition > wall.x && newXFromPosition < (wall.x + wall.width)) {
                xCol = true;
            }
        }

        var newYFromPosition = this.yPosition += this.velY;
        var newYToPosition = newYFromPosition + this.height;
        if (this.velY > 0) {
            if (newYToPosition > wall.y && newYToPosition < (wall.y + wall.height)) {
                yCol = true;
            }
        } else {
            if (newYFromPosition > wall.y && newYFromPosition < (wall.y + wall.height)) {
                yCol = true;
            }
        }

        if (xCol && yCol && this.velX != 0) {
            if (this.velX > 0) {
                this.xPosition = wall.x - this.width;
            } else if (this.velX < 0) {
                this.xPosition = wall.x + wall.width;
            }
        } else {
            this.xPosition = newXFromPosition;
        }

        if (xCol && yCol && this.velY != 0) {
            if (this.velY > 0) {
                this.yPosition = wall.y - this.height;
            } else if (this.velY < 0) {
                this.yPosition = wall.y + wall.height;
            }
        } else {
            this.yPosition = newYFromPosition;
        }

        return (xCol || yCol);
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