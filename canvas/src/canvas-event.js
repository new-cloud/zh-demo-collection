var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// ctx.beginPath();
// ctx.rect(50,50,200,200);
// ctx.stroke();
// ctx.fillRect(50,50,200,200);
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(50,300,200,200);
// ctx.stroke();
// ctx.closePath();

ctx.beginPath();
ctx.moveTo(100, 75)
ctx.arc(100, 75, 50, Math.PI*2/360* 60, Math.PI*2/360* 120);
ctx.closePath();
ctx.stroke();
ctx.beginPath();

// 点击在线上面 并不会触发事件
// ctx.beginPath();
// ctx.strokeStyle = '#fff';
// ctx.lineWidth = 60;
// ctx.shadowBlur = 8;
// ctx.shadowColor = "rgba(0, 0, 0, .4)";
// ctx.arc(200, 200, 50, Math.PI*2/360* 60, Math.PI*2/360* 300);
// // ctx.closePath();
// ctx.stroke();

// ctx.fillRect(50,50,200,200);
c.addEventListener('click', function(e){
    // console.log(e.offsetX);
    // console.log(e.offsetY);
    if(ctx.isPointInPath(e.offsetX, e.offsetY)){
        console.log('点到我了!')
    }
    
})