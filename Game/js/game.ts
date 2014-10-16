class Game
{
    public xBound: number = 600;
    public yBound: number = 600;

    public motionKeys: boolean[] = [];

    public lasers: Laser[] = [];
    public torpedos: Torpedo[] = [];
    public players: Player[] = [];
    public walls: Wall[] = [];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private galaxy: Galaxy;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("world");
        this.canvas.onclick = () => {
            this.torpedos.push(this.players[0].fireTorpedo());
        };

        this.context = this.canvas.getContext("2d");
        this.galaxy = new Galaxy();
        this.galaxy.render_stars(600, 600);
    }

    public gameLoop() {
        // Clear canvas
        this.canvas.width = 600;
        this.canvas.height = 600;

        for (var i = 0; i < this.galaxy.stars.length; i++) {
            var star = this.galaxy.stars[i];
            this.context.fillStyle = star.color;
            this.context.fillRect(star.x, star.y, 1, 1);
        }
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            this.context.fillStyle = "#FA8237";
            this.context.fillRect(wall.x, wall.y, wall.width, wall.height);
        }
        // Draw players
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            player.handleKeys(this.motionKeys);
            var collision = player.handleMovement(this.walls[0]);
            this.checkBounds(player);
            this.context.drawImage(player.image, player.xPosition, player.yPosition, player.width, player.height);
        }
        // Lasers
        for (var i = 0; i < this.lasers.length; i++) {
            var laser = this.lasers[i];
            if (!laser.handleMovement()) {
                this.lasers.splice(i, 1);
                continue;
            }
            this.context.fillStyle = laser.color;
            this.context.fillRect(laser.xPosition, laser.yPosition - laser.height, laser.width, laser.height);
        }
        // Torpedos
        for (var i = 0; i < this.torpedos.length; i++) {
            var torpedo = this.torpedos[i];
            if (!torpedo.handleMovement()) {
                this.torpedos.splice(i, 1);
                continue;
            }
            this.context.globalCompositeOperation = "lighter";
            this.context.beginPath();

            var gradient = this.context.createRadialGradient(torpedo.xPosition, torpedo.yPosition, 0, torpedo.xPosition, torpedo.yPosition, torpedo.diameter);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(0.4, "white");
            gradient.addColorStop(0.4, torpedo.color);
            gradient.addColorStop(1, "black");

            this.context.fillStyle = gradient;
            this.context.arc(torpedo.xPosition, torpedo.yPosition, torpedo.diameter, 0, 360, false);
            this.context.fill();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public checkBounds(object: Player) {
        if (object.xPosition < 0) {
            object.xPosition = 0;
        } else {
            var maxX = 600 - object.width;
            if (object.xPosition > maxX) {
                object.xPosition = maxX;
            }
        }

        if (object.yPosition < 0) {
            object.yPosition = 0;
        } else {
            var maxY = 600 - object.height;
            if (object.yPosition > maxY) {
                object.yPosition = maxY;
            }
        }
    }

    public handleKeyPress(keyCode: number) {
        // Space
        if (keyCode == 32) {
            this.torpedos.push(this.players[0].fireTorpedo());
        } else if (keyCode == 13) {
            this.lasers.push(this.players[0].fireLaser());
        }
    }
}

window.onload = function () {
    var requestAnimationFrame = (<any>window).requestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var game = new Game();
    game.players.push(new Player(400, 400, 26, 50));
    game.walls.push(new Wall(150, 350, 20, 200));

    window.addEventListener("keydown", function (e) {
        game.motionKeys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
        game.motionKeys[e.keyCode] = false;
    });
    window.addEventListener("keypress", function (e) {
        game.handleKeyPress(e.keyCode);
    });

    game.gameLoop();
};