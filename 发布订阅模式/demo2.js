//观察者模式

    //被观察者  例: 公司    
    class Subject {
        constructor(){
            this.state = '进行中';
            this.arr = [];
        }
        attach(obj) {
            this.arr.push(obj);
        }
        setState(newState){
            this.state = newState;
            this.arr.forEach(obj=>obj.update(newState));
        }
    }
    //观察者  例: 面试人员
    class Observer {
        constructor(name){
            this.name = name;
        }
        update(newState) {
            console.log(this.name+ '状态是'+ newState);
        }
    }
    
    let a = new Observer('面试者1');
    let b = new Observer('面试者2');
    let baobao = new Subject('公司');
    baobao.attach(a); //被观察者接收观察者a ,  面试者被公司接收了,开始面试了
    baobao.attach(b);

    baobao.setState('结束了'); //公司一并发送消息
    