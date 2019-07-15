import React from 'react';
import { NavBar, InputItem, Radio ,List,TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';
import {connect} from 'react-redux';
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: 'boy',
            title:'',
            desc:'',
            money:''
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
        const RadioItem = Radio.RadioItem
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                 {redirect && redirect!==path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">填写基本信息</NavBar>
                <h2>向Boss介绍以下自己吧</h2>
                <AvatarSelector selectAvatar={(imgname)=> {
                    this.setState({
                        avatar:imgname
                    })
                }}></AvatarSelector>
                <List>
      
                    <RadioItem checked={this.state.type === 'boy'}
                        onChange={() => this.handleChange('sex', 'boy')}>
                        男
                </RadioItem>
                    <RadioItem checked={this.state.sex === 'girl'}
                        onChange={() => this.handleChange('sex', 'girl')}>
                        女
                </RadioItem>
                </List>
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>求职岗位</InputItem>
                {/* <InputItem onChange={(v)=>{this.onChange('desc',v)}}>职位简介</InputItem> */}
                {/* 多行 */}
                <TextareaItem onChange={(v)=>{this.onChange('desc',v)}}
                 row={3} autoHeight title='职位要求' money='薪资要求'>
                </TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button onClick={()=>this.props.update(this.state)} type='primary'>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;