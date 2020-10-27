/*
 * 如果想完成插件组件的封装，而且让其能够更好的被应用
 *   + 站在巨人的肩膀上：二次封装、研究其特点和源码
 *   + 结合自己的实战经验
 * 
 * 有的插件是纯JS，不需要样式；但是有的插件/UI组件，是需要有样式支持的，样式如何处理：
 *   + 全部写在插件中，一般以行内样式的方法，写给对应创建的元素：这样别人调用插件的时候，方便一些，直接导入JS即可，可以不管样式；插件中的代码乱，而且不方便后期用户自定义样式；
 *   + 也可以在插件中动态创建link，导入外部资源样式：需要网络（CSS一般要放到CDN上）
 *   + JS和CSS分离，需要用户单独导入CSS：导入的样式要避免和现有的样式的冲突，但是用户可以自己基于观看插件样式，进行样式的二次配置！
 * 
 * 进行任何的插件/类库/框架的封装，最好都采用OOP面向对象模式
 *   + 可以创建类的实例，实例是单独的
 *   + 实例具备私有的属性，也具备一些公共的方法
 *   + 还可以基于继承等方式，实现多个插件之间的关联
 *   + ...
 */
(function () {
    // 封装插件的时候，我们需要支持N多的配置项，有的配置项不传递有默认值：此时我们千万不要一个个定义形参，而是采用对象的方法（可以不传，而且不用考虑传递的顺序 =>参数三个以上最好用对象）
    function ModalPlugin(options) {
        // console.log(this) window
        //实例化 init函数   init函数变为一个构造函数  return 的是一个叫init 的对象了
        return new init(options);
    }

    // 类的原型：公共的属性方法
    ModalPlugin.prototype = {
        constructor: ModalPlugin,
        // 相当于大脑，可以控制先干什么再干什么（命令模式）
        init() {
            // 创建DOM结构
            this.createDOM();

            // 基于事件委托实现点击事件的处理
            this.dpnDialog.addEventListener('click', ev => {
                let target = ev.target,
                    targetTag = target.tagName;

                // 点击的是关闭按钮
                if (targetTag === 'I' && target.className.includes("dpn-close")) {
                    this.close();
                    return;
                }

                // 点击的是底部按钮
                if (targetTag === "BUTTON" && target.parentNode.className.includes("dpn-handle")) {
                    let index = target.getAttribute("index"),
                        func = this.options.buttons[index]['click'];
                    if (typeof func === "function") {
                        func.call(this);
                    }
                }
            });

            this.fire('init');
        },
        // 创建DOM结构
        createDOM() {
            let {
                title,
                template,
                buttons
            } = this.options;

            let frag = document.createDocumentFragment(),
                dpnDialog = document.createElement('div');
            dpnDialog.className = "dpn-dialog";
            dpnDialog.innerHTML = `
                <div class="dpn-title">
                    ${title}
                    <i class="dpn-close">x</i>
                </div>
                <div class="dpn-content">
                    ${
                        typeof template==="object" && template.nodeType?
                        template.outerHTML:
                        template
                    }
                </div>
                ${buttons.length>0?`<div class="dpn-handle">
                    ${buttons.map((item,index)=>{
                        return `<button index="${index}">
                            ${item.text}
                        </button>`;
                    }).join('')}
                </div>`:''}
            `;
            frag.appendChild(dpnDialog);
            let dpnModel = document.createElement('div');
            dpnModel.className = "dpn-model";
            frag.appendChild(dpnModel);
            document.body.appendChild(frag);
            frag = null;

            this.dpnDialog = dpnDialog;
            this.dpnModel = dpnModel;
        },
        // 控制它显示
        open() {
            this.dpnDialog.style.display = "block";
            this.dpnModel.style.display = "block";

            this.fire('open');
        },
        // 控制其隐藏
        close() {
            this.dpnDialog.style.display = "none";
            this.dpnModel.style.display = "none";

            this.fire('close');
        },
        // 向事件池中订阅方法
        on(type, func) {
            let arr = this.pond[type];
            if (arr.includes(func)) return;
            arr.push(func);
        },
        // 通知事件池中的方法执行
        fire(type) {
            let arr = this.pond[type];
            arr.forEach(item => {
                if (typeof item === "function") {
                    item.call(this);
                }
            });
        }
    };

    function init(options = {}) {
        // 参数初始化:传递进来的配置项替换默认的配置项
        options = Object.assign({ 
            title: '系统提示',
            template: '',
            drag: true,
            buttons: []
        }, options);

        // let obj1 = {name:1}
        // let obj2 = {ses:2}
        // Object.assign(obj1,obj2)
        // console.log(obj1,obj2)  //返回 {name: 1, ses: 2} {ses: 2} 
        //也就是说Object.assign返回的是对象1，也会直接改变对象1，如果对象2和对象1的键冲突，取对象2的键值
        // let obj2 = {name:2,ses:2}
        // console.log(obj1,obj2)  //返回 {name: 2, ses: 2} {ses: 2} 

        // 把信息挂在到实例上：在原型等各个方法中，只要this是实例，都可以调用到这些信息
        // console.log(this)//指向 new init 创建出来的新对象  init{}
        this.options = options;
        // 事件池
        this.pond = {
            init: [],
            close: [],
            open: []
        };
        this.init();
    }
    init.prototype = ModalPlugin.prototype;

    // 浏览器直接导入，这样方法是暴露到全局
    window.ModalPlugin = ModalPlugin;

    // 还需要支持ES6Module/CommonJS模块导入规范
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = ModalPlugin;
    }
})();