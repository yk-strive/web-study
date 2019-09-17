$(document).ready(function() {
	var nav_sub = $('#nav-sub');
	var activeRow; // 左侧1级菜单选中的li
	var activeMenu; // 2级菜单对应1级菜单选中的li 所要展示信息

	var timer;
	var mouseInSub = false;

	nav_sub.on('mouseenter', function() {
		mouseInSub = true;
	}).on('mouseleave', function() {
		mouseInSub = false;
	})

	var mouseTrack = [];
	var mouseHandle = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		});

		if (mouseTrack.length > 3) {
			mouseTrack.shift();
		}
		//console.log('track', mouseTrack)
	}

	$('#left-nav-box')
		// 左侧1级菜单nav-box鼠标进入, 显示2级菜单nav-sub
		.on('mouseenter', function() {
			nav_sub.removeClass('none');
			$(document).bind('mouseover', mouseHandle);
		})
		// 左侧1级菜单nav-box鼠标离开, 隐藏2级菜单nav-sub
		.on('mouseleave', function() {
			nav_sub.addClass('none');
			
			if (activeRow) {
				activeRow.removeClass('nav-active');
				activeRow = null;
				activeMenu.addClass('none');
				activeMenu = null;
			}
			$(document).unbind('mouseover', mouseHandle);
		})
		// 左侧1级菜单中的li 鼠标进入时
		.on('mouseenter', 'li', function(e) {
			// console.log(e)
			// if 如果不存在选中的, 执行{}中的,
			if (!activeRow) {
				activeRow = $(e.target).addClass('nav-active'); //1级菜单鼠标悬浮的li添加背景
				activeMenu = $('#' + activeRow.data('id')).removeClass('none'); //对应的2级菜单的内容展示
				return;
			}
			if (timer) {
				clearTimeout(timer)
			}

			var currTrack = mouseTrack[mouseTrack.length - 1];
			var leftTrack = mouseTrack[mouseTrack.length - 2];

			var delay = needDelay(nav_sub, leftTrack, currTrack); // 基于用户的行为,进行预测
			console.log("delay", delay)
			if (delay) {
				timer = setTimeout(function() {
					if (mouseInSub) {
						return;
					}
					//如果之前存在选中的,清除之前的, 指定到当前的
					activeRow.removeClass('nav-active');
					activeMenu.addClass('none');

					activeRow = $(e.target);
					activeRow.addClass('nav-active');
					activeMenu = $('#' + activeRow.data('id'));
					activeMenu.removeClass('none');
					timer = null;
				}, 300)
			} else {
				activeRow.removeClass('nav-active');
				activeMenu.addClass('none');

				activeRow = $(e.target);
				activeRow.addClass('nav-active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
			}
			
		})
})