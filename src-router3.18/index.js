import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';//引入applyMiddleware中间件 处理异步请求
import {Provider} from 'react-redux'

import {
    BrowserRouter,
    Route,
    Link,
    Redirect,//路由跳转，to属性自动跳转
    Switch//只渲染第一个router组件
} from 'react-router-dom'

import App from './App';
import { counter } from './index.redux';
//使用redux-devtools,先判断有无devToolsExtension
const reduxDevtools=window.devToolsExtension?window.devToolsExtension:()=>{};
const store=createStore(counter,compose(
    applyMiddleware(thunk),reduxDevtools()
))
const Erying = ()=>(<h1>二营</h1>)
const Qibinglian = ()=>(<h1>骑兵连</h1>)

class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)//history：历史记录,location：当前位置,match：与参数有关 params 
    //    this.props.history.push('/'):跳转到路由根目录
        return <h2>测试组件404 {this.props.match.params.location}</h2>
    }
}
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
           <div>
                <ul>
                    <li>
                        <Link to='/'>一营</Link>
                    </li>
                    <li>
                        <Link to='/erying'>二营</Link>
                    </li>
                    <li>
                        <Link to='/qibinglian'>骑兵连</Link>
                    </li>
                </ul>
                <Switch>
                    {/* 只渲染第一个组件 */}
                    <Route path='/' exact component={App}></Route>
                    <Route path='/erying' component={Erying}></Route>
                    <Route path='/qibinglian' component={Qibinglian}></Route>
                    <Route path='/:location' component={Test}></Route>

                </Switch>
                {/* <Redirect to='qibinglian'></Redirect> */}
           </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)