
//AOP 函数切片编程
    //例子1
    // function sat(a){
    //     console.log( a + '点点')
    // }
    // Function.prototype.befor = function (beforFn){
    //     const _this = this;
    //     return function (...args){
    //         beforFn();
    //         _this(...args);
    //     }
    // }
    // let b = sat.befor(()=>{
    //     console.log('前前')
    // });
    // b('laji');
    //例子2
    // function perform(antMethod, warppers){
    //     return function (){
    //         warppers.forEach(warpper=>{
    //             warpper.initialize();
    //         });
    //         antMethod();
    //         warppers.forEach(warpper=>{
    //             warpper.close();
    //         });
    //     }
    // }
    // let myperform = perform(function (){
    //     console.log('主业务逻辑');
    // },[
    //     {
    //         initialize(){
    //             console.log('第一次 befor')
    //         },
    //         close(){
    //             console.log('第一次关闭')
    //         }
    //     },
    //     {
    //         initialize(){
    //             console.log('第二次 befor')
    //         },
    //         close(){
    //             console.log('第二次关闭')
    //         }
    //     },
    //     //.....
    // ]);
    // myperform();
    //例子3  after  一个函数 要求在执行几次(自定义)之后执行一段代码
    // 1.创建after函数
    // function after(num,callback){
    //     return function(){
    //         if(--num ===0){
    //             callback();
    //         }
    //     }
    // }
    // let fn = after(3,()=>{
    //     console.log('执行了')
    // });
    // fn();
    // fn(); //只要没执行3次就不会打印
    // fn(); //打印
    //2.after使用场景
    const fs = require('fs');
    function after(num,callback){
        let school = {};
        return function(key,value){
            school[key] = value;
            if(--num ===0){
                callback(school);
            }
        }
    }
    let out = after(2,function(res){
        console.log(res);
    })
    //并发处理  第二个文件读取不需要等第一个文件读取的结果返回
    fs.readFile('name.txt','utf8',function(err,data){
        out('name',data)
    })

    fs.readFile('age.txt','utf8',function(err,data){
        out('age',data)
    })

    //例子4 函数劫持  场景: [1,2].push(3) 在push方法添加3进去的时候执行一段代码,比如打印console.log('数组更新了')
    //1.重写push方法
    // let loadpush = Array.prototype.push;
    // function push(...args){
    //     console.log('数组更新了');
    //     loadpush.call(this,...args);
    //     // this.push.call(this,...args); //可以不用声明loadpush 直接一步到位
    // }
    // let arr = [1,2];
    // push.call(arr,3);
    // console.log(arr);