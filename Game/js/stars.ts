class Galaxy {
    // The number of "star groups" to generate. 
    private numberOfGroups = 10;
    // The radius of the group of stars 
    private groupRadius = 100;
    private groupGravity = 2;
    // The number of stars per group. 
    private starsPerGroup = 15;

    public stars: Star[] = [];

    constructor() {
        this.renderStars(false);
        this.renderStars(true);
    }

    private colorCap(c) {
        return Math.min(255, Math.max(0, c));
    }

    // Calculate RGB color for color temp. in Kelvin. Only supports range 1000 ~ 40'000. 
    private colorTemperatureToColorString(k) {
        var temperature = k / 100;
        var r = temperature <= 66 ? 255 : this.colorCap(329.698727446 * Math.pow(temperature - 60, - 0.1332047592));
        var g = this.colorCap(temperature <= 66 ? (99.4708025861 * Math.log(temperature) - 161.1195681661) : (288.1221695283 * Math.pow(temperature - 60, -0.0755148492)));
        var b = temperature >= 66 ? 255 : this.colorCap(138.5177312231 * Math.log(temperature - 10) - 305.0447927307);
        return "rgb(" + r.toFixed() + "," + g.toFixed() + "," + b.toFixed() + ")";
    }

    private randomColorTemperature() {
        // 2000 ~ 2000*8 
        return Math.pow(8, Math.random()) * 2000;
    }

    private randomStarColor() {
        return this.colorTemperatureToColorString(this.randomColorTemperature());
    }

    private renderStar(x, y) {
        this.stars.push(new Star(x, y, this.randomStarColor()));
    }

    private renderGroup(x, y) {
        for (var i = 0; i < this.starsPerGroup; i++) {
            var distance = Math.pow(Math.random(), this.groupGravity) * this.groupRadius;
            var angle = Math.random() * Math.PI * 2;
            var star_x = x - Math.sin(angle) * distance;
            var star_y = y + Math.cos(angle) * distance;

            // round here to prevent "blurred" stars 
            this.renderStar(Math.round(star_x), Math.round(star_y));
        }
    }

    private drawIteration: number = 0;
    public renderStars(additional: boolean) {
        for (var i = 0; i < this.numberOfGroups; i++) {
            var x = Math.random() * 599; // minus star width
            var y = Math.random() * 600;
            if (additional) {
                y = y - 600;
            }
            this.renderGroup(x, y);
        }
    }

    public draw(context: CanvasRenderingContext2D) {
        if (this.drawIteration == 600) {
            this.renderStars(true);
            this.drawIteration = 0;
        }
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            star.handleMovement();

            if (star.yPosition > 0) {
                if (star.checkBounds()) {
                    this.stars.splice(i, 1);
                }
                star.draw(context);
            }
        }
        
        this.drawIteration++;
    }
}

class Asteroid extends MovableObject implements CollisionObject {
    private asteroidImage: HTMLImageElement;
    private explodeImage: HTMLImageElement;

    public radians: number = 0;
    private angle: number = 0;

    public disappearing: boolean = false;

    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition, 72, 72);
        this.velY = 2;
        this.asteroidImage = new Image();
        this.asteroidImage.src = "images/asteroid.png";
        this.explodeImage = new Image();
        this.explodeImage.src = "images/explode.png";
    }

    public bumpRotation() {
        var TO_RADIANS = Math.PI / 180;
        this.angle += 1;
        if (this.angle >= 360) this.angle = 0;
        this.radians = this.angle * TO_RADIANS;
    }

    public bumpExplosion(): boolean {
        this.explodeIteration++;
        return this.explodeIteration == 10;
    }

    private explodeIteration: number = 1;
    public draw(context: CanvasRenderingContext2D) {
        if (!this.disappearing) {
            this.bumpRotation();
            context.save();
            context.translate(this.xPosition + (this.width / 2), this.yPosition + (this.height / 2));
            context.rotate(this.radians);
            context.drawImage(this.asteroidImage, 0, 0, this.width, this.height, -(this.width / 2), -(this.height / 2), this.width, this.height);
            context.restore();
            return true;
        } else {
            context.drawImage(this.explodeImage, 1280 - (128 * this.explodeIteration), 768, 128, 128, this.xPosition, this.yPosition, 72, 72);
        }
    }

    public explode(context: CanvasRenderingContext2D) {
        this.disappearing = true;
    }
}

class Star extends MovableObject {
    constructor(xPosition: number, yPosition: number, public color: string) {
        super(xPosition, yPosition, 1, 1);
        this.velY = 1;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.xPosition, this.yPosition, this.width, this.height);
    }
}