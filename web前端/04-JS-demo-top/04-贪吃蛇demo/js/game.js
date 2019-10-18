(function() {
    /**
     * Game - 游戏对象
     */
    var _this;
    var timerId;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        _this = this;
    }
    Game.prototype.start = function() {
        this.food.render(this.map);
        this.snake.render(this.map);

        /**
         * 开始游戏的逻辑
         *  1. 让蛇移动
         *  2. 当蛇遇到边界游戏结束
         *  3. 通过键盘控制蛇移动的方向
         *  4. 当蛇遇到食物, 进行相应处理
         */

         // 1. 让蛇移动
         runSnake();

         // 3. 通过键盘控制蛇移动的方向
         bindkey();
    }

    function runSnake() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        /**
         * setInterval - 通过bind重新绑定this
         */
        timerId = setInterval(function() {

            this.snake.move(this.food, this.map);
            this.snake.render(this.map);

            // 2. 遇到边界游戏结束
            var snakeHeadX = this.snake.body[0].x;
            var snakeHeadY = this.snake.body[0].y;
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            if (snakeHeadX >= maxX || snakeHeadX < 0 || snakeHeadY >= maxY || snakeHeadY < 0) {
                clearInterval(timerId);
                timerId = null;
                alert('游戏结束');
            }
        }.bind(_this), 150)
    }

    // 通过键盘控制蛇移动的方向
    function bindkey() {
        document.onkeydown = function(e) {
            e = e || window.event;
            var keyCode = e.keyCode;
            switch(keyCode) {
                case 37: //left
                    this.snake.direction = 'left';
                    break;
                case 38: //up
                    this.snake.direction = 'up';
                    break;
                case 39: //right
                    this.snake.direction = 'right';
                    break;
                case 40: //down
                    this.snake.direction = 'down';
                    break;
            }
        }.bind(_this);
    }
    window.Game = Game;
})()

