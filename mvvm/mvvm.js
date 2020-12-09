
class Beobserver{
    constructor(){
        this.arr = [];
    }
    subscribe(observer) {
        this.arr.push(observer);
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
class Hijack{ //数据劫持
    constructor(data){
        console.log(data)
        this.observer(data);
    }
    observer(data){
        //如果是对象才观察
        if(data && (typeof data) == 'object'){
            for(let key in data){
                this.defineRecative(data,key,data[key]);
            }
        }
    }
    defineRecative(data,key,value){
        let _this = this;
        //递归 对对象 实现深度观察
        this.observer(value);
        let dep = new Beobserver();
        //观察对象属性
        Object.defineProperty(data,key,{
            get(){
                Beobserver.target && dep.subscribe(Beobserver.target);
                return value;
            },
            set(newVal){
                if(value != newVal){
                    //防止修改的值 是一个新对象
                    _this.observer(newVal);
                    value = newVal;
                    dep.release();
                }
            }
        })
    }
}
// 基类  调度
class Compiler{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);
        this.vm = vm;
        let fragment = this.nodeFragment(this.el);

        //编译模板
        this.compile(fragment);
        this.el.appendChild(fragment);
    }
    isElementNode(node){
        //判断传入的el 是否是一个元素节点
        return node.nodeType === 1;
    }
    nodeFragment(node){
        let fragment = document.createDocumentFragment();
        let nodeChildl;
        // let fragment2 = document.createDocumentFragment();
        //下面这句代码执行进行了2个操作
          //1 执行赋值操作 nodeChildl = node.firstChild
          //2 执行while(nodeChildl)
          //while是条件为真的情况下才执行，也就是必须node.firstChild有值的情况下才执行
        //然后循环里面的代码 fragment.appendChild 先是从 node 抽离出 DOM 再添加
        // while (nodeChildl = node.firstChild) {
        //     //排除掉除了注释之外的元素节点
        //     if(nodeChildl.nodeName != '#comment'){
        //         fragment.appendChild(nodeChildl);
        //     }else{
        //         fragment2.appendChild(nodeChildl);
        //     }
        // }
        // fragment2 = null;
        let nodearr = [...node.children];
        for(let i in nodearr){
            fragment.appendChild(nodearr[i]);
        }
        return fragment;
    }
    compile(template){  //编译文档片段中的dom节点
        let childNodes = template.childNodes;
        [...childNodes].forEach(item => {
            if(this.isElementNode(item)){
                this.compileElement(item);
                //如果是元素的 把自己传进去 遍历子节点
                this.compile(item);
            }else{
                this.compileText(item);
            }
        })
    }
    isDirective(attr){
        //查看属性名 是否以 v- 开头
        return attr.startsWith('v-');
    }
    //编译元素
    compileElement(node){
        let attrs = node.attributes;
        [...attrs].forEach(item => {
            let { name,value:expr } = item;
            if(this.isDirective(name)){ //v-model v-html v-if
                let [,dirctive] = name.split('-');
                let [dirctiveName,eventName] = dirctive.split(':');
                //根据传入的不同指令执行不同的方法
                CompileUtils[dirctiveName](node,expr,this.vm,eventName);
            }
        })
    }
    //编译文本
    compileText(node){
        let content = node.textContent;
        //如果文本内容是{{}}
        if(/\{\{(.+?)}\}/.test(content)){
            CompileUtils.text(node,content,this.vm);
        }
    }
}
CompileUtils = {
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
class Vue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;
        let methods = options.methods;
        if(this.$el){
            //监听 实现数据劫持 用Object.defineProperty为对象的每一个属性添加 get 和 set 方法
            new Hijack(this.$data);
            //计算属性
            for(let key in computed){
                Object.defineProperty(this.$data,key,{
                    get:()=>{
                        return computed[key].call(this);
                    }
                })
            }
            //实例方法
            for(let key in methods){
                Object.defineProperty(this,key,{
                    get:()=>{
                        return methods[key];
                    }
                })  
            }
            //把数据获取操作 vm上的取值操作 都代理到 vm.$data
            this.proxyVm(this.$data);
            //编译模板
            new Compiler(this.$el,this);
        }
    }
    proxyVm(data){
        for(let key in data){
            Object.defineProperty(this,key,{
                get:()=>{
                    //这里只是将最外层的值修改了返回值
                    //为什么 取对象多层嵌套里面的值还是返回正确
                    //因为JS取值是从外面开始取,
                    //比如 vm.form.input 是先去vm.form 在取vn.form返回值的 .input
                    //所以这里将最外面的form返回值修改后  就不用再修改form里每个值的返回值了
                    return this.$data[key];
                },
                set:(newVal)=>{
                    this.$data[key] = newVal;
                }
            })
        }
    }
}