import  React, {Component} from "react";
import { Popover, NavBar, Icon ,Button} from 'antd-mobile';
import '../../node_modules/antd-mobile/dist/antd-mobile';
class Mine extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            actors:['杨幂','赵丽颖']
        }
        // this.handleChange=this.handleChange.bind(this)
    }
    handleChange=()=> {
        this.setState={
            actors:[...this.state.actors, '肖战']
        }
    }
    render(){
        const name = this.props.name
        return (
            <div>
                <h1>{name}</h1>
                {this.state.actors}
                <NavBar>navbar</NavBar>
                <Button onClick={this.handleChange}>添加</Button>
            </div>
        )
    }
}
export default Mine;