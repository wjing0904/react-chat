//react-redux-router-axios-login
import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';//引入applyMiddleware中间件 处理异步请求
import {Provider} from 'react-redux'//react-redux仅有2个API，Provider和connect，Provider提供的是一个顶层容器的作用，实现store的上下文传递。
import './config'
import 'antd-mobile/dist/antd-mobile.css' 

import {
    BrowserRouter,
    Route,
    // Link,
    Redirect,//路由跳转，to属性自动跳转
    Switch//只渲染第一个router组件
} from 'react-router-dom'

import reducers from './reducer'
import Auth from "./Auth"
import Dashboard from "./Dashboard"
//使用redux-devtools,先判断有无devToolsExtension
const reduxDevtools=window.devToolsExtension?window.devToolsExtension:()=>{};
const store=createStore(reducers,compose(
    applyMiddleware(thunk),reduxDevtools()
))
console.log(store.getState())//auth{isAuth: false, user: "李云龙"}counter:10

// class Test extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     render(){
//         console.log(this.props)//history：历史记录,location：当前位置,match：与参数有关 params 
//     //    this.props.history.push('/'):跳转到路由根目录
//         return <h2>测试组件404 {this.props.match.params.location}</h2>
//     }
// }
//登录：没有登录页面 统一调到login:Redirect
//页面 有导航+显示+注销 ：一营， 二营， 骑兵连
//router+redux

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
        <Switch>
            {/* 只渲染第一个组件 */}
            <Route path='/login' exact component={Auth}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Redirect to='/dashboard'></Redirect>
        </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)