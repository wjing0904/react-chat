import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
//1.发起连接:跨域 手动连接ws://...
const socket = io('ws://localhost:9093')
//2.输入广阔到全局

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', msg: [] }
    }
    componentDidMount() {
        // socket.on('receivemsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    //修正emoji跑马灯
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit() {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '', showEmoji: true })
    }
    render() {
        console.log('chatlist', this.props)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))
        const Item = List.Item
        const userid = this.props.match.params.user//当前聊天用户
        const users = this.props.chat.users//所有聊天的用户列表
        if (!users[userid]) {//获取不到user信息
            return null
        }
        //过滤消息列表
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (//对方：聊天对象
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (//自己
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar} alt='avatar' />}
                                    className='chat-me'
                                >{v.content}</Item>
                            </List>
                        )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={
                                v => { this.setState({ text: v }) }
                            }
                            extra={
                                <div>
                                    <span style={{ marginRight: 15 }}
                                        onClick={() => {
                                            console.log(111)
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                            this.fixCarousel()
                                        }}
                                    >😃</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }}
                        />
                        : null
                    }

                </div>
            </div>
        )
    }
}
export default Chat