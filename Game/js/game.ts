class Game
{
    public xBound: number = 600;
    public yBound: number = 600;

    public keys: boolean[] = [];

    public bullets: Bullet[] = [];
    public players: Player[] = [];
    public walls: Wall[] = [];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("world");
        this.canvas.onclick = () => {
            var bullet = new Bullet(this.players[0].xPosition, this.players[0].yPosition, 3, 3);
            this.bullets.push(bullet);
        };
        this.context = this.canvas.getContext("2d");
    }

    public gameLoop() {
        // Clear canvas
        this.canvas.width = 600;
        this.canvas.height = 600;
        // Render stars
        var start = new Stars();
        start.render_stars(this.context, 600, 600);

        for (var i = 0; i < this.bullets.length; i++) {
            var bullet = this.bullets[i];
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
            object.handleKeys(this.keys);
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
        game.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
        game.keys[e.keyCode] = false;
    });
    
    game.gameLoop();
};