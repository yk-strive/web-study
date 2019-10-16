
// 获取页面滚动距离的浏览器兼容性问题 
// 获取页面滚动出去的距离
function getScroll() {
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
    }
}

// 获取鼠标在页面的位置, 处理浏览器兼容性
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    }
}

// 处理注册事件的兼容性问题
function addEventListener(element, eventName, fn) {
    // 判断当前浏览器是否支持addEventListener 方法
    if (element.addEventListener) {
        element.addEventListener(eventName, fn); //第三个参数默认false;
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = fn;
    }
}

// 处理移除事件的兼容性处理
function removeEventListener(element, eventName, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(eventName, fn);
    } else if (element.detachEvent) {
        element.detachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = null;
    }
}

// 格式化日期对象, 返回 yyyy-MM-dd HH:mm:ss的形式
function formaDate(date) {
    // 判断参数date是否是日期对象
    if (!(date instanceof Date)) {
        console.log('参数不是日期对象');
        return;
    }
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// 获取两个日期的时间差
function getInterval(start, end) {
    // 两个日期对象, 相差的毫秒数
    var interval = start - end;
    // 求 相差的天数/小时数/分钟数/秒数
    var day, hour, minute, second;

    // 两个日期相差的 秒数
    interval = interval / 1000;

    day = Math.round(interval / 60 / 60 / 24);
    hour = Math.round(interval / 60 / 60 % 24);
    minute = Math.round(interval / 60 & 60);
    second = Math.round(interval & 60);

    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
}
