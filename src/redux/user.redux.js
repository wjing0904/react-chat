import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}
//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload, pwd: '' }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}
//action creator
function authSuccess(obj) {
    //运用展开符 将参数obj里面含有pwd的属性过滤后放入data里
    const { pwd, ...data } = obj;
    return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg) {
    //简写msg对象前面，约定规范 return { type:ERROR_MSG ,msg:msg}
    return { msg, type: ERROR_MSG }
}
export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}


//退出登录清空数据
export function logoutSubmit() {
    return { type: LOGOUT }
}
//bossinfo保存
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {//请求成功
                    dispatch(authSuccess(res.data.data))
                } else {//请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}
// 登录
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {//dispatch返回一个函数
        axios.post('/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {//请求成功
                    dispatch(authSuccess(res.data.data))
                } else {//请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


//用户操作register
export function register({ user, pwd, repeatpwd, type }) {
    //用户输入验证
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {//dispatch返回一个函数
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {//请求成功
                    dispatch(authSuccess({ user, pwd, type }))
                } else {//请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }


}