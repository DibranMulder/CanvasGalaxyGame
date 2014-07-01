class Game
{
    public static xBound: number = 600;
    public static yBound: number = 600;

    public static keys: boolean[] = [];

    public static objects: GameObject[] = [];

    public static walls: Wall[] = [];

    public static gameLoop() {
        var canvas = <HTMLCanvasElement>document.getElementById("world");
        var context = canvas.getContext("2d");
        // Clear canvas
        canvas.width = 600;
        canvas.height = 600;

        for (var i = 0; i < Game.walls.length; i++) {
            var wall = Game.walls[i];
            context.fillStyle = "#FA8237";
            context.fillRect(wall.x, wall.y, wall.width, wall.height);
        }
        // Draw movable items.
        for (var i = 0; i < Game.objects.length; i++) {
            var object = Game.objects[i];
            object.handleKeys(Game.keys);
            object.handleMovement();
            context.fillStyle = "#37AFFA";
            context.fillRect(object.avatarX, object.avatarY, 50, 50);
        }

        requestAnimationFrame(Game.gameLoop);
    }
}

window.onload = function init() {
    var requestAnimationFrame = (<any>window).requestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    window.addEventListener("keydown", function (e) {
        Game.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
        Game.keys[e.keyCode] = false;
    });

    Game.objects.push(new GameObject());
    Game.walls.push(new Wall(150, 350, 20, 200));
    Game.gameLoop();
};