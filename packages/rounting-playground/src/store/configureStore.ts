import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {isFrontend} from '@sha/utils'
import createRootReducer from './createRootReducer'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import saga from './walli/saga'
import api from './walli/api'
import {walliDuck} from './walli/walliDuck'

const REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__'

const configureFrontendStore = (
    initialState?: any,
    history: ReturnType<typeof createBrowserHistory> = createBrowserHistory(),
) => {

    const store = createStore(createRootReducer(history), initialState, getFrontEndMiddlewares(history))
    store['runSaga'] = sagaMiddleware.run
    store['runSaga'](saga(api())(walliDuck))

    return store as typeof store & { runSaga: Function, history: any }
}

const sagaMiddleware = createSagaMiddleware()


const getFrontEndMiddlewares = (history: any) =>
    isFrontend() && window[REDUX_DEV_TOOLS]
        ?
        compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleware),
            window[REDUX_DEV_TOOLS](),
        )
        :
        compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleware),
        )

export default configureFrontendStore
