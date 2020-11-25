import { initState } from './state';
import { isElementNode } from './utils/index';
import { compileToFn } from './compiler/index';

function initMixin(Vue){
    Vue.prototype._init = function(options){
        this.$options = options;
        initState(this);
        if(options.el){
            let el = isElementNode(options.el)?options.el:document.querySelector(options.el);
            this.$mount(el);
        }
    }
    Vue.prototype.$mount = function(el) {
        const vm = this;
        const options = vm.$options;
        let template = options.template;
        if(!template){
            template = el.outerHTML;
        }
        console.log(template);
        let render = compileToFn(template);
        
    }
}

export default initMixin;