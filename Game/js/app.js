var Game = (function () {
    function Game() {
    }
    Game.gameLoop = function () {
        var canvas = document.getElementById("world");
        var context = canvas.getContext("2d");

        // Clear canvas
        canvas.width = 600;
        canvas.height = 600;

        for (var i = 0; i < Game.objects.length; i++) {
            var object = Game.objects[i];
            object.handleKeys(Game.keys);

            context.fillRect(object.avatarX, object.avatarY, 50, 50);
        }

        requestAnimationFrame(Game.gameLoop);
    };

    Game.checkBounds = function () {
    };
    Game.keys = [];

    Game.objects = [];
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
    Game.gameLoop();
};
//# sourceMappingURL=app.js.map
