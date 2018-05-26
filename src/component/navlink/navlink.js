import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
@withRouter
class NavLinkBar extends React.Component {
    static propType = {//类型检测
        data: PropTypes.array.isRequired
    }
    render() {
        // const navList = this.props.data.filter(v => !v.hide)
        const navList = this.props.data.filter(v=>!v.hide)
        // const { navList } = this.state
        const { pathname } = this.props.location;
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{ uri: require(`./img/${v.icon}.png`) }}a
                        selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    />
                ))}
            </TabBar>
        )
    }
}
export default NavLinkBar;