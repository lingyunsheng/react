import React, { Component } from 'react';
import { connect } from "react-redux";
import Album from '../components/album/Album';
import { changeSong } from '../redux/action' 
/**
 * container component 处理redux
 *   pure component  与redux无关
 */

// 方法处理放到conponents里
// const mapStateToProps = (state) => {}
const mapDispatchToProps = (dispatch) => {
    return {
        // action返回一个对象
        changeCurrentSong: (song) => {
            dispatch(changeSong(song))
        }
    }
}
// 从redux读数据
export default connect(null, mapDispatchToProps)(Album);
// export default Album