import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

//1.联系高阶组件：函数当参数与函数当返回值 函数式编程：装饰器模式HOC
// function hello() {
//     console.log('hello imooc i love react')
// }
// function WrapperHello(fn) {
//     return function () {
//         console.log('before hello')
//         fn()
//         console.log('after hello')
//     }
// }
// hello = WrapperHello(hello)
// hello()

// 2.HOC高阶组件：属性代理 反向继承；

//属于：属性代理
// function WrapperHello(Comp) {
//      class WrapComp extends React.Component {//反向继承
//         componentDidMount() {
//             console.log('高阶组件新增的componentDidMount生命周期，加载完成')
//         }
//         render() {
//             return (
//                     <Comp></Comp>
//             )
//         }
//     }
//     // class WrapComp extends React.Component {//属性代理
//     //     render() {
//     //         return (
//     //             <div>
//     //                 <h3>这是HOC高阶组件特有的元素</h3>
//     //                 <Comp name='text' {...this.props}></Comp>
//     //             </div>
//     //         )
//     //     }
//     // }
//     return WrapComp
// }
// //装饰器模式写组件
// // Hello = WrapperHello(Hello)
// @WrapperHello
// class Hello extends React.Component {
//     render() {
//         return <h2>hello I love react && redux</h2>
//     }
// }



@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    //注册
    register() {
        this.props.history.push('/register')
    }
    //输入信息
    handleChange(key, val) {//注意 setstate是keyb必须加'[]'，否则变为key字符串
        this.setState({
            [key]: val
        })
    }
    //登录
    handleLogin() {
        console.log(this.props)
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                {/* <Hello /> */}
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                            type='password'
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary'
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;