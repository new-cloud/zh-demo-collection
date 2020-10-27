/**
 * 
 * @param {*} vnode 虚拟节点
 * @param {*} container 渲染容器
 */

export function render(vnode, container){
    let el = createDomElementFromVonde(vnode);
    container.appendChild(el);
}
// 通过虚拟的对象 创建一个真实的DOM 
function createDomElementFromVonde(vnode){
    let {type, key, props, chidren, text} = vnode;
    if(type){   //标签
        //创建元素
        vnode.domElement = document.createElement(type);
        //给元素添加属性
        updateAttr(vnode);
        if(chidren){
            chidren.forEach(item =>render(item,vnode.domElement))
        }
    }else{      //文本
        vnode.domElement = document.createTextNode(text);
    }
    return vnode.domElement;
}
/**
 * 
 * @param {*} vnode 
 * @param {*} oldProps //老节点属性
 */
function updateAttr(vnode, oldProps={}){
    let {domElement, props} = vnode;
    //如果老节点里面的属性 新节点没有 就删除
    for(let name in oldProps){
        if(!props[name]){
            delete domElement[name]
        }
    }
    let newStyle = props.style;
    let oldStyle = oldProps.style;
    for(let name in oldStyle){
        if(!newStyle[name]){
            domElement.style[name] = '';
        }
    }
    //如果新节点的属性 老节点没有 就添加
    for(let xname in props){
        if(xname == 'style'){
            let styleObj = props[xname];
            for(let attr in styleObj){
                domElement[xname][attr] = styleObj[attr];
            }
        }else{
            domElement.setAttribute(xname,props[xname]);
        }
    }
}

export function patch(newVnode,vnode){
    // console.log(vnode.domElement);
    //如果新元素是类型不同  就直接替换创建
    if(vnode.type !== newVnode.type){
        console.log('不会进来');
        return vnode.domElement.parentNode.replaceChild(
            createDomElementFromVonde(newVnode),
            vnode.domElement
        )
    }
    // //类型相同  并且是文本类型
    if(vnode.text){
        if(vnode.text === newVnode.text) return;
        return vnode.domElement.textContent = newVnode.text
    }
    //类型一样并且是标签 需要根据节点属性 更新老节点属性
    let domElement = newVnode.domElement = vnode.domElement;
    updateAttr(newVnode,vnode.props);
    let oldChildren = vnode.chidren;
    let newChildren = newVnode.chidren;
    if(oldChildren.length>0 && newChildren.length>0){
        uupdateChildren(domElement,oldChildren,newChildren);
    }else if(oldChildren.length>0){
        domElement.innerHTML = '';
    }else if(newChildren.length>0){
        [...newChildren].forEach(item=>{
            domElement.appendChild(createDomElementFromVonde(item));
        })
    }
}
function isSameVnode(oldVnode,newVnode){
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
}
//创建映射表
function keyMapIndex(oldChildren){
    let map = {};
    for(let i=0; i<oldChildren.length; i++){
        let current = oldChildren[i];
        if(current.key){
            map[current.key] = i;
        }
    }
    return map;
}
//diff 对比老旧元素
function uupdateChildren(parent, oldChildren, newChildren){
    let oldStartIndex = 0;
    let oldStartVnode = oldChildren[0];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVnode = oldChildren[oldEndIndex];
    let map = keyMapIndex(oldChildren);

    let newStartIndex = 0;
    let newStartVnode = newChildren[0];
    let newEndIndex = newChildren.length - 1;
    let newEndVnode = newChildren[newEndIndex];

    while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
        if(!oldStartVnode){
            oldStartVnode = oldChildren[++oldStartIndex]
        }else if(!oldEndVnode){
            oldEndVnode = oldChildren[--oldEndIndex]
        //先比较头和头是否相同
        }else if(isSameVnode(oldStartVnode,newStartVnode)){
            patch(newStartVnode,oldStartVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        //如果头和头是不相同  再比较尾和尾是否相同
        }else if(isSameVnode(oldEndVnode,newEndVnode)){
            patch(newEndVnode,oldEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        //头 和 尾  比较
        }else if(isSameVnode(oldStartVnode,newEndVnode)){
            patch(newEndVnode,oldStartVnode);
            // debugger;
            parent.insertBefore(
                oldStartVnode.domElement,
                oldEndVnode.domElement.nextSibling //nextSibling 返回某个元素后一个的节点
            );
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        //尾 和 头  比较
        }else if(isSameVnode(oldEndVnode,newStartVnode)){
            patch(newStartVnode,oldEndVnode);
            parent.insertBefore(
                oldEndVnode.domElement,
                newStartVnode.domElement
            );
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        //都不一样
        }else{
            //需要先拿到新的节点去老的数组中查找 存在就复用 不存在就直接插入
            let index = map[newStartVnode.key];
            console.log(map,newStartVnode.key,index);
            if(index == null){
                // map 队列中没有此项 直接创建新的节点插入
                parent.insertBefore(
                    createDomElementFromVonde(newStartVnode),
                    oldStartVnode.domElement
                );
            }else{
                // map 队列中存在此项 直接复用插入
                let toNode = oldChildren[index];
                patch(newStartVnode,toNode);
                parent.insertBefore(
                    toNode.domElement,
                    oldStartVnode.domElement
                )
                oldChildren[index] = undefined;
            }
            newStartVnode = newChildren[++newStartIndex];
            // debugger;
        }
    }

    //只有小于或等于等于 (因为前面数组长度减一所以要加等于) 就有多余的元素
    if(newStartIndex <= newEndIndex){
        // debugger;
        //合并不管是前面添加还是后面添加
        for(let i=newStartIndex; i<=newEndIndex; i++){
            let beforElement = newChildren[newEndIndex + 1] == 
                null? null:newChildren[newEndIndex+1].domElement;
            parent.insertBefore(
                createDomElementFromVonde(newChildren[i]),
                beforElement
            );
        }
    }
    //删除多余的节点
    if(oldStartIndex <= oldEndIndex){
        for(let i=oldStartIndex; i<=oldEndIndex; i++){
            if(oldChildren[i]){
                parent.removeChild(oldChildren[i].domElement);
            }
        }
    }
}