window.onload = function() {

    var parent = document.getElementById('content');

    var array = [];
    for(var i = 0; i < 20; i++) {
        var r = Tools.getRandom(126, 255);
        var g = Tools.getRandom(126, 255);
        var b = Tools.getRandom(126, 255);
        var block = new Block(parent, {
            backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')'
        });
        block.randomPosition();
        array.push(block);
    }
    setInterval(function() {
        for(var i = 0; i < array.length; i++) {
            var b = array[i];
            b.randomPosition();
        }
    }, 500);
};