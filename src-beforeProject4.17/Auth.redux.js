import axios from 'axios'

const LOGIN='LOGIN'
const LOGOUT='LOGOUT'
const UESR_DATA='UESR_DATA'

const initState={
    isAuth:false,
    user:'李云龙',
    age:20
}
export function auth(state=initState,action){
    console.log('auth.redux',state,action)
    switch (action.type) {
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false} 
        case UESR_DATA:
            //全部传 ：return {...state, ...action.payload}  
            return {...state, user:action.payload.user,age:action.payload.age}  
        default:
            return state
    }
}
//action creator
//异步获取数据
export function getUserData(){
    //用dispatch来通知数据修改
    return dispatch => {
        axios.get('./data')
        .then(res => {
            console.log(res)
            if(res.status === 200){
                dispatch(userData(res.data))
            }
        }).catch(error => {
            console.log(error)
        })
    }
}
export function userData(data){
    return {type:UESR_DATA,payload:data}
}
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}