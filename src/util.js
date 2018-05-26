// 根据用户信息 返回跳转地址
export function getRedirectPath(payload,avatar){
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (payload.type === 'boss') ? '/boss' : '/genius'
    if(!payload.avatar){
        url += 'info'
    }
    return url
}