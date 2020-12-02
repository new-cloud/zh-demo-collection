
import CompileUtils from './utils';

class Beobserver{
    constructor(){
        this.arr = [];
    }
    subscribe(observer) {
        this.arr.push(observer);
        console.log(this.arr)
    }
    release(){
        this.arr.forEach(observer=>observer.update());
    }
}
class Observer{
    constructor(vm,expr,cd){
        this.vm = vm;
        this.expr = expr;
        this.cd = cd;
        this.oldValue = this.get();
    }
    get(){
        Beobserver.target = this;
        let value = CompileUtils.getExpr(this.vm,this.expr);
        Beobserver.target = null;
        return value;
    }
    update(){
        let newVal = CompileUtils.getExpr(this.vm,this.expr);
        if(newVal != this.oldValue){
            this.cd(newVal);
        }
    }
}
export {
    Beobserver,
    Observer
}