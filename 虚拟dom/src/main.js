import { h, render, patch } from './vdom';

let vnode = h(
    'div',
    { id: 'div', key: 'xx',style: { color: 'red' } },
    h('p', { style: { background: 'greenyellow' }, key: 'A'},'A'),
    h('p', { style: { background: 'gold' }, key: 'B'},'B'),
    h('p', { style: { background: 'blue' }, key: 'C'},'C'),
    h('p', { style: { background: 'fuchsia' }, key: 'D'},'D1')
);
// console.log(vnode);

//将虚拟节点转化为真实DOM 插入app元素
let app = document.getElementById('app');
let newVnode = h(
    'div',
    { id: 'div1', key: 'xx', 'data-index': 'xx',style: { color: 'red', width: '100px' } },
    h('p', { style: { background: 'fuchsia' }, key: 'F'},'F'),
    h('p', { style: { background: 'greenyellow' }, key: 'G'},'G'),
    h('p', { style: { background: 'gold' }, key: 'B'},'B'),
    h('p', { style: { background: 'goldenrod' }, key: 'C'},'C1'),
    h('p', { style: { background: 'greenyellow' }, key: 'A'},'A'),
    h('p', { style: { background: 'blue' }, key: 'E'},'E'),
);

render(vnode,app);
// patch(newVnode,vnode);
setTimeout(()=>{
    patch(newVnode,vnode);
},2000)
