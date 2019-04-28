import React, { Component } from 'react';
import styles from './FileInfo.scss';
import { omitString } from '../../helper/stringHelper';
import { ItemType } from '../../constants/itemTypes';

class FileInfo extends Component {

  getIconClassName(type) {
    switch (type) {
      case ItemType.DIR:
        return styles.iconDir;
      case ItemType.PARENTDIR:
        return styles.iconParentDir;
      case ItemType.UNKNOW:
        return styles.iconUnknow;
      case ItemType.VID:
        return styles.iconVid;
      case ItemType.IMG:
        return styles.iconImg;
      case ItemType.TXT:
        return styles.iconTxt;
      case ItemType.SND:
        return styles.iconSnd;
    }
  }

  getItemType(type) {
    switch (type) {
      case ItemType.DIR:
        return '文件夹';
      case ItemType.PARENTDIR:
        return '返回';
      case ItemType.UNKNOW:
        return '未知文件';
      case ItemType.VID:
        return '视频';
      case ItemType.IMG:
        return '图片';
      case ItemType.TXT:
        return '文本';
      case ItemType.SND:
        return '音乐';
    }
  }

  renderInfoText(item) {
    const originText = item.href.substring(0, item.href.length - 1);
    const text = omitString(originText, 15);
    return <div className={styles.linkDiv}>
      <span className={styles.links} >{item.isBack ? '返回上一页' : text}</span>
    </div>;
  }

  render() {
    const {item, clickFunc}  = this.props;
    const iconClass = this.getIconClassName(item.type);
    return (
      <div className={styles.wrap} onClick={clickFunc}>
        <div className={`${styles.imgDiv} ${iconClass}`}>
          <div className={styles.itemType}>
            {this.getItemType(item.type)}
          </div>
          {/* <img className={styles.icons} src={item.imgSrc}/> */}
        </div>
        {this.renderInfoText(item)}
        <div className={styles.mask}></div>
      </div>
    );
  }
};

export default FileInfo;