import React, { Component } from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton, PlayToggle, VolumeMenuButton, PlayProgressBar, TimeDivider, CurrentTimeDisplay, ProgressControl, DurationDisplay, FullscreenToggle } from 'video-react';
import styles from './VideoPlayer.scss';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.config = {
      backSecond: 5,
      nextSecond: 5,
      playRate: [2, 1.5, 1, 0.75, 0.5]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.videoUrl !== this.props.videoUrl) {
      console.log(this.refs)
      this.refs.player.load();
      return true;
    }
  }

  render() {
    const {videoUrl, closePlayer} = this.props;
    console.log(`isPC: ${window.isPc}`)
    console.log(`播放视频: ${videoUrl}`)
    return (
      <div className={styles.mask}>
        <div>
          <button className={styles.closeBtn} onClick={closePlayer}>关闭</button>
        </div>
        <div className={styles.playerWrap}>
          <Player
            ref="player"
            src={videoUrl}
            fluid={false}
            width={window.isPc ? window.screen.width / 2 : window.screen.width}
            // height={window.screen.height / 2}
            poster={videoUrl}
          >
            <BigPlayButton position="center"/>
            <ControlBar disableDefaultControls>
              <PlayToggle/>
              <VolumeMenuButton vertical/>
              <ReplayControl seconds={this.config.backSecond}/>
              <ForwardControl seconds={this.config.nextSecond}/>
              <CurrentTimeDisplay/>
              <TimeDivider/>
              <DurationDisplay/>
              <ProgressControl/>
              <PlaybackRateMenuButton rates={this.config.playRate}/>
              <FullscreenToggle/>
            </ControlBar>
          </Player>
        </div>
      </div>
    );
  }
};

export default VideoPlayer;