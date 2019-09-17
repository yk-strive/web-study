// 异或运算, 同为正或同为负时, a^b的结果为1
function sameSign(a, b) {
	return (a ^ b) >= 0
}
/**
	console.log(sameSign(5, -10)); // false
	console.log(sameSign(5, 10));  // true
	console.log(sameSign(-5, -10));//true
	console.log(sameSign('yk', '-yk')); //false
*/
// 一个向量的坐标等于表示此向量的有向线段的终点坐标减去始点的坐标
function vector(a, b) {
	return {
		x: b.x - a.x,
		y: b.y - a.y,
	}
}
// 二维向量的叉乘公式
function vectorProduct(v1, v2) {
	return v1.x * v2.y - v2.x * v1.y;
}
function isPointInTrangle1(p, a, b, c) {
	var PA = vector(p, a);
	var PB = vector(p, b);
	var PC = vector(p, c);

	var t1 = vectorProduct(PA, PB);
	var t2 = vectorProduct(PB, PC);
	var t3 = vectorProduct(PC, PA);

	return sameSign(t1, t2) && sameSign(t2, t3);
}
// 面积法
function getTriangleArea(a, b, c) {
	var ab = vector(b, a);
	var bc = vector(c, b);
	return Math.abs(vectorProduct(ab, bc) / 2.0);
}
function isPointInTrangle2(p, a, b, c) {
	var ABS_DOUBLE_0 = 0.0001;  //abs函数误差值;

	var sabc = getTriangleArea(a, b, c);
	var sabp = getTriangleArea(a, b, p);
	var sacp = getTriangleArea(a, c, p);
	var sbcp = getTriangleArea(b, c, p);

	var sum = sabp + sacp + sbcp;

	return -ABS_DOUBLE_0 < (sabc - sum) && (sabc - sum) < ABS_DOUBLE_0;
}

//是否需要延迟执行.
function needDelay(elem, leftTrack, currTrack) {
	// console.log(elem.offset());
	var offset = elem.offset();
	var topTrack = {
		x: offset.left,
		y: offset.top
	}
	var bottomTrack = {
		x: offset.left,
		y: offset.top + elem.height()
	}

	return isPointInTrangle2(currTrack, leftTrack, topTrack, bottomTrack); //https://blog.csdn.net/weizhuwyzc000/article/details/46853087
}