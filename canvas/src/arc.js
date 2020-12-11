var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


ctx.fillStyle = "#1B1F28"; //填充矩形
ctx.fillRect(0,0,300,300);
ctx.beginPath();
/**
 * sA 起始角度
 * eA 结束角度
 */
// arc(x, y, r, sA, eA, 顺逆时针bool)
ctx.lineWidth = 5;
ctx.arc(100,100,35,2*Math.PI,0*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.lineCap="round";
var gradient=ctx.createLinearGradient(100,60,100,140);  // createLinearGradient 渐变对象
gradient.addColorStop("0","#E0535C");
gradient.addColorStop("0.48","#704DE6");
gradient.addColorStop("1","#1265B3");
ctx.strokeStyle = gradient;
ctx.shadowBlur = 5;
ctx.shadowColor = "rgba(248, 249, 250, .4)";
ctx.lineWidth = 5;
ctx.arc(100,100,35,1.5*Math.PI,0*Math.PI, true);
ctx.stroke();