import {Parser} from 'htmlparser2';

/** html */
const HtmlParser = {
  /** 解析html */
  parseHtml: (html) => {
    let rootNode;
    let node;
    let stack = [];
    const parser = new Parser({
      onopentag: (name, attrs) => {
        // console.log('open tag: ' + name)
        node = {};
        node.name = name;
        node.attributes = attrs;
        stack.push(node);
      },
      ontext: (data) => {
        if (data !== null && data.trim() !== '') {
          node.value = data.trim();
        }
      },
      onclosetag: () => {
        let pNode = stack.pop();
        // console.log(pNode.value)
        // console.log('close tag: ' + pNode.name)
        if (stack.length === 0) {
          rootNode = pNode;
        } else {
          let parentNode = stack[stack.length - 1];
          if (!parentNode.children) parentNode.children = [];
          parentNode.children.push(pNode);
        }
      }
    }, {
      // xmlMode: true,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false
    });

    parser.write(html);
    parser.end();
    return rootNode;
  },

  /** 查找子节点 */
  getChildByName: (html, name) => {
    if (!html) return;
    let child;
    for (let node of html.children) {
      if (node.name === name ) {
        child = node;
        break;
      }
    }
    return child;
  },

  // 查找所有子节点
  getAllChildByName: (html, name) => {
    if (!html) return;
    let childs = [];
    for (let node of html.children) {
      if (node.name === name ) {
        childs.push(node);
      }
    }
    return childs;
  },

  /** 获得子节点文本 */
  getChildTextByName: (html, name) => {
    const child = HtmlParser.getChildByName(html, name);
    if (child) {
      return HtmlParser.getText(child);
    }
  },

  /** 获得节点属性 */
  getAttributeByKey: (html, key) => {
    if (!html) return;
    return html.attributes[key];   
  },

  /** 获得节点文本 */
  getText: (html) => {
    if (!html) return;
    return html.value;
  },
}
export default HtmlParser;