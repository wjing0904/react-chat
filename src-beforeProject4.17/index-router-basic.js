import React from 'react'
import ReactDom from 'react-dom'
//createStore:创建redux store；applyMiddleware使用thunk方法；compose:组合两个方法
import { createStore ,applyMiddleware,compose} from 'redux'
import { BrowserRouter, Route, Link, Redirect, Switch  } from 'react-router-dom'

// thunk中间件，将dispatch里返回的对象变为方法
import thunk from 'redux-thunk'
//connect 连接
import {Provider} from 'react-redux'
import App from './App'
import { counter } from './index.redux'

//判断是否开启调试工具
const windowDevToolsExtension=window.devToolsExtension?window.devToolsExtension():fn=>fn()

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    windowDevToolsExtension
)) 
function erying(){
    return <h1>二营</h1>
}
function qibinglian(){
    return <h1>骑兵连</h1>
}

//临时测试组件
class Test extends React.Component{
    // constructor(props){
    //     super(props)
    //     }
        render(){
            //this.props包括match ，location，path..
            console.log(this.props)
            //制定到根目录：this.props.history.push('/')
            return <h2>测试组件{this.props.match.params.location}</h2>
        }
    }

// 2018.4.11优化后
ReactDom.render(
    <Provider  store={store}>
     <BrowserRouter>
        <div>
            <ul>
                {/*Link: 定义路由开始跳转的地方 */}
                <li><Link to='/'>一营</Link></li>
                <li><Link to='/erying'>二营</Link></li>
                <li><Link to='/qibinglian'>骑兵连</Link></li>
                
            </ul>
            {/* switch：只渲染第一个Route */}
            <Switch>
                {/* Route:路由出口的组件;exact:路由绝对匹配 */}
                <Route path='/' exact component={App}></Route>
                {/* Test 测试用 */}
                {/* <Route path='/:location' component={Test}></Route> */}
                <Route path='/erying' component={erying}></Route>
                <Route path='/qibinglian' component={qibinglian}></Route>
                {/* Redirect:指定跳转到某个根目录 */}
                {/* <Redirect to='/qibinglian'></Redirect> */}
                <Route path='/:location' component={Test}></Route>
            </Switch>
        </div>
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