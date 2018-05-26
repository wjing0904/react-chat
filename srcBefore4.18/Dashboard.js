import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import App from './App';
import {logout} from './Auth.redux'

const Erying = ()=>(<h1>二营</h1>)
const Qibinglian = ()=>(<h1>骑兵连</h1>)

class Dashboard extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        const match=this.props.match;
        console.log(match);
        const redirectToLogin=<Redirect to='/login'></Redirect>
        const app=(
            <div>
                <h2>独立团</h2>
                {this.props.isAuth?<button onClick={this.props.logout}>注销</button>:null}
                <ul>
                    <li>
                        <Link to={`${match.url}/`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.url}/`} exact component={App}></Route>
                <Route path={`${match.url}/erying`} component={Erying}></Route>
                <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
           </div>
        )
        return this.props.isAuth ? app : redirectToLogin
    }
}
//两个reducer 每个reducerd都有state
const mapStateToProps=(state)=>state.auth

//connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) 
// const actionsCreators={}

Dashboard= connect(mapStateToProps,{logout})(Dashboard)
export default Dashboard;