// react--redux:管理独立团
//1.新建stroe,通过reucde建立
import { createStore } from 'redux';
//reduce根据老的状态state和action 生产新的state

function counter (state=0,action){
    switch (action.type) {
        case 'addJiguanqiang':
           return state+1;
        case 'minusJiguanqiang':
            return state-1;
        default:
            return 10;
    }
}
//1.新建出的staore
const store=createStore(counter);
//2.获得初始化值
const init= store.getState();
console.log(init);//10

//4监听事件
function lister(){
    const current =store.getState();
    console.log(`现在有机枪${current}`);
}
//添加一个变化监听器
store.subscribe(lister)
//3.派发事件
store.dispatch({type:'addJiguanqiang'})
store.dispatch({type:'addJiguanqiang'})
console.log(store.getState());//11
store.dispatch({type:'minusJiguanqiang'})
console.log(store.getState());//10



