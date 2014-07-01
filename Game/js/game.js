var Game = (function () {
    function Game() {
    }
    Game.gameLoop = function () {
        var canvas = document.getElementById("world");
        var context = canvas.getContext("2d");

        // Clear canvas
        canvas.width = 600;
        canvas.height = 600;

        for (var i = 0; i < Game.walls.length; i++) {
            var wall = Game.walls[i];
            context.fillStyle = "#FA8237";
            context.fillRect(wall.x, wall.y, wall.width, wall.height);
        }

        for (var i = 0; i < Game.objects.length; i++) {
            var object = Game.objects[i];
            object.handleKeys(Game.keys);
            object.handleMovement();
            context.fillStyle = "#37AFFA";
            context.fillRect(object.avatarX, object.avatarY, 50, 50);
        }

        requestAnimationFrame(Game.gameLoop);
    };
    Game.xBound = 600;
    Game.yBound = 600;

    Game.keys = [];

    Game.objects = [];

    Game.walls = [];
    return Game;
})();

window.onload = function init() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
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
//# sourceMappingURL=game.js.map
