var canvas2 = document.getElementById("projeciles"),
	c2 = canvas2.getContext("2d"),
	i,
	l,
	xs,
	ys,
	f,
	s,
	order,
	projectileArray = [],
	colorArrayForProjectiles = ["#4C5270", "#F652A0", "#36EEE0", "#BCECE0"],
	mouse2 = {
		x: 0,
		y: 0
	};
var rect = canvas2.getBoundingClientRect();
var particlesArray2 = [];
function resize2() {
	canvas2.width = canvas1wrapperSibling.clientWidth * 0.95;
	canvas2.height = canvas1.width;
	if (innerWidth < 450) {
		canvas2.width = innerWidth * 0.95;
		canvas2.height = canvas1.width / 2;
	}
}
resize2();
window.onresize = function () {
	resize();
	resize2();
	circleArray = [];
		for (i = 0; i < 200; i += 1) {
			var r  = (Math.random() * innerWidth) / 100 + innerWidth / 150,
					x = Math.random() * (canvas1.width - r * 2) + r,
					y = Math.random() * (canvas1.height - r * 2) + r,
					dx = (Math.random() - 0.5) * innerWidth / 100,
					dy = (Math.random() - 0.5) * innerWidth / 100;
			circleArray.push(new CircleObject(i,x, y, dx, dy, r))
	}
};

function generateRandomRange(firstNum, lastNum) {
    return (Math.random() * firstNum) + lastNum
}
function generateRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function Projectile(x, y, v, r, hx, hy, order) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.r = r;
    this.hx = hx;
    this.hy = hy;
    this.color = colorArrayForProjectiles[Math.floor(Math.random() * 4)];
    this.particlesArray2 = [];
    this.draw = function () {
        c2.beginPath();
        c2.arc(this.x, this.y, this.r, Math.PI * 2, 0, false);
        c2.fillStyle = this.color;
        c2.fill();
        c2.stroke();
        this.update();
    }
    this.update = function () {
        this.x +=  this.v.x;
        this.y += this.v.y;
        if (
            this.y < this.hy
           ) {
            while (this.particlesArray2.length < 10) {
                this.particlesArray2.push(new Particle(this.x, this.y, generateRandomRange(innerWidth / 400,innerWidth / 500),{
                x:(Math.random() - 0.5) * innerWidth / 30,
                y:(Math.random() - 0.5) * innerWidth / 30           
            }));
            }
            gsap.to(this,{
                r : 0
            });
        }
    };
}
var friction = 0.4;
class Particle {
    constructor(x, y, r, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = generateRandomColor();
        this.v = v;
        this.alpha = 0.015
    }
    draw() {
        c2.save();
        c2.globalAlpha = this.alpha;
        c2.beginPath();
        c2.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c2.fillStyle = this.color;
        c2.fill();
        c2.stroke()
        c2.closePath();
        c2.restore();
    }
    update() {
    if (this.x + this.r > canvas2.width || this.x - this.r < 0) {
            this.v.x = -this.v.x;
        }
        if (this.y + this.r > canvas2.height || this.y - this.r < 0) {
            this.v.y = -this.v.y;
        }
        this.x = this.x + (this.v.x) * friction;
        this.y = this.y + (this.v.y) * friction;
        if (this.alpha >= 0.01) {
            this.alpha += 0.06;
        }
        if (this.alpha >= 0.8) {
            gsap.to(this,{
                r : 0,
                alpha : 0.001
            })
        }
        this.draw();
    }
}
canvas2.onclick = function (e) {
        var r = generateRandomRange(innerWidth / 100,innerWidth / 150),
                mouse2 = {
        x : e.x - canvas2.getBoundingClientRect().x, 
        y : e.y - canvas2.getBoundingClientRect().y 
        },
        hx = mouse2.x,
        hy = mouse2.y,
        angle = Math.atan2(mouse2.y - (canvas2.height + 25),mouse2.x - (canvas2.width / 2)),
        v = {
            x: Math.cos(angle) * innerWidth / 70,
            y: Math.sin(angle) * innerWidth / 70,
        };
        projectile = new Projectile(canvas2.width / 2, canvas2.height + 25, v, r, hx, hy);
        projectileArray.push(projectile);
}


function animate2() {
    requestAnimationFrame(animate2);
    c2.fillStyle = "rgba(0, 206, 255, 0.5)";
    c2.fillRect(0, 0, canvas2.width, canvas2.height);
    for (i = 0; i < projectileArray.length; i += 1) {
        for (k = 0; k < projectileArray[i].particlesArray2.length; k++) {
        
        if (projectileArray[i].particlesArray2[k].alpha <= 0.01) {
            
            var l = k,
                s = i;
            
            setTimeout(function(){
                
                    projectileArray[s].particlesArray2.splice(l,1);
                    
                }, 0);

        } else {
            
           projectileArray[i].particlesArray2[k].update();
            
            }
        }
        projectileArray[i].draw();
        if (projectileArray[i].x > canvas2.width ||
            projectileArray[i].x < 0 ||
            projectileArray[i].y > canvas2.height + 25 ||
            projectileArray[i].y < 0
           ) {
            setTimeout(function(){
                
                    projectileArray.splice(i,1);
                    
                }, 500);
        }
    }
}
animate2();