import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    //退出登录
    logout() {
        const alert = Modal.alert
        alert('注销', '你确定退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                    //强制刷新页面
                    // window.location.href = window.location.href
                }
            },
        ])
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const props = this.props;
        return props.user ? (
            <div>
                <Result
                    img={<img
                        src={require(`../img/${props.avatar}.png`)}
                        alt=""
                        style={{ width: 50 }} />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v =>
                            <Brief key={v}>{v}</Brief >
                        )}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    {/* <Item>退出登录</Item> */}
                    <Button onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}
export default User;