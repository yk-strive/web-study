(function() {
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
})()
