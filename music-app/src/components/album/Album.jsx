// pure component.  comtainer里面才与redux有关  与redux无关，数据直接从。。
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './album.styl';
import Scroll from '../../common/scroll/Scroll';
import { getAlbuminfo } from '../../api/recommend';
import * as AlbumModel from '../../model/album';
import * as SongModel from '../../model/song';
import Header from '../../common/header/Header';
class Album extends Component {
    state = {
        show: false,
        songs: [],
        album: {},
        loading: true
    }
    componentDidMount() {
        // id传到路由上去了
        const id = this.props.match.params.id;
        getAlbuminfo(id).then(res => {
            console.log('getAlbumInfo', res);
            let album = AlbumModel.createAlbumBydetail(res.data);
            album.desc = res.data.desc;
            let songList = res.data.list;
            let songs = [];
            songList.forEach(item => {
                let song = SongModel.createSong(item);
                songs.push(song);
            })
            this.setState({
                loading: false,
                album: album,
                songs
            })
        })
        this.setState({
            show: true
        })
    }
    selectSong = (song) => {
        return () => {
            this.props.changeCurrentSong(song);
        }
    }
    render () {
        const { album } = this.state;
        const songsNode = this.state.songs.map((song) => {
            return (
                <div className="song" key={song.id} onClick={this.selectSong(song)}>
                    <div className="song-name">
                        { song.name }
                    </div>
                    <div className="song-singer">
                        { song.singer }
                    </div>
                </div>
            )
        })
        return (
            // in值发生变化， css变化 classNames是多个类名，translate只是前缀
            <CSSTransition in={this.state.show} timeout={300} classNames="Translate">
            <div className="music-album">
                <Header title={album.name} ref="header" />
                <div style={{position: 'relative'}}>
                    <div ref="albumBg" className="album-img" style={{ backgroundImage: `url(${album.img})`}}>
                        <div className="filter"></div>
                        {/* <span>播放</span> */}
                    </div>
                    <div className="albumFixedBg" className="album-img fixed">
                        <div className="filter"></div>
                    </div>
                    <div className="play-wrapper" ref="playButtonWrapper">
                        <div className="play-button">
                            <i className="icon-play"></i>
                            <span>播放全部</span>
                        </div>
                    </div>
                </div>
                <div className="album-container">
                    <div className="album-scroll">
                        {/* 从qq音乐api获取歌单 */}
                        <Scroll onScroll={() => {}}>
                            <div className="album-wrapper">
                                <div className="song-count">
                                    专辑 共{ songsNode.length }首
                                </div>
                                <div className="song-list">
                                    { songsNode }
                                </div>
                                <div className="album-info" style={album.desc ? {} : { display: "none" }}>
                                    <h1 className="album-title">专辑简介</h1>
                                    <div className="album-desc">
                                        {album.desc}
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                </div>
            </div>
            </CSSTransition>
        );
    }
}

export default Album