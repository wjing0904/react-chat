import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, getUserData } from './Auth.redux'


class Auth extends React.Component{
  /* 无redux 用axios请求数据   
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    //axios请求数据
    componentDidMount(){
        axios.get('./data')
        .then(res => {
            console.log(res)
            if(res.status === 200){
                this.setState({data:res.data})
            }
        }).catch(error => {
            console.log(error)
        })
    } */
    componentDidMount(){
        //运用auth.redux里的getUserData获取数据方法
        this.props.getUserData()
    }
    render(){
        return (
            <div>
                <h2>你好! 我的名字是:{this.props.user},年龄：{this.props.age}</h2>
                {/* 判断是否登录 */}
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null }
                <h1>你没有权限，需要登录才可以看</h1>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

//两个reducer 每一个reducer都有一个state ,用combineReducers合并
Auth = connect(
    state=>state.auth,
    {login, getUserData}
)(Auth)
export default Auth