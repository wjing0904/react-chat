import React from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux'


function Erying(){
    return <h1>二营</h1>
}
function Qibinglian(){
    return <h1>骑兵连</h1>
}
//临时测试组件
/* class Test extends React.Component{
    // constructor(props){
    //     super(props)
    //     }
    componentWillMount(){
        this.props.history.push({
            pathname: "/erying",
            search: "?the=query",
            state: { some: "state" }
          })
          
        //this.props.history.push({pathname: '/erying',state: sss});
    }
        render(){
            //this.props包括match ，location，path..
            console.log(this.props)
            //制定到根目录：
           // this.props.history.push('/'))
            return <h2>测试组件{this.props.match.params.location}</h2>
        }
    }
 */
class Dashboard extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        console.log(this.props)
        const matchPath=this.props.match;
        {/* 判断是否登录 */}
        const redirectToLogin = <Redirect to='/login'></Redirect> 
        const app = (
        <div>
            <h1>独立团</h1>
            {/* 登陆后可注销 */}
            {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
            <ul>
                {/*Link: 定义路由开始跳转的地方 */}
                <li><Link to={`${matchPath.url}/`}>一营</Link></li>
                <li><Link to={`${matchPath.url}/erying`}>二营</Link></li>
                <li><Link to={`${matchPath.url}/qibinglian`}>骑兵连</Link></li>
                
            </ul>
            {/* switch：只渲染第一个Route */}
            <Switch>
                {/* Route:路由出口的组件;exact:路由绝对匹配 */}
                <Route path={`${matchPath.url}/`} exact component={App}></Route>
                {/* Test 测试用 ：location带参数*/}
                {/* <Route path='/:location' component={Test}></Route> */}
                <Route path={`${matchPath.url}/erying`} component={Erying}></Route>
                <Route path={`${matchPath.url}/qibinglian`} component={Qibinglian}></Route>
                {/* Redirect:指定跳转到某个根目录 */}
                {/* <Redirect to='/qibinglian'></Redirect> */}
                {/* <Route path='/:location' component={Test}></Route> */}
            </Switch>
        </div>
    )
    return this.props.isAuth ? app : redirectToLogin
    }
}

Dashboard =connect(state=>state.auth, {logout})(Dashboard)
export default Dashboard;