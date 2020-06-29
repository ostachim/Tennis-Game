const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.85;
canvas.height = canvas.width * 0.5;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = ch * 0.04;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 -  ballSize / 2;
let ballSpeedX = -2;
let ballSpeedY = -2;


const paddelHeight = ch * 0.2;
const paddelWidth = cw * 0.02;

const playerX = cw * 0.07;
const aiX = cw - (cw * 0.07) - paddelWidth;

let playerY = ch / 2 - paddelHeight / 2;
let aiY = ch / 2 - paddelHeight / 2;

const lineWidth = cw * 0.006;
const lineHeight = ch * 0.032;

let playerPoints = 0;
let aiPoints = 0;

const audioGoal = new Audio("sounds/goal.wav");
const audioHitBall = new Audio("sounds/hitBall.wav");
const wall = new Audio("sounds/wall.wav");
const audioStary = new Audio("sounds/starGame.ogg");

function player(){
    context.fillStyle = "yellow";
    context.fillRect(playerX,playerY,paddelWidth,paddelHeight);
}
function ai(){
    context.fillStyle = "yellow";
    context.fillRect(aiX,aiY,paddelWidth,paddelHeight);
}


function ball(){
    context.fillStyle = "#ffffff";
    context.fillRect(ballX,ballY,ballSize,ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY = -ballSpeedY;
        wall.play();
        speedUp();
    }

    if(ballX <= 0){
        
        aiPoints++;
        ballX = cw/2;
        ballY = ch/2;
        ballSpeedX = -2;
        ballSpeedY = 2;
        audioGoal.play();
        
        
    }
    if(ballX + ballSize >= cw){
        
        playerPoints++;
        ballX = cw/2;
        ballY = ch/2;
        ballSpeedX = 2;
        ballSpeedY = 2;
        audioGoal.play();

    }

    //odbijanie piłki
    //const middlePaddel = aiY + paddelHeight/2;
    //const middleBall = ballY + ballSize/2;

    if(ballX <= playerX + paddelWidth){
        
        
        if(ballY >= playerY - ballSize && ballY <= playerY + paddelHeight ){
            if(ballSpeedX <= 0){
                ballSpeedX = -ballSpeedX;
                audioHitBall.play();
                speedUp();
            };
        }
    
    }

    if(ballX + ballSize >= aiX){
        if(ballY >= aiY - ballSize && ballY <= aiY + paddelHeight  ){
            if(ballSpeedX >= 0){
                ballSpeedX = ballSpeedX * -1;
                audioHitBall.play();
                speedUp();
            };
        }
    
    }

    

}

function table(){
    context.fillStyle = "#333";
    context.fillRect(0,0,cw,ch);

    for(let linePosition = 0.04; linePosition < 1; linePosition+= 0.06){
        context.fillStyle = "gray";
        context.fillRect(cw / 2 - lineWidth / 2, ch * linePosition,lineWidth,lineHeight);

    }

}

topCanvas = canvas.offsetTop;
// console.log(topCanvas)

function playerPosition(event){
    // console.log("pozycja myszy to" + (event.clientY - topCanvas));
    playerY = event.clientY - topCanvas - (paddelHeight / 2);

    if(playerY <= 0){
        playerY = 0;
    }
    if(playerY >= ch - paddelHeight){
        playerY = ch - paddelHeight;
    }

    // aiY = playerY;
}




function aiPosition(){
    const middlePaddel = aiY + paddelHeight/2;
    const middleBall = ballY + ballSize/2;
    
    if (middleBall < middlePaddel)
    aiY -= 5;
    if (middleBall > middlePaddel)
        aiY += 5;

    if(aiY <= 0){
        aiY = 0;
    }
    if(aiY >= ch - paddelHeight){
        aiY = ch - paddelHeight;
    }
    
}

function speedUp(){
    if(ballSpeedX > 0 && ballSpeedX < 16){
        ballSpeedX += .3;       
    }
    else if(ballSpeedX < 0 && ballSpeedX > -16){
        ballSpeedX -= .3;       
    }
    
    if(ballSpeedY > 0 && ballSpeedY < 16){
        ballSpeedY += .2;       
    }
    else if(ballSpeedY < 0 && ballSpeedY > -16){
        ballSpeedY -= .2;       
    }
}

function result(){
    context.font = "30px Arial";
    context.fillText(playerPoints, cw/2 - cw * 0.1, ch * 0.1);
    context.fillText(aiPoints, cw/2 + cw * 0.1, ch * 0.1);
}

canvas.addEventListener("mousemove",playerPosition)

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
    result();
}

audioGoal.play();
setInterval(game, 1000 / 60);