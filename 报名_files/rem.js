function getfont() {
	var html1 = document.documentElement;
	var screen = html1.clientWidth;
	html1.style.fontSize = 0.02666666666666667 * screen + 'px';
};
getfont();
window.onresize = function() {
	getfont();
};