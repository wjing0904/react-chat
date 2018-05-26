const ADD_GUN='加机关枪';
const REMOVE_GUN='减机关枪';

//reducer
export function counter(state=10,action){
    //console.log(state)
    switch (action.type) {//管理状态
        case ADD_GUN:   
            return state+1;
        case REMOVE_GUN:
            return state-1;
        default:
            return state;
    }
}
//action creator
export function addGun(){
    return {type:ADD_GUN}
}
export function removeGun(){
    return {type:REMOVE_GUN}
}
export function addGunAsync(){
    return dispatch=>{
        setTimeout(() => {
            dispatch(addGun())
        }, 2000);
    }
}