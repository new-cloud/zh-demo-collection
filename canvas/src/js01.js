var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// 绘制矩形
// fillRect(x, y, w, h)
ctx.fillStyle = "#2789FF"; //填充矩形
ctx.fillRect(10,10,150,75);

ctx.strokeStyle = "#f0f"; //描边矩形
ctx.strokeRect(10, 100, 120, 80);


// 绘制路径
ctx.strokeStyle = '#000';
ctx.moveTo(100,200);        //定义线条开始坐标
ctx.lineTo(100,300);    //定义线条结束坐标
ctx.stroke();

ctx.beginPath(); //重制路径  每完成一次路径 都要重制路径之后 再开始下一次 路径

var gradient=ctx.createLinearGradient(0,0,170,0);  // createLinearGradient 渐变对象
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
ctx.strokeStyle = gradient;
// ctx.fillStyle = gradient; //填充矩形
// ctx.moveTo(70,380);
// ctx.lineTo(50,400);
// ctx.lineTo(50,700);
// ctx.lineTo(650,700);
// ctx.lineTo(650,520);
// ctx.lineTo(640,520);
// ctx.lineTo(640,460);
// ctx.lineTo(650,460);
// ctx.lineTo(650,380);
// ctx.lineTo(70,380);
// ctx.stroke();


   
// 绘制文本
ctx.font="30px Arial";
ctx.strokeText("Hello World",10,350);