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
console.log(new obj('aa'));
//接口
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