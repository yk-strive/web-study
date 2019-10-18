// 这里将所有的js放到index中, 是将其作为一个上线项目考虑的, 项目上线,文件是要进行压缩处理, 减少体积,提高请求速度

// -------------Tools-------------
/**
 * 自调用函数传参 -- window: 是方便代码压缩时, 将变量也进行压缩
 *               -- undefiend: 在老版本浏览器中, undefined是可以被重新赋值的, 这里将其传入,是为了不被修改
 * 自调用函数的问题
 *      一个js文件中, 存在多个自调用函数时, 自调用函数没有返回值时, 就会返回 undefined;
 *      js在解析过程中, 上一个自调用函数返回的 undefined 会和下一个自调用函数合并, 成下面的方式运行, 导致错误.
 *                  undefiend(function() {
 *      
 *                  })();
 *      因此, 书写时默认会在自调用函数的开头加上 ; 作为区分.
 */
;(function(window, undefined) {
    var Tools = {
        /**
         * 含最小值和最大值的随机整数
         * @param {*} min 
         * @param {*} max 
         */
        getRandom: function(min, max) {
            return  Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
    window.Tools = Tools;
})(window, undefined)


// --------------food------------
;(function() {
    /**
     * position / elements 是全局变量, 防止被修改, 这里使用自调用函数,创建独立作用域
     */
    var position = 'absolute';
    var elements = [];

    function Food(options) {
        options = options || {};

        this.width = options.width || 10;
        this.height = options.height || 10;
        this.x = options.x || 100;
        this.y = options.y || 100;
        this.color = options.color || 'green';
    }

    Food.prototype.render = function(map) {
        // 删除食物 - 创建食物之后, 就需要将其存储起来;
        remove();

        var div = document.createElement('div');
        map.appendChild(div);
        // 存放食物
        elements.push(div);

        // 食物随机位置
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.position = position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.backgroundColor = this.color;
    }

    function remove() {
        for(var i = 0, len = elements.length; i < len; i++) {
            // 页面上删除
            elements[i].parentNode.removeChild(elements[i]); 
            // 数组中删除
            elements.splice(i, 1);
        }
    }

    // 自调用函数之后, 独立作用域成立, 为了外部可以访问到Food构造函数, 这里将Food挂载到window上
    window.Food = Food;
})()


// --------------------snake-------------------
;(function() {
    var position = 'absolute';
    var elements = [];
    function Snake(options) {
        options = options || {};

        // width, height 是每一节蛇身的宽高
        this.width = options.width || 10;
        this.height = options.height || 10;
        this.direction = 'right';
        /**
         * body - 存放蛇头和蛇身的信息
         *      - 数组第一个是蛇头, 其余是蛇身
         *      - x, y 需要 * 单个蛇节的 width or height 才是其位置信息
         *  */ 
        this.body = [
            {x: 3, y: 2, color: 'black'},
            {x: 2, y: 2, color: 'coral'},
            {x: 1, y: 2, color: 'coral'}
        ]
    }

    Snake.prototype.render = function(map) {
        remove();
        for(var i = 0, len = this.body.length; i < len; i++) {
            var item = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);

            elements.push(div);

            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = item.x * this.width + 'px';
            div.style.top = item.y * this.height + 'px';
            div.style.backgroundColor = item.color;
        }
        
    }
    Snake.prototype.move = function(food, map) {
        /**
         * 蛇身移动 -- 每一节蛇身都移动到前一个蛇身的位置
         * 蛇头移动 -- 跟随方向键
         */

         // 蛇身移动
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇身移动
        var head = this.body[0];
        switch(this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'up':
                head.y -= 1;
                break;
        }
        // 当蛇遇到食物, 进行相应处理
        if (head.x * this.width == food.x && head.y *  this.height == food.y) {
            // 食物render
            food.render(map);
            // 蛇身加长 -- 最后一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
        }
    }

    function remove() {
        for(var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }
    window.Snake = Snake;
})()

// -------------------game---------------------
;(function() {
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


// -----------执行----------
;(function(window, undefined) {
    var map = document.getElementById('content');

    var game = new Game(map);
    game.start();
})(window, undefined)