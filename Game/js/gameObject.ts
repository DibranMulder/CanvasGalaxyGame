interface DrawableObject {
    draw(context: CanvasRenderingContext2D);
}

interface CollisionObject extends MovableObject {
    width: number;
    height: number;
    disappearing: boolean;
}

class MovableObject {
    public velY: number;
    public velX: number;
    public maxX: number;
    public maxY: number;

    constructor(public xPosition: number, public yPosition: number, public width: number, public height: number) {
        this.velX = 0;
        this.velY = 0;
        this.maxX = 600 - this.width;
        this.maxY = 600 - this.height;
    }

    public handleMovement() {
        this.xPosition += this.velX;
        this.yPosition += this.velY;
    }

    public checkBounds(): boolean {
        return (this.xPosition < 0 ||
                this.xPosition > this.maxX ||
                this.yPosition < 0 ||
                this.yPosition > this.maxY);
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

}

class Torpedo extends MovableObject implements DrawableObject {
    public color: string;
    private radius: number;

    constructor(xPosition: number, yPosition: number, public diameter: number) {
        super(xPosition, yPosition, diameter, diameter);
        this.radius = diameter / 2;
        this.velY = -5;
        this.color = "rgba(251,255,224, 0.5)";
    }

    public draw(context: CanvasRenderingContext2D) {
        context.globalCompositeOperation = "lighter";
        context.beginPath();

        var gradient = context.createRadialGradient(this.xPosition, this.yPosition, 0, this.xPosition, this.yPosition, this.diameter);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.4, "white");
        gradient.addColorStop(0.4, this.color);
        gradient.addColorStop(1, "black");

        context.fillStyle = gradient;
        context.arc(this.xPosition, this.yPosition, this.diameter, 0, 360, false);
        context.fill();

        context.fillStyle = "#FF1900";
        context.fillRect(this.xPosition, this.yPosition, 1, 1);
    }

    public checkBounds(): boolean {
        return ((this.xPosition - this.radius) < 0 ||
            this.xPosition > (this.maxX - this.radius) ||
            (this.yPosition - this.radius) < 0 ||
            this.yPosition > (this.maxY - this.radius));
    }
}

class Laser extends MovableObject implements DrawableObject {
    public color: string;
    public height: number = 40;
    public width: number = 3;

    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition, 3, 40);
        this.velY = -10;
        this.color = "#FF1900";
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.xPosition, this.yPosition - this.height, this.width, this.height);
    }
}