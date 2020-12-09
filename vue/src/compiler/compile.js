import CompileUtils from './utils';

// 基类  调度
export default class Compiler{
    constructor(el,vm){
        this.vm = vm;
        let fragment = this.nodeFragment(el);
        //编译模板
        this.compile(fragment);
        el.appendChild(fragment);
    }
    isElementNode(node){
        //判断传入的el 是否是一个元素节点
        return node.nodeType === 1;
    }
    nodeFragment(node){
        let fragment = document.createDocumentFragment();
        let nodeChildl;
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