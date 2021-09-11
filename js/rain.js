var canvas = document.getElementById("rain"),
    c = canvas.getContext("2d"),
    header = document.getElementsByTagName("header")[0],
    i,
    j,
    k,
    particlesArray1 = [];

function generateRandomRange(firstNum, lastNum) {
    return (Math.random() * firstNum) + lastNum;
}

function generateRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}
canvas.width = canvas.width * 4;
canvas.height = (canvas.width / 2);
/* resize */

/* end resize */

/* classes */

/* particle */

var friction = 0.7;

class Particles {
    constructor(x, y, r, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = "white";
        this.v = v;
        this.alpha = 0.02
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke()
        c.closePath();
        c.restore();
    }
    update() {
        this.x = this.x + (this.v.x) * friction;
        this.y = this.y + (this.v.y) * friction;
        if (this.alpha >= 1){
            gsap.to(this, {
                alpha : this.alpha - 1.1
            })
        } else {
            this.alpha += 0.01;
        }
        this.draw();
    }
}

setInterval(function(){
     var x = generateRandomRange(canvas.width,0),
        y = generateRandomRange(canvas.height,0),
        r = generateRandomRange(3,1),
    v = {
        x : -1,
        y : 1
    };
    particlesArray1.push(new Particles(x,y,r,v))
},100)
/* end particle */

/*  end classes */

function init() {
    
}
var animationId;

function animate() {
    // animation loop
    
    animationId  = requestAnimationFrame(animate);
    // clearing canvas 
    c.fillStyle = "rgba(0, 2, 29, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (k = 0; k < particlesArray1.length; k++) {
        
        if (particlesArray1[k].alpha <= 0.01) {
            
            var l = k;
            
            setTimeout(function(){
                
                    particlesArray1.splice(l,1);
                    
                }, 0);

        } else {
            
            particlesArray1[k].update();
            
        }
    }
}
animate();