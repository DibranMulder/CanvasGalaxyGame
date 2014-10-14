class Game
{
    public xBound: number = 600;
    public yBound: number = 600;

    public motionKeys: boolean[] = [];

    public torpedos: Torpedo[] = [];
    public players: Player[] = [];
    public walls: Wall[] = [];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private galaxy: Galaxy;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("world");
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
        for (var i = 0; i < this.torpedos.length; i++) {
            var bullet = this.torpedos[i];
            bullet.handleMovement();
            this.context.fillStyle = bullet.color;
            this.context.fillRect(bullet.xPosition, bullet.yPosition, bullet.width, bullet.height);
        }
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            this.context.fillStyle = "#FA8237";
            this.context.fillRect(wall.x, wall.y, wall.width, wall.height);
        }
        // Draw movable items.
        for (var i = 0; i < this.players.length; i++) {
            var object = this.players[i];
            object.handleKeys(this.motionKeys);
            var collision = object.handleMovement(this.walls[0]);
            this.checkBounds(object);
            this.context.drawImage(object.image, object.xPosition, object.yPosition, object.width, object.height);
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
        }
    }
}

window.onload = function init() {
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