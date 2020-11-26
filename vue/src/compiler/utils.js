import { Observer } from './PublishSubscribe';

export default {
    getExpr(vm,expr) {
        return expr.split('.').reduce((data,key) => {
            return data[key];
        },vm.$data)
    },
    setVal(vm,expr,value){
        expr.split('.').reduce((data,key,index,arr) => {
            if(index === arr.length-1){
                data[key] = value;
            }
            return data[key];
        },vm.$data);
    },
    model(node,expr,vm){
        let fn = this.updater.modelUpdater;
        new Observer(vm,expr,(newVal)=>{
            fn(node,newVal);
        });
        node.addEventListener('input',(e)=>{
            let value = e.target.value;
            this.setVal(vm,expr,value);
        });
        let value = this.getExpr(vm,expr);
        fn(node,value);
    },
    on(node,expr,vm,eventName){
        node.addEventListener(eventName,(e)=>{
            vm[expr].call(vm,e);
        })
    },
    html() {},
    //...
    getContentVal(vm,expr){
        return expr.replace( /\{\{(.+?)\}\}/g, (...args) => {
            return this.getExpr(vm,args[1]);
        });
    },
    text(node,content,vm) {
        let fn = this.updater.textUpdater;
        let value = content.replace( /\{\{(.+?)\}\}/g, (...args) => {
            new Observer(vm,args[1],()=>{
                let vlaue2 = this.getContentVal(vm,content);
                fn(node,vlaue2);
            }); 
            return this.getExpr(vm,args[1]);
        });
        fn(node,value);
    },
    updater: {
        modelUpdater(node,value) {
            node.value = value;
        },
        htmlUpdater() {},
        textUpdater(node,value) {
            node.textContent = value;
        }
        //...
    }
}