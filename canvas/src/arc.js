var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

/**
 * sA 起始角度
 * eA 结束角度
 */
// arc(x, y, r, sA, eA, 顺逆时针bool)
ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();

// 案例1 环形进度条
function add(n) {
    let rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
    speed = 0.1; //加载的快慢就靠它了 
    // 背景
    ctx.fillStyle = "#1B1F28";
    ctx.fillRect(0,0,300,300);
    // 内环
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(100,100,35,2*Math.PI,0*Math.PI);
    ctx.stroke();
    // 进度环
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
    ctx.arc(100, 100, 35, -Math.PI/2, -Math.PI/2 +n*rad, true);
    ctx.stroke();
}
// add(10);
