class Galaxy {
    // The number of "star groups" to generate. 
    private number_of_groups = 100;
    // The radius of the group of stars 
    private group_radius = 100;
    private group_gravity = 2;
    // The number of stars per group. 
    private stars_per_group = 20;

    public stars: Star[] = [];
    public asteroids: Asteroid[] = [];

    constructor() {

    }

    private color_cap(c) {
        return Math.min(255, Math.max(0, c));
    }

    // Calculate RGB color for color temp. in Kelvin. Only supports range 1000 ~ 40'000. 
    private color_temperature_to_color_string(k) {
        var temperature = k / 100;
        var r = temperature <= 66 ? 255 : this.color_cap(329.698727446 * Math.pow(temperature - 60, - 0.1332047592));
        var g = this.color_cap(temperature <= 66 ? (99.4708025861 * Math.log(temperature) - 161.1195681661) : (288.1221695283 * Math.pow(temperature - 60, -0.0755148492)));
        var b = temperature >= 66 ? 255 : this.color_cap(138.5177312231 * Math.log(temperature - 10) - 305.0447927307);
        return "rgb(" + r.toFixed() + "," + g.toFixed() + "," + b.toFixed() + ")";
    }

    private random_color_temperature() {
        // 2000 ~ 2000*8 
        return Math.pow(8, Math.random()) * 2000;
    }

    private random_star_color() {
        return this.color_temperature_to_color_string(this.random_color_temperature());
    }

    private render_star(x, y) {
        this.stars.push(new Star(x, y, this.random_star_color()));
    }

    private render_group(x, y) {
        for (var i = 0; i < this.stars_per_group; i++) {
            var distance = Math.pow(Math.random(), this.group_gravity) * this.group_radius;
            var angle = Math.random() * Math.PI * 2;
            var star_x = x - Math.sin(angle) * distance;
            var star_y = y + Math.cos(angle) * distance;

            // round here to prevent "blurred" stars 
            this.render_star(Math.round(star_x), Math.round(star_y));
        }
    }

    public renderStars(width, height) {
        for (var i = 0; i < this.number_of_groups; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            this.render_group(x, y);
        }
    }

    public renderAsteroid() {
        this.asteroids.push(new Asteroid(100, 100));
    }
}

class Asteroid extends MovableObject implements CollisionObject, DrawableObject {
    public width: number = 72;
    public height: number = 72;
    public image: HTMLImageElement;

    public radians: number = 0;
    private angle: number = 0;

    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition);
        this.velY = 2;
        this.image = new Image();
        this.image.src = "images/asteroid.png";
    }

    public bumpRotation() {
        var TO_RADIANS = Math.PI / 180;
        this.angle += 1;
        if (this.angle >= 360) this.angle = 0;
        this.radians = this.angle * TO_RADIANS;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "#FF00D0";
        context.fillRect(this.xPosition, this.yPosition, this.width, this.height);
        this.bumpRotation();
        context.save();
        context.translate(this.xPosition + (this.width / 2), this.yPosition + (this.height / 2));
        context.rotate(this.radians);
        context.drawImage(this.image, 0, 0, this.width, this.height, -(this.width / 2), -(this.height / 2), this.width, this.height);
        context.restore();
    }
}

class Star extends MovableObject implements DrawableObject {
    constructor(xPosition: number, yPosition: number, public color: string) {
        super(xPosition, yPosition);
        this.velY = 1;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.xPosition, this.yPosition, 1, 1);
    }
}