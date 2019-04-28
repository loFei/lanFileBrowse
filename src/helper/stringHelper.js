/** 省略多余字符 */
export const omitString = function (str, offset) {
  offset = offset ? offset : 4;
  if (str && str.length < offset) {
    return str;
  }
  return `${str.substr(0, offset)}...`;
}

const EscChar = {
  quot: '&quot;',
  amp: '&amp;',
  lt: '&lt;',
  gt: '&gt;',
  nbsp: '&nbsp;',
  emsp:'&emsp'
};
/** 转换html字符为普通字符 */
export const transHtmlEscChar = (str) => {
  let tmp = str;
  Object.keys(EscChar).forEach((key) => {
    const reg = new RegExp(EscChar[key], 'g');
    let toChar;
    switch(EscChar[key]) {
      case EscChar.amp:
        toChar = '&';
        break;
      case EscChar.quot:
        toChar = '\"';
        break;
      case EscChar.emsp:
        toChar = '\t';
        break;
      case EscChar.lt:
        toChar = '\<';
        break;
      case EscChar.gt:
        toChar = '\>';
        break;
      case EscChar.nbsp:
        toChar = '\ ';
        break;
    }
    
    if (toChar) {
      tmp = tmp.replace(reg, toChar);
    }
  });
  return tmp;
}