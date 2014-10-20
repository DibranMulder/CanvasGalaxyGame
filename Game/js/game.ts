﻿class Game
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
        this.galaxy.renderStars(600, 600);
        this.galaxy.renderAsteroid();
    }

    public gameLoop() {
        var quit = false;
        // Clear canvas
        this.canvas.width = 600;
        this.canvas.height = 600;
        // Draw galaxy
        for (var i = 0; i < this.galaxy.stars.length; i++) {
            var star = this.galaxy.stars[i];
            star.handleMovement();
            star.draw(this.context);
        }
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
            this.checkBounds(player);
            player.draw(this.context);
        }
        // Draw Asteroids
        for (var i = 0; i < this.galaxy.asteroids.length; i++) {
            var asteroid = this.galaxy.asteroids[i];
            asteroid.handleMovement();
            asteroid.draw(this.context);
        }
        // Draw lasers
        for (var i = 0; i < this.lasers.length; i++) {
            var laser = this.lasers[i];
            laser.handleMovement();
            laser.draw(this.context);
        }
        // Draw torpedos
        for (var i = 0; i < this.torpedos.length; i++) {
            var torpedo = this.torpedos[i];
            torpedo.handleMovement();
            torpedo.draw(this.context);
        }
        if (!quit) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
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