import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTION_GET_PAGE_WITH_URL } from '../../constants/actionTypes';
import styles from './Home.scss';
import { LoadState } from '../../constants/states';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import {ItemType} from '../../constants/itemTypes';
import FileInfo from '../fileInfo/FileInfo';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playVideoSrc: null,
    };
    this.videoList = [];
  }

  closePlayer() {
    this.setState({
      playVideoSrc: ''
    });
  }

  createClickFunc(item) {
    let func;
    switch (item.type) {
      case ItemType.UNKNOW:
        break;
      case ItemType.PARENTDIR:
      case ItemType.DIR:
        func = this.props.intoPage.bind(this, item.link);
        break;
      case ItemType.VID:
        func = () => {this.setState({playVideoSrc: item.link})};
        break;
      case ItemType.IMG:
        break;
      case ItemType.TXT:
        break;
      case ItemType.SND:
        break;
    }

    return func;
  }

  renderVidePlayer() {
    if (this.state.playVideoSrc) {
      return <VideoPlayer videoUrl={this.state.playVideoSrc} playList={this.videoList} closePlayer={this.closePlayer.bind(this)}/>;
    }
  }

  renderItems() {
    const {pageInfo} = this.props;
    if (!pageInfo) return null;

    let items = [];
    this.videoList = [];
    for (let item of pageInfo.items) {
      const clickFunc = this.createClickFunc(item);
      if (item.type === ItemType.VID) {
        this.videoList.push(item.link);
      }
      items.push(
        <li className={styles.items} key={item.link}>
          <FileInfo item={item} clickFunc={clickFunc}/>
        </li>
      );
    }

    return <ul className={styles.itemList}>{items}</ul>;
  }

  render() {
    const {pageInfo, loadState} = this.props
    return (
      <div className={styles.bgWrap}>
        <div className={styles.titleWrap}>
          <span className={styles.title}>当前目录: {loadState === LoadState.LOAD_COMPLETE ? pageInfo.pagePath : ''}</span>
        </div>
        <div className={styles.content}>
          {this.renderItems()}
        </div>
        {this.renderVidePlayer()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    pageInfo: state.pageInfo,
    loadState: state.loadState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    intoPage: (url) => {
      console.log(`click ${url}`)
      dispatch({
        type: ACTION_GET_PAGE_WITH_URL,
        value: url
      })
    },
    playVideo: (url) => {
      console.log(`播放视频: ${url}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);