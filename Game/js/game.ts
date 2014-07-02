class Game
{
    public xBound: number = 600;
    public yBound: number = 600;

    public keys: boolean[] = [];

    public objects: GameObject[] = [];

    public walls: Wall[] = [];

    public gameLoop() {
        var canvas = <HTMLCanvasElement>document.getElementById("world");
        var context = canvas.getContext("2d");
        // Clear canvas
        canvas.width = 600;
        canvas.height = 600;

        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            context.fillStyle = "#FA8237";
            context.fillRect(wall.x, wall.y, wall.width, wall.height);
        }
        // Draw movable items.
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            object.handleKeys(this.keys);
            object.handleMovement();
            context.fillStyle = "#37AFFA";
            context.fillRect(object.avatarX, object.avatarY, 50, 50);
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

window.onload = function init() {
    var requestAnimationFrame = (<any>window).requestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var game = new Game();
    game.objects.push(new GameObject());
    game.walls.push(new Wall(150, 350, 20, 200));

    window.addEventListener("keydown", function (e) {
        game.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
        game.keys[e.keyCode] = false;
    });

    game.gameLoop();
};