import { request, requestText } from '../services/net/request';

/** 请求 */
export async function sendGetPageRequest(url) {
  return requestText(url, {
    method: 'GET',
    mode: 'cors',
    handleAs: 'text'
  });
}
