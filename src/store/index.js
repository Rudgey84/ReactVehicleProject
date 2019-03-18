import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/index';
import createHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../api/index';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routeMiddleware];

export default function configureStore(initialState) {

    const store = createStore(reducers, initialState,

        composeWithDevTools(applyMiddleware(...middlewares)));

    sagaMiddleware.run(rootSaga);

    if (module.hot) {

        module.hot.accept('../reducers/index', () => {

            const nextRootReducer = require('../reducers/index');

            store.replaceReducer(nextRootReducer);

        });

    }

    return store;

}

export { history };