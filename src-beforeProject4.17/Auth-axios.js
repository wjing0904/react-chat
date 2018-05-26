import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from './Auth.redux'
import axios from 'axios'


class Auth extends React.Component{
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
    }
    render(){
        return (
            <div>
                <h2>你好 我的名字是{this.state.data.username}</h2>
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
    {login}
)(Auth)
export default Auth