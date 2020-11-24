import { initState } from './state';

function initMixin(Vue){
    Vue.prototype._init = function(options){
        this.$options = options;
        initState(this);
    }
}

export default initMixin;