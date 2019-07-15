import React from 'react';
import { NavBar, InputItem, Radio ,List,TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    onChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect!==path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">填写基本信息</NavBar>
                {/* 选择头像 */}
                <AvatarSelector selectAvatar={(imgname)=> {
                    this.setState({
                        avatar:imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>招聘职位</InputItem>
                <InputItem onChange={(v)=>{this.onChange('company',v)}}>公司名称</InputItem>
                <InputItem onChange={(v)=>{this.onChange('money',v)}}>职位薪资</InputItem>
                {/* <InputItem onChange={(v)=>{this.onChange('desc',v)}}>职位简介</InputItem> */}
                {/* 多行 */}
                <TextareaItem onChange={(v)=>{this.onChange('desc',v)}}
                 row={3} autoHeight title='职位要求'>
                </TextareaItem>
                <WhiteSpace></WhiteSpace>
                {/* 保存redux */}
                <Button onClick={()=>this.props.update(this.state)} type='primary'>保存</Button>
            </div>
        )
    }
}
export default BossInfo;