import {sendGetPageRequest} from '../api/request';
import HtmlParser from '../helper/htmlParser';
import { HOST, PUBLIC_PATH } from '../config/config';
import { transHtmlEscChar } from '../helper/stringHelper';

function createItem(img, a, isRoot, isBack, pagePath) {
  const imgSrc = `${HOST}${HtmlParser.getAttributeByKey(img, 'src')}`;
  const type = HtmlParser.getAttributeByKey(img, 'alt')
  let href = HtmlParser.getAttributeByKey(a, 'href');
  let info = HtmlParser.getText(a);

  href = decodeURI(href);
  href = transHtmlEscChar(href);
  // 首次进入时不显示返回
  if (href === '/') {
    return null;
  }
  let host = `${HOST}${pagePath}/`;
  if (isRoot) {
    host = PUBLIC_PATH;
  } else if (isBack) {
    host = HOST;
  }
  const link = `${host}${href}`;
  return {
    imgSrc,
    href,
    link,
    info,
    isBack,
    type
  };
}

function getPagePath(title) {
  let titleText = HtmlParser.getText(title);
  return titleText.replace(/Index of /, '');
}

export async function getPageByURL(url) {
  const result = await sendGetPageRequest(url);
  console.log(result)
  if (result.data) {
    const html = HtmlParser.parseHtml(result.data);
    console.log(html)

    const body = HtmlParser.getChildByName(html, 'body');
    const title = HtmlParser.getChildByName(body, 'h1');
    const pre = HtmlParser.getChildByName(body, 'pre');
    const imgs = HtmlParser.getAllChildByName(pre, 'img');
    const links = HtmlParser.getAllChildByName(pre, 'a');
    
    let pageInfo = {};
    if (!imgs || !links) return null;
    imgs.shift();
    // 排序
    pageInfo.sortType = links.splice(0, 4);
    pageInfo.items = [];
    pageInfo.pagePath = getPagePath(title);

    const isRoot = HtmlParser.getAttributeByKey(links[0], 'href') === '/';
    for (let i = 0; i < imgs.length; ++i) {
      const item = createItem(imgs[i], links[i], isRoot, i === 0, pageInfo.pagePath);
      if (item) {
        pageInfo.items.push(item);
      }
    }

    console.log(pageInfo)
    return pageInfo;
  } else {
    console.log(result);
  }
}