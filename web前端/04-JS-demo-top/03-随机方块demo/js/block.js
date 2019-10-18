function Block(parent, options) {
    options = options || {};
    /**
     * 定义Block方块自身属性
     */
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.backgroundColor = options.backgroundColor || 'red';

    // 拼接方块 -- 这里将创建的div声明为自身属性, 是为了在原型对象上可以操作到
    this.div = document.createElement('div');
    parent.appendChild(this.div);

    this.parent = parent;
    // 方块属性赋值
    this.init();
}

Block.prototype.init = function() {
    this.div.style.width = this.width + 'px';
    this.div.style.height = this.height + 'px';
    this.div.style.left = this.x + 'px';
    this.div.style.top = this.y + 'px';
    this.div.style.backgroundColor = this.backgroundColor;

    this.div.style.position = 'absolute';
};

Block.prototype.randomPosition = function() {
    /**
     * 方块随机位置.
     *      最大宽度容纳个数 = 父容器宽度 / 方块宽度
     *      x = 随机 0 到 最大宽度容纳个数 - 1 * 方块宽度
     *  */    
    var x = Tools.getRandom(0, this.parent.offsetWidth / this.width - 1) * this.width;
    var y = Tools.getRandom(0, this.parent.offsetHeight / this.height - 1) * this.height;
    
    this.div.style.left = x + 'px';
    this.div.style.top = y + 'px';
};