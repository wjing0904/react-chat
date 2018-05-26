import React from 'react';
//import 'antd-mobile/dist/antd-mobile.css'
import {Button } from 'antd-mobile'
// import {List } from 'antd-mobile'

class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        const store=this.props.store;
        const num=store.getState();
        const addGun=this.props.addGun;
        const removeGun=this.props.removeGun;
        const addGunAsync=this.props.addGunAsync;
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
                <Button type='primary' onClick={()=>store.dispatch(addGun())}>申请武器</Button>
                <Button type='warning' onClick={()=>store.dispatch(removeGun())}>上交武器</Button>
                <Button type='primary' onClick={()=>store.dispatch(addGunAsync())}>拖两天再给</Button>
            </div>
        )
    }
}

export default App;