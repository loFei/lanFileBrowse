import { UPDATE_PAGE_INFO, UPDATE_LOAD_STATE } from '../constants/actionTypes';
import { LoadState } from '../constants/states';

const defaultState = {
	loadState: LoadState.DEFAULT,
	pageInfo: null
}

// TODO: 将store拆分, 用generator函数分发,仿照saga
// 只有需要更改store的action才会进入,其他action在saga中分发
export default (state = defaultState, {type, value}) => {
	let newState = JSON.parse(JSON.stringify(state));
	switch(type) {
		case UPDATE_PAGE_INFO:
			newState.pageInfo = value;
			break;
		case UPDATE_LOAD_STATE:
			newState.loadState = value;
			break;
	}
	return newState;
}