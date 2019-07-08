import React, { Component } from 'react';
//<scroll>
// 1
//</scroll>
import Lazyload from 'react-lazyload';
import BScroll from 'better-scroll';
import './Scroll.styl';
class Scroll extends Component {
    state = { }
    componentDidUpdate() {
        if(this.bscrol && this.props.refresh) {
            this.bscrol.refresh();
        }
    }
    componentDidMount() {
        // 监听到滚动方法
        if (!this.bscrol) {
 
            this.bscrol = new BScroll(this.refs.scrollView, {
                probeType: 3,
                click: () => {}
            })
            this.bscrol.on('scroll', (e) => {
                this.props.onScroll(e);
            })
        }
    }
    componentWillUnmount() {
        // 清理
        this.bscrol = null;
    }
    render() {
        return (
            <div className="scroll-view" ref="scrollView">
                { this.props.children }
            </div>
        )
    }
}

export default Scroll