import axios from 'axios'

const LOGIN='LOGIN'
const LOGOUT='LOGOUT'
const USER_DATA='USER_DATA'
const initState={
    isAuth:false,
    username:'李云龙',
    age:20
}
//建立reduce
export function auth(state=initState,action){
    console.log(state,action)
// export function auth(state={isAuth:false,username:'李云龙'},action){
    console.log(state)//合并后的：{isAuth:false,user:'李云龙'
    // console.log(state)//合并后的：{isAuth:false,user:'李云龙'
    switch (action.type) {
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
            case USER_DATA:
            return {...state,username:action.payload.username,age:action.payload.age}
            // return {...state,...action.payload}
        default:
            return state;
    }
}
//action creator
export function getUserData(){//异步获取数据
    //dispatch用来通知数据修改
    return dispatch=>{
        axios.get('/data')
        .then((res)=>{
            if(res.status===200){
                dispatch(userData(res.data))
                // this.setState({data:res.data})
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
//action creator
export function userData(data){//操作类型
    return {type:USER_DATA,payload:data}
}
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}