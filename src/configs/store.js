import { createStore, applyMiddleware } from "redux";
import createSagaMidldeware from 'redux-saga';
import reducers from "../reducers";
import rootSaga from "../sagas";

const sagasMiddleware = createSagaMidldeware();
const middleware = applyMiddleware(sagasMiddleware);

const store = createStore(reducers, middleware);

sagasMiddleware.run(rootSaga);

export default store;
