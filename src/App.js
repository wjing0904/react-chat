import React from 'react'
import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync} from './index.redux'

class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}
//connect需要两个参数 ：
//mapStatetoProps:你需要state的什么参数塞到props;
//actionCreators:你需要state的什么方法到props,自动dispatch
const mapStatetoProps=(state)=>{
    return {num:state.counter}
}
const actionCreators={ addGun,removeGun,addGunAsync }
//装饰器
//可改写为：@connect(mapStatetoProps,actionCreators)
// @connect(
//   state=>num:state,
// { addGun,removeGun,addGunAsync }
//)
App =connect(mapStatetoProps,actionCreators)(App)
export default App