"use strict";
exports.__esModule = true;
var ttt = 'kahu';
// console.log(ttt)
//数组
var list = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [1, 2, 3, '4'];
// console.log(list3);
//元组  就是可以定义一个数组,各元素类型不必相同
var x; //长度也固定死 为2 ?
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error
//枚举 
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
    Sex[Sex["UNKNOWN"] = 2] = "UNKNOWN";
})(Sex || (Sex = {}));
function checkSex(sex) {
    var result = '';
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
var member_sex = Sex.FEMALE;
// console.log(checkSex(member_sex)) // 女
function add(a, b) {
    console.log(a);
    return '11';
}
// console.log(add('aa'));
//类的定义
var obj = /** @class */ (function () {
    function obj(name) {
        this.name = 'xx';
    }
    return obj;
}());
function f(o) {
    console.log(o.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
f(myObj);
function render(res) {
    res.data.forEach(function (val) {
        console.log(val);
    });
}
var res = {
    data: [
        { id: 1, age: 'A' },
        { id: 2, name: 'B' },
    ]
};
var res1 = {
    data: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
    ]
};
