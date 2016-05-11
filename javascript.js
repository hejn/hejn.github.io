var gameTime;
var intervalTime;
var stayTime;
var beginTime;
var remainTime;
var remainTimerId;
var showBlockTimerId;
var stayTimerId;
var totalBlocks=0;
var blocksHit=0;
var score=0;

$(document).ready(function(){
    $('#container').css('min-height', document.documentElement.clientHeight);
   gameTime=120;
   intervalTime=3;
   stayTime=4;
   document.getElementById("timeout").innerHTML=gameTime+" second";
   document.getElementById("score").innerHTML=score;
});

function startGame(){
    zero();
    initGame();
    checkTime();
    showBlocks();
}

function zero(){
    document.getElementById("score").innerHTML='0';
    totalBlocks=0;
    blocksHit=0;
    score=0;
}

function initGame(){
    gameTime=120;
   intervalTime=1;
   stayTime=2;
   document.getElementById("timeout").innerHTML=gameTime+" second";
   document.getElementById("score").innerHTML=score;
   
   document.getElementById("btn_start").disabled=true;
   document.getElementById("btn_end").disabled=false;
   beginTime=new Date();
}

function checkTime(){
    var now1=new Date();
    remainTime=gameTime-parseInt((now1.getTime()-beginTime.getTime())/1000);
    
    document.getElementById("timeout").innerHTML=remainTime+" second";
    remainTimerId=window.setTimeout('checkTime()',1000);
}

function showBlocks(){
    var rd=parseInt(Math.random()*9);
    document.images[rd].src='green.png';
    totalBlocks++;
    showBlockTimerId=setTimeout('showBlocks()',intervalTime*1000);
    stayTimerId=setTimeout('autoHidden('+rd+')',stayTime*1000);
    if(remainTime===0){
        stopGame();
    }
}

function hitB(evt){
    var src = evt.src;
    src = src.substr(src.length-9);
    console.log(src);
    
    if(src==='green.png'){
        
        blocksHit++;
        getScore();
        evt.src='pink.jpg';
        x=evt;
        setTimeout('hidden(x)',150);
    }
}

function hidden(obj){
    obj.src='white.png';
}

function autoHidden(rd){
    document.images[rd].src="white.png";
    getScore();
}

function getScore(){
    score=(2*blocksHit-totalBlocks)*100;
    document.getElementById('score').innerHTML=score;
}

function stopGame(){
    for(var i=0;i<9;i++){
        document.images[i].src="white.png";
    }
    clearTimeout(remainTimerId);
    clearTimeout(showBlockTimerId);
    clearTimeout(stayTimerId);
    document.getElementById("timeout").innerHTML="0 second";
    document.getElementById("btn_start").disabled=false;
    document.getElementById("btn_end").disabled=true;
    
}