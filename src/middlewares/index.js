import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mainSaga from './sagas';

// 中间件
const sagaMiddleware = createSagaMiddleware();

// 增强
let composeEnhancers = compose;
let composeWithDevToolsExtension;
if (__DEV__) {
    composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof composeWithDevToolsExtension === 'function') {
        composeEnhancers = composeWithDevToolsExtension;
    }
}

export const enhancer = composeWithDevToolsExtension ? 
    compose(applyMiddleware(sagaMiddleware), composeWithDevToolsExtension ? composeWithDevToolsExtension() : null)
    : applyMiddleware(sagaMiddleware);

export function runSaga() {
  sagaMiddleware.run(mainSaga);
}