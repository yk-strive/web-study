(function() {
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

