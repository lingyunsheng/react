import React, { Component } from 'react';
class Header extends Component {
    state = { }
    handleback = () => {
        // if (this.props.history) {
        //     this.props.history.pop();
        // }
        // <ROuter path="." componene=..> 只有这样的组件才有history，pop。

        window.history.back();
    }
    render() {
        return (
            <div className="music-header">
                <span className="header-back" onClick={this.handleback}>
                    <i className="icon-back"></i>
                </span>
                <div className="header-title">
                    {this.props.title}
                </div>
            </div>
        )
    }
}
export default Header