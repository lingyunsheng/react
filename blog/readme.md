### 博客
技术栈 reactHook + next.js 服务端渲染框架
npm install -g create-next-app
# 构建项目
- npx create-next-app blog
- cd blog
- yarn dev
# next.config.js 配置文件
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
# .babelrc 
{
    "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
    "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
        [
            "import",
            {
                "libraryName":"antd"
            }
        ]
    ]
}
- yarn add @zeit/next-css  next时 style in jsx 
- yarn add antd  安装antd ui
- yarn add babel-plugin-import  按需引入


- pages/_app.js  全局样式

import App from 'next/app'
import 'antd/dist/antd.css'

export default App


Ant Design的24格栅格化系统
接下来就可以编写公用的头部了，遇到的第一个问题是如何让界面适配各种屏幕。如果自己编写还是挺麻烦的，幸运的是可以直接使用Ant Design的轮子来制作。

Ant Design做好了栅格化系统，可以适配多种屏幕，简单理解成把页面的分成均等的24列，然后进行布局。

需要对适配几个属性熟悉一下：

xs: <576px响应式栅格。
sm：≥576px响应式栅格.
md: ≥768px响应式栅格.
lg: ≥992px响应式栅格.
xl: ≥1200px响应式栅格.
xxl: ≥1600px响应式栅格.



.header{
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
    /* height: 2.8rem; */
    border-bottom:1px solid #ccc;
}
.header-logo{
    color:#1e90ff;
    font-size: 28px;
    text-align: left;

}
.header-title {
    font-size: 14px;
    color: #999;
    display: inline-block;
    padding-left: 5px;
}
.ant-menu{
    line-height: 60px !important;

}
.ant-menu-item{
    font-size:14px !important;
}


yarn add react-markdown
markdown-navbar


markdown-navbar的基本属性：

className： 可以为导航定义一个class名称，从而进行style样式的定义。
source：要解析的内容，也就是你的Markdown内容。
headingTopOffset:描点距离页面顶部的位置，默认值是0.
ordered: 显示数字编码，默认是显示的，也就是true，设置为false就不显示了。


固钉效果  Affix  吸顶

rem  https://blog.csdn.net/dengefu4541/article/details/101452103


https://github.com/eggjs/egg
官方文档  https://eggjs.org/en/intro/quickstart.html

Koa



