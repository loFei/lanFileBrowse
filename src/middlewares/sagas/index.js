import { fork, takeLatest, call, put } from 'redux-saga/effects';
import { ACTION_GET_PAGE_WITH_URL, UPDATE_PAGE_INFO, UPDATE_LOAD_STATE } from '../../constants/actionTypes';
import {getPageByURL} from '../../services/getPage';
import { LoadState } from '../../constants/states';

function* getPage({value}) {
  yield put({
    type: UPDATE_PAGE_INFO,
    value: null
  });
  yield put({
    type: UPDATE_LOAD_STATE,
    value: LoadState.DEFAULT
  });
  const pageInfo = yield call(getPageByURL, value);
  yield put({
    type: UPDATE_PAGE_INFO,
    value: pageInfo
  });
  yield put({
    type: UPDATE_LOAD_STATE,
    value: LoadState.LOAD_COMPLETE
  });
}

export default function* mainSaga() {
  // yield fork(searchSaga);
  yield takeLatest(ACTION_GET_PAGE_WITH_URL, getPage);
};