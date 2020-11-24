import { Hijack } from './Hijack/index';

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
};
function initMethods(vm) {};
function initComputed(vm) {};