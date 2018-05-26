import React from 'react'
import ReactDom from 'react-dom'
//createStore:创建redux store；applyMiddleware使用thunk方法；compose:组合两个方法
import { createStore ,applyMiddleware,compose} from 'redux'
import { BrowserRouter, Route, Redirect, Switch   } from 'react-router-dom'

// thunk中间件，将dispatch里返回的对象变为方法
import thunk from 'redux-thunk'
//connect 连接
import {Provider} from 'react-redux'
import reducers from './reducers'
import Auth from './Auth'
import Dashboard from './Dashboard'
import './config'
import 'antd-mobile/dist/antd-mobile.css'

//判断是否开启调试工具
const windowDevToolsExtension=window.devToolsExtension?window.devToolsExtension():fn=>fn()

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    windowDevToolsExtension
)) 

//查看当前store内容
console.log(store.getState())
ReactDom.render(
    <Provider  store={store}>
     <BrowserRouter>

        <Switch>
            <Route path='/login' component={Auth}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Redirect to='/dashboard'></Redirect>
        </Switch>

        
     </BrowserRouter>
    </Provider>,
    document.getElementById('root'))


// 2018.4.11优化前
// function render(){
//     ReactDom.render(<App 
//         store={store}
//         addGun={addGun}
//         removeGun={removeGun}
//         addGunAsync={addGunAsync}
//         />,document.getElementById('root'))
// }
// render()
// //数据更新 页面渲染也更新
// store.subscribe(render)
// import { createStore } from 'redux'
// // 新建store:通过reducer新建：根据老的状态生成新的状态
// function counter (state=0,action){
//     switch (action.type) {//管理状态
//         case '加机关枪':   
//             return state+1;
//         case '减机关枪':
//             return state-1;
//         default:
//             return 10;
//     }

// }
// const store=createStore(counter)
// const init=store.getState()//初始值
// console.log(init)
// function listener(){
//     const current=store.getState();
//     console.log(`现在有机枪${current}把`)
// }
// store.subscribe(listener)//订阅监听变化
// //派发事件
// store.dispatch({
//     type:'加机关枪'
// })
// store.dispatch({
//     type:'加机关枪'
// })
// store.dispatch({
//     type:'减机关枪'
// })
// console.log(store.getState())