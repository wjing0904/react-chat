const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
//新建app
const app = express();

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
//监听事件on 执行emit
//io:全局请求，socket：当前这次连接的请求
io.on('connection', function (socket) {
    // console.log('user login')
    socket.on('sendmsg',function(data){
        const {from,to,msg}=data
        const chatid=[from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })

        // console.log(data)
        // io.emit('receivemsg',data)
    })
})


//app.user使用中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function () {
    console.log('node app start at port 9093')
})