(function() {
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
