const ADD_GUN='addJiguanqiang';
const REMOVE_GUN='minusJiguanqiang';

//新建redux
export function counter(state=0,action){
    switch (action.type) {
        case ADD_GUN:
            return state+1;
        case REMOVE_GUN:
            return state-1;
        default:
            return 10;
    }
}
//action creater
export function addGun(){
    return {type:ADD_GUN}
}
export function removeGun(){
    return {type:REMOVE_GUN}
}
export function addGunAsync(){//异步延迟两秒
    return dispatch=>{//thunk插件的使用，这里可以返回函数
        setTimeout(()=>{
            dispatch(addGun());//异步结束后，手动dispatch
        },2000)
    }
}