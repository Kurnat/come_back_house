
const wrapp = document.querySelectorAll('.sheen')[0]
const canvasElements = document.querySelectorAll('.canvas')

const canvas = document.getElementById('canvas');

console.log(canvas);

// canvasElements.forEach(node =>{

// console.log(node);


// })
const ctx = canvas.getContext('2d')
ctx.canvas.width = wrapp.clientWidth;
ctx.canvas.height = wrapp.clientHeight;
let particleArray;


// create constructor function
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // add draw method to particle pro
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // add update method to particle prototype
    update(){        
        if(this.x + this.size > canvas.width || this.x - this.size < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.size > canvas.height || this.y - this.size < 0){
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// create particle array
function init(){
    
    particleArray =[];

    for(let i = 0; i<400; i++){
        let size = Math.random() * 1.5;
        let x = Math.random() * (wrapp.clientWidth - size * 2);
        let y = Math.random() * (wrapp.clientHeight -size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = '#fff';

        particleArray.push(new Particle(x,y,directionX, directionY,size, color));
        
    }
}

console.log(Math.abs(10,15));


function animate(){

    requestAnimationFrame(animate);
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    for(let i =0; i<particleArray.length;i++){
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', function(){
    canvas.width = wrapp.clientWidth;
    canvas.height = wrapp.clientHeight;
    init();
})


