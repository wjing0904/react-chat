import React from 'react';
import {addNum,minusNum} from './index.redux'

class App extends React.Component {
    render() {
        const store=this.props.store;
        console.log(store)
        const num=store.getState();
        return (
            <div>
                <h1>当前数：{num}</h1>
                <button onClick={()=>store.dispatch(addNum())}>加数据</button>
                <button onClick={()=>store.dispatch(minusNum())}>减数据</button>
            </div>
        )
    }
}
export default App;







// class App extends React.Component{
//     // constructor(props){
//     //     super(props)
//     // }

//     render(){
//         const num=this.props.num;
//        // const guns=['枪1','枪2','枪3','枪4']
//         return(
//             <div>
//                 <h1>现在有机枪{num}把</h1>
//                 {/* <List renderHeader={()=>{'武器列表'}}>
//                     {guns.map(g=>{
//                         return (
//                             <List.Item key={g}>{g}</List.Item>
//                         )
//                     })}
//                 </List> */}
//                 <button onClick={this.props.addGun}>申请武器</button>
//                 <button onClick={this.props.removeGun}>上交武器</button>
//                 <button onClick={this.props.addGunAsync}>拖两天再给</button>
//             </div>
//         )
//     }
// }
// const mapStateToProps=(state)=>{
//     return {
//         num:state
//     }
// }
// const actionsCreators={addGun,removeGun,addGunAsync}
// App= connect(mapStateToProps,actionsCreators)(App)
// export default App;