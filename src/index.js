import React from 'react'
import ReactDom from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css';
//createStore:创建redux store；applyMiddleware使用thunk方法；compose:组合两个方法
import { createStore ,applyMiddleware,compose} from 'redux'
import { BrowserRouter, Route, Redirect, Switch   } from 'react-router-dom'

// thunk中间件，将dispatch里返回的对象变为方法
import thunk from 'redux-thunk'
//connect 连接
import {Provider} from 'react-redux'

import './config'
import './index.css'
import reducers from './reducers'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
//判断是否开启调试工具
const windowDevToolsExtension=window.devToolsExtension?window.devToolsExtension():fn=>fn()

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    windowDevToolsExtension
)) 
// function Boss(){
//     return <h2>boss页面</h2>
// }

//boss genius me msg 四个页面
//查看当前store内容
console.log('store.getState()',store.getState())
ReactDom.render(
    <Provider  store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                {/* Switch子组件下直接命中第一个 后面的就不管了 */}
                <Switch>：
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>

                {/* 找不到进入login */}
                {/* <Redirect to='/login'></Redirect> */}
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'))
