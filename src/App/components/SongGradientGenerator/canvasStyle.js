var canvasArr = document.querySelectorAll('canvas');
var ctx = [];
var i = canvasArr.length;
while (i--) {
	ctx[i] = canvasArr[i].getContext('2d');
}

ctx[0].fillStyle = 'white';
ctx[0].fillRect(0, 0, 200, 200);
ctx[0].shadowBlur = 20;
ctx[0].shadowColor = 'black';
ctx[0].fillRect(50, 50, 100, 100);

ctx[1].fillStyle = 'black';
ctx[1].fillRect(0, 0, 200, 200);
ctx[1].shadowBlur = 20;
ctx[1].shadowColor = 'white';
ctx[1].fillRect(50, 50, 100, 100);
