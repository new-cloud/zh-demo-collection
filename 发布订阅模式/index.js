let obj = {
    name: 'xx'
}
Object.defineProperty(obj,'age',{
    get(){
        return 11
    }
})
// 如果使用defineProperty只能对对象其中一个属性进行修改 
// 而defineProperties可以同时修改几个
// Object.defineProperties(obj, {
//     age: {
//         get(){
//             return 11
//         }
//     }
// })
// obj.age = 12;
console.log(obj)
console.log(obj.age)