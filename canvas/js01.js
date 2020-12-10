var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
    
// 绘制一条线
ctx.moveTo(200,100);        //定义线条开始坐标
ctx.lineTo(210,110);    //定义线条结束坐标
ctx.stroke();

// 绘制矩形
ctx.fillStyle = "#2789FF";
ctx.fillRect(0,0,150,75);
   