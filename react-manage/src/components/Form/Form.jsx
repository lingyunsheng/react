
import React from 'react';
export default function Form(Comp) {
    return class WrapperComp extends React.Component{
        constructor(props) {
            super(props);
            this.state={}
            this.handleChange=this.handleChange.bind(this)
        }
        handleChange(key, val) {
            console.log(key,val)
            this.setState({
                // 加中括号
                [key]: val
            })
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}