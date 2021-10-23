/* global document, console, innerWidth, innerHeight */
var canvas1 = document.getElementById("bubbelingAnimation"),
    c1 = canvas1.getContext("2d"),
    canvas1wrapperSibling = document.getElementById('bubbelingAnimationWrapper').nextElementSibling,
    circleArray = [],
    colorArray = ["#4f6ce6", "#40e2e2", "#c55dd3", "#406ce2","#ffb100"],
    mouse = {
        x: undefined,
        y: undefined
    },
    i;
function resize() {
		canvas1.width = canvas1wrapperSibling.clientWidth * 0.95;
		canvas1.height = canvas1.width;
		if (innerWidth < 450) {
			canvas1.width = innerWidth * 0.95;
			canvas1.height = canvas1.width / 4;
		}
}
resize();
canvas1.addEventListener("mousemove",function (e) {
    mouse.x = e.x - canvas1.getBoundingClientRect().x;
    mouse.y = e.y - canvas1.getBoundingClientRect().y;
})
canvas1.addEventListener("mouseout",function (e) {
        mouse = {
        x: undefined,
        y: undefined
    }
})
canvas1.addEventListener('touchmove',function (e){
    console.log(e)
},true)
function CircleObject(i,x, y, dx, dy, r) {
    this.order = i;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
		this.minR = r;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
               
        c1.beginPath();
        c1.arc(this.x, this.y, this.r, Math.PI * 2, 0, false);
        c1.stroke();
        c1.fillStyle = this.color;
        c1.fill();
        c1.stroke();

        this.update();
    };
    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (
            this.x + this.r >= canvas1.width ||
            this.x - this.r <= 0
           ) {
            
            this.dx = -this.dx;
            
        }
        if (
            this.y + this.r >= canvas1.height ||
            this.y - this.r <= 0
        ) {
            
            this.dy = -this.dy;
            
        }
        if (
            Math.abs(mouse.x - this.x) < innerWidth / 20
            && Math.abs(mouse.y - this.y) < innerWidth / 20 &&
            this.r < innerWidth / 20
        ) {
            this.r += this.minR
        }
        if(
            
            Math.abs(mouse.x - this.x) > innerWidth / 20 &&
            Math.abs(mouse.y - this.y) > innerWidth / 20 &&
            this.r >= this.minR ||
            mouse.x === undefined &&
            this.r >= this.minR
            
                 ) {
            this.r -= this.minR / 2
        }
    };
}


function init() {
		circleArray = [];
		for (i = 0; i < 100; i += 1) {
			var r  = (Math.random() * innerWidth) / 100 + innerWidth / 150,
					x = Math.random() * (canvas1.width - r * 2) + r,
					y = Math.random() * (canvas1.height - r * 2) + r,
					dx = (Math.random() - 0.5) * innerWidth / 100,
					dy = (Math.random() - 0.5) * innerWidth / 100;
			circleArray.push(new CircleObject(i,x, y, dx, dy, r))
	}
}
function animate1() {
    requestAnimationFrame(animate1);
    c1.clearRect(0, 0, canvas1.width, canvas1.height);
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    } 

}
animate1();
init();