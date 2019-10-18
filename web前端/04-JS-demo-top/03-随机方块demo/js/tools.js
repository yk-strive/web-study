var Tools = {
    /**
     * 获取min, max之间包含min,max的随机整数
     * @param {最小值} mix 
     * @param {最大值} max 
     */
    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};