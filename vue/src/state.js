import { Hijack } from './Hijack/index';

function proxyVm(vm){
    for(let key in vm.$data){
        Object.defineProperty(vm,key,{
            get:()=>{
                //这里只是将最外层的值修改了返回值
                //为什么 取对象多层嵌套里面的值还是返回正确
                //因为JS取值是从外面开始取,
                //比如 vm.form.input 是先去vm.form 在取vn.form返回值的 .input
                //所以这里将最外面的form返回值修改后  就不用再修改form里每个值的返回值了
                return vm.$data[key];
            },
            set:(newVal)=>{
                vm.$data[key] = newVal;
            }
        })
    }
};
export function initState(vm) {
    const opts = vm.$options;
    // 区分vue的数据来源 
    if(opts.prpos){
        initPrpos(vm);
    }
    if(opts.data){
        initData(vm);
    }
    if(opts.methods){
        initMethods(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
}
function initPrpos(vm) {};
function initData(vm) {
    let data = vm.$options.data;
    data = vm.$data = typeof data === 'function'? data.call(vm): data;
    new Hijack(data);
    //把数据获取操作 vm上的取值操作 都代理到 vm.$data
    proxyVm(vm);
};
function initMethods(vm) {
    //实例方法
    let methods = vm.$options.methods;
    for(let key in methods){
        Object.defineProperty(vm,key,{
            get:()=>{
                return methods[key];
            }
        })  
    }
};
function initComputed(vm) {
    //计算属性
    let computed = vm.$options.computed;
    for(let key in computed){
        Object.defineProperty(vm.$data,key,{
            get:()=>{
                return computed[key].call(vm);
            }
        })
    }
};