import { createStore } from 'redux';
import reducer from './reducer';
import { enhancer, runSaga } from '../middlewares';

const store = createStore(reducer, enhancer);

runSaga();

export default store;