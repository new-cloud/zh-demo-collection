let ttt: string = 'kahu';
// console.log(ttt)

//数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: Array<number | string> = [1, 2, 3, '4'];
// console.log(list3);

//元组  就是可以定义一个数组,各元素类型不必相同
let x: [string, number];  //长度也固定死 为2 ?
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error

//枚举 
enum Sex {
  MALE,
  FEMALE,
  UNKNOWN
}
function checkSex(sex: Sex) {
    let result: string = '';
    switch (sex) {
      case Sex.MALE:
        result = '男';
        break;
      case Sex.FEMALE:
        result = '女';
        break;
      case Sex.UNKNOWN:
        result = '未知';
        break;
      default:
        break;
    }
    return result;
}
let member_sex:Sex = Sex.FEMALE;
// console.log(checkSex(member_sex)) // 女

function add(a:'aa',b?:number):string{
    console.log(a)
    return '11';
}
// console.log(add('aa'));

//类的定义
class obj{
    name:string;
    constructor(name:string){
        this.name = 'xx';
    }
}
// console.log(new obj('aa'));

//接口

interface LabelledValue {
    label: string,
    color?: number,  //color 属性可有可没有
    readonly x: number, // x 只读属性 只能在对象刚刚创建的时候修改其值
    sayHi: ()=>string 
  }
  
  function f(o: LabelledValue) {
    console.log(o.label);
  }
  
  let myObj = {size: 10, label: "Size 10 Object", x: 20, sayHi: ():string =>{return "Hi there"}};
  //x 一经创建 值就无法修改
  f(myObj);
interface list {
    id: number,
    name: string
}
interface Result {
    data: list[]
}
function render(res:Result){
    res.data.forEach(val => {
        console.log(val)
    });
}
let res = {
    data: [
        {id: 1, age: 'A'},
        {id: 2, name: 'B'},
    ]
}
let res1 = {
    data: [
        {id: 1, name: 'A'},
        {id: 2, name: 'B'},
    ]
}
// console.log(render(res))  //报错
// console.log(render(res1))

export {}