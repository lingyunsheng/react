import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import './navLinkBar.styl';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(
	state=>state
)
class NavLinkBar extends React.Component {
    // 类型校验
    static propTypes = {
        // 数组
        data:PropTypes.array.isRequired
    }
    render() {
        // 定义整体的导航栏
    //    生成
    const navList = this.props.data.filter(v=>!v.hide)
    const pathname = this.props.location
    console.log(navList)
        return (
            <div>
               <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`../../../navimg/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`../../../navimg/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        >
                        </TabBar.Item>
                    ))}
               </TabBar>
            </div>
        )
    }
}
export default NavLinkBar;