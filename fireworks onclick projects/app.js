let canvas=document.getElementById("canvas");
let context=canvas.getContext("2d");
let width=window.innerWidth;
let height=window.innerHeight;
let clicked=false;
let mouseX=0,
mouseY=0;
let particles=[];
let particsetings={
    gravity:0.05
};

//event objects

let events={
    mouse:{
        down:"mousedown",
        move:"mousemove",
        up:"mouseup",
    },
    touch:{
        down:"touchstart",
        move:"touchmove",
        up:"touchend"
    },
};
let deviceType="";

//request animations

window.requestAnimationFrame=window.requestAnimationFrame || 
window.webkitRequestAnimationFrame || 
window.mozRequestAnimationFrame || 
window.oRequestAnimationFrame || 
window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback,1000 /60)
};

//func window load
window.onload=()=>{
    canvas.width=width;
    canvas.height=height;
    window.requestAnimationFrame(startFirework);
};

//detect touch device
const istouchdevice=()=>{
    try{
        document.createEvent("TouchEvent");
        deviceType="touch";
        return true;
    }catch(e){
        deviceType="mouse";
        return false
    }
}

istouchdevice();

//mousedown func

canvas.addEventListener(events[deviceType].down,
    function (e) {
        e.preventDefault();
        clicked=true;
        mouseX=istouchdevice() ? e.touches[0].pageX :
        e.pageX;
        mouseY=istouchdevice() ? e.touches[0].pageY : 
        e.pageY; 
    });

//mouseup func

canvas.addEventListener(events[deviceType].up,function (e) {
    e.preventDefault();
    clicked=false;
});

//belli bir aralıkta random numara yaratma

function randomnumbergenerate(min,max) {
    return Math.random() * (max-min) +min;
}

function Particle() {
    this.width=randomnumbergenerate(0.1,0.9)*5;
    this.height=randomnumbergenerate(0.1,0.9) * 5;
    this.x=mouseX - this.width / 2;
    this.y=mouseY - this.height / 2 ;


    //paticullerin hızı
    this.vx=(Math.random() - 0.5) * 10;
    this.vy=(Math.random() - 0.5) * 10;
};

Particle.prototype={
    move:function(){
        if (this.x >= canvas.width || this.y >= canvas.
        height) {
            return false;    
        }
        else{
            return true;
        }
    },
    draw:function(){
        this.x +=this.vx;
        this.y+=this.vy;
        this.vy += particsetings.gravity;
        context.save();
        context.beginPath();
        context.translate(this.x,this.y);
        context.arc(0, 0, this.width , 0, Math.PI * 2 );
        context.fillStyle=this.color;
        context.closePath();
        context.fill();
        context.restore();
    },
};

function createfirework() {
    var numberofparticles=randomnumbergenerate(10,50);
    let color=`rgb(${randomnumbergenerate(0,255)},
        ${randomnumbergenerate(
            0,255
        )},${randomnumbergenerate(0,255)})`;
    
        for(var i=0; i< numberofparticles; i++){
            var particle=new Particle();
            particle.color=color;
            var vy= Math.sqrt(25-particle.vx * particle.vx);
            if (Math.abs(particle.vy) > vy) {
                particle.vy=particle.vy > 0 ? vy : -vy;
            }
            particles.push(particle);
        }
}



//func fireworks baslamsi
function startFirework() {
    let current=[];

    context.fillStyle="rgba(0,0,0,0.1";
    context.fillRect(0, 0, width, height);
    if (clicked) {
        createfirework();
    }
    for(let i in particles){
        particles[i].draw();
        if (particles[i].move()) {
            current.push(particles[i]);
        }
    }
    particles=current;
    window.requestAnimationFrame(startFirework);
}
