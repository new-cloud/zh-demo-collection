
/**
 * 
 * @param {*} type 类型
 * @param {*} props 节点属性
 * @param {...any} chidren 所有子节点
 */

export default function createdElement(type, props = {}, ...chidren){
    let key;
    if(props.key){
        key = props.key;
        delete props.key;
    }
    chidren = chidren.map(chidn => {
        if(typeof chidn == 'string'){
            return vNode( { text:chidn } );
        }else{
            return chidn;
        }
    })
    return vNode( { type, key, props, chidren } );
    
}
function vNode(obj){
    return Object.assign({ 
        type: undefined,
        key: undefined,
        props: undefined,
        chidren: undefined,
        text: undefined
    }, obj);
}