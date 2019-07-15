
export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	let url = (type==='genius')?'/genius': '/boss'
	if (!avatar) {
		url += 'info'
	}
	return url
}
