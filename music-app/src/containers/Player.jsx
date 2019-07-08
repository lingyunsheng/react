import { connect } from 'react-redux';
import Player from '../components/player/Player';
// 与redux直接关系
//lingyige无关系
const mapStateToprops = (state) => {
    // 都会到player里，与不和redux有直接关系的连起来
    return {
        showStatus: StaticRange.showStatus,
        currentSong: state.song
    }
}
export default connect(mapStateToprops)(Player)
