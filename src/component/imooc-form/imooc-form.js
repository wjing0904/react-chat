import React from 'react'

export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange=this.handleChange.bind(this)
        }
        //登录注册输入信息
        handleChange(key, val) {//注意 setstate是keyb必须加'[]'，否则变为key字符串
            console.log(key,val)
            this.setState({
                [key]: val
            })
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}