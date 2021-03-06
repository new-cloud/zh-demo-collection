import { initState } from './state';
import { isElementNode } from './utils/index';
import { compileToFn } from './compiler/index';
import compile from './compiler/compile';

function initMixin(Vue){
    Vue.prototype._init = function(options){
        this.$options = options;
        initState(this);
        if(options.el){
            let el = isElementNode(options.el)?options.el:document.querySelector(options.el);
            // this.$mount(el);
            new compile(el,this);
        }
    }
    Vue.prototype.$mount = function(el) {
        const vm = this;
        const options = vm.$options;
        let template = options.template;
        if(!template){
            template = el.outerHTML;
        }
        let render = compileToFn(template);
        
    }
}

export default initMixin;