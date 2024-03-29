
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var box = document.getElementById('box');
	var navlist = document.getElementById('nav').children;
	var slider = document.getElementById('slider');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var p1 = document.getElementById('p1');
	var index = 1;
	var isMoving = false;
	function next(){
		if(!isMoving){
			isMoving = true;
			index++;
			navChange();
			animate(slider,{left:-1200*index},function(){
				if(index > 5){
					slider.style.left = "-1200px";
					index = 1;
			}
			isMoving = false;
		});
		}
	}
	function previous(){
		if(!isMoving){
			index--;
			navChange();
			animate(slider,{left:-1200*index},function(){
				if(index === 0){
					slider.style.left = -1200*5 + "px";
					index = 5;
			}
			isMoving = false;
		});
		}
	}
	var timer = setInterval(next,3000);
	box.onmouseover = function(){
		animate(left,{opacity:50})
	    animate(right,{opacity:50})
		clearInterval(timer);
	}
	box.onmouseout = function(){
		animate(left,{opacity:0})
		animate(right,{opacity:0})
		timer = setInterval(next,3000);
	}
	right.onclick = next;
	left.onclick = previous;
	//小按钮点击
	for(var i = 0;i<navlist.length;i++){
		navlist[i].index = i;
		navlist[i].onclick = function(){
			index = this.index+1;
			navChange();
			animate(slider,{left:-1200*index})
		}
	}
	//小按钮背景色切换
	function navChange(){
		for(var i = 0; i<navlist.length;i++){
			navlist[i].className = '';
		}
		if(index > 5){
			navlist[0].className = 'active';
		}
		else if(index === 0){
			navlist[4].className = 'active';
		}
		else{
			navlist[index-1].className = 'active';
		}
	}