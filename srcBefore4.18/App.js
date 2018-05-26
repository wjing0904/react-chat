//注意 还未安装babel-plugin-transform-decorators-legacy :
//package.json:"plugins": ["transform-decorators-legacy"]

import React from 'react';
// import 'antd-mobile/dist/antd-mobile.css'
// import {button } from 'antd-mobile'
// import {List } from 'antd-mobile' 
//package.json babel配置 ：
// "plugins": [
//     ["import", {"libraryName": "antd-mobile", "style": "css" }]
//   ]
import { connect} from 'react-redux'

import {addGun,removeGun,addGunAsync} from './index.redux'


class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        const num=this.props.num;
       // const guns=['枪1','枪2','枪3','枪4']
        return(
            <div>
                <h1>现在有机枪{num}把</h1>
                {/* <List renderHeader={()=>{'武器列表'}}>
                    {guns.map(g=>{
                        return (
                            <List.Item key={g}>{g}</List.Item>
                        )
                    })}
                </List> */}
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        num:state.counter
    }
}
//connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) 
const actionsCreators={addGun,removeGun,addGunAsync}
App= connect(mapStateToProps,actionsCreators)(App)


//运用@connect优化写法
// @connect(//两个参数：第一个：要state什么属性放到props里
//     state=>({num:state}),
//     {addGun,removeGun,addGunAsync}//第二个参数是：要什么方法放到props,自动dispatch
// )
export default App;