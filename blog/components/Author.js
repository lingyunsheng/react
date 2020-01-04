import React from 'react'
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'

const Author = () => {


    return (
        <div className="author-div common-box">
            <div className="author-avatar">
                <Avatar size={100} src="https://mirror-gold-cdn.xitu.io/168e0979d77e9c53e15?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" />
            </div>
            <div className="avatar-introduction">
                个人博客，专注前端，高级前端菜鸡
                <Divider>我的账号</Divider>
                <Avatar size={28} icon="github" className="content" />
                <Avatar size={28} icon="qq" className="content" />
                <Avatar size={28} icon="wechat" className="content" />
            </div>
        </div>
    )
}

export default Author