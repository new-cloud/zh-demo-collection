
import { isObject } from '../utils/index';
import arrMethods from './arrMethods';
import { Beobserver } from '../compiler/PublishSubscribe';


export class Hijack{ //数据劫持
    constructor(data){
        console.log(data)
        if(!isObject(data)) throw new TypeError("data 的值必须是一个对象!");
        this.walk(data);
    }
    walk(data){
        //区分数组和对象
        if(Array.isArray(data)){
            //将walk传给数组，等数组push... 可能会调用
            data.__ob__ = this;
            // 重写数组的 push shift unshift ....
            data.__proto__ = arrMethods;
            data.forEach(item=>{
                this.walk(item);
            })
        }else{
            //如果是对象才观察
            if(data && (typeof data) == 'object'){
                for(let key in data){
                    this.defineRecative(data,key,data[key]);
                }
            }
        }
    }
    defineRecative(data,key,value){
        let _this = this;
        //递归对 对象 实现深度观察
        this.walk(value);
        let dep = new Beobserver();
        //观察对象属性
        Object.defineProperty(data,key,{
            get(){
                Beobserver.target && dep.subscribe(Beobserver.target);
                return value;
            },
            set:(newVal)=>{
                if(value != newVal){
                    //防止修改的值 是一个新对象
                    this.walk(newVal);
                    value = newVal;
                    dep.release();
                }
            }
        })
    }
}