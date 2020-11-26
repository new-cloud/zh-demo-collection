export function isObject(data) {
    return typeof data === 'object' && data !== null;
}
//判断传入的el 是否是一个元素节点
export function isElementNode(node) {
    return node.nodeType === 1;
}