import React from 'react'
import {connect} from 'react-redux'
import {login,getUserData} from './Auth.redux'
import {Redirect} from 'react-router-dom'
// import axios from 'axios'


class Auth extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         data:{}
    //     }
    // }
    componentDidMount(){
        this.props.getUserData()
    //     axios.get('/data')
    //     .then((res)=>{
    //         console.log(res)
    //         if(res.status==200){    
    //             this.setState({data:res.data})
    //         }
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    }
    render(){
        return (
            <div>
                <h2>我的名字是{this.props.username},年龄是{this.props.age}</h2>
                {/* <h2>我的名字是{this.state.data.username},年龄是{this.state.data.age}</h2> */}
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
                <h2>你没有权限，需要登录才能看</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}
//两个reducer 每个reducerd都有state
const mapStateToProps=(state)=>state.auth

//connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) 
// const actionsCreators={}

Auth= connect(mapStateToProps,{login,getUserData})(Auth)
export default Auth;