class Game
{
    public xBound: number = 600;
    public yBound: number = 600;

    public motionKeys: boolean[] = [];

    public lasers: Laser[] = [];
    public torpedos: Torpedo[] = [];
    public players: Player[] = [];

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
    }

    public gameLoop() {
        var quit = false;
        // Clear canvas
        this.canvas.width = 600;
        this.canvas.height = 600;
        // Draw galaxy
        this.galaxy.draw(this.context);
        // Draw players
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            player.handleKeys(this.motionKeys);
            player.handleMovement();

            for (var g = 0; g < this.galaxy.asteroids.length; g++) {
                if (player.checkCollision(this.galaxy.asteroids[g])) {
                    alert("Collision detected");
                    quit = true;
                }
            }
            player.checkBounds();
            player.draw(this.context);
        }
        // Draw lasers
        for (var i = 0; i < this.lasers.length; i++) {
            var laser = this.lasers[i];
            laser.handleMovement();
            if (laser.checkBounds()) {
                this.lasers.splice(i, 1);
            }
            for (var g = 0; g < this.galaxy.asteroids.length; g++) {
                if (laser.checkCollision(this.galaxy.asteroids[g])) {
                    if (this.galaxy.asteroids[g].explode(this.context)) {
                        this.galaxy.asteroids.splice(g, 1);
                        this.lasers.splice(i, 1);
                    }
                }
            }
            laser.draw(this.context);
        }
        // Draw torpedos
        for (var i = 0; i < this.torpedos.length; i++) {
            var torpedo = this.torpedos[i];
            torpedo.handleMovement();
            if (torpedo.checkBounds()) {
                this.torpedos.splice(i, 1);
            }
            torpedo.draw(this.context);
        }
        // Draw statuses
        this.drawStatus(500, 20, 80, 20, "#FF0400", 100); // Health
        this.drawStatus(500, 50, 80, 20, "#526CFF", 100); // Shield
        this.drawStatus(500, 80, 80, 20, "#FFF700", 100); // Energy

        if (!quit) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    private drawStatus(x: number, y: number, width: number, height: number, color: string, percentage: number) {
        this.context.strokeStyle = "#FFFFFF";
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + width, y);
        this.context.lineTo(x + width, y + height);
        this.context.lineTo(x, y + height);
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.fillStyle = color;
        this.context.fillRect(x + 1, y + 1, width - 2, height - 2);
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