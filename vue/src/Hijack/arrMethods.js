// 重写 数组的方法
let oldArrF = Array.prototype;

const newArrF = Object.create(oldArrF);
const F = [
    'push',
    'shift'
]
F.forEach(key=>{
    newArrF[key] = function(...args){
        if(key === 'push'){
            console.log('调用了psuh')
            //防止添加的属性是一个对象
            this.__ob__.walk(args[0]);
        }
        // 依次对其他方法进行重写
        oldArrF[key].apply(this,args);
    }
})
export default newArrF;