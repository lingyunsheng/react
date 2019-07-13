export function getRedirectPath(type,avatar) {
    // 根据用户信息跳转
    // user.type /boss/genius
    // user.avatar /bossinfo/geniusinfo
    let url = (type === 'boss') ? '/boss': '/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}