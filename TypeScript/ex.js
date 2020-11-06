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
var res = {
    data: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
    ]
};
var asdsd;
asdsd = 1;
console.log(asdsd);
// export {}
