import * as React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router' // react-router v4
import {ConnectedRouter} from 'connected-react-router'
import {configureFontendStore, nav} from './store'
import {createBrowserHistory} from 'history'
import 'antd/dist/antd.css'
import {StoreProvider} from './fp/reduxHook/index'
import {Layout} from 'antd'
import components from './components'

const history = createBrowserHistory()
const store = configureFontendStore(history)

const {Menu, Classrooms, Persons, Schools} = components(history)

const routes = {
    index: {
        nav: nav.index,
        Component: () => <div>Выберите школу</div>
    },
    school : {
        nav: nav.school,
        Component: Classrooms,
    },
    classroom: {
        nav: nav.classroom,
        Component: Persons,
    },
}

const reactRoutes = Object
    .values(routes)
    .map(({Component, nav}) =>
        <Route
            exact
            key={nav.pattern}
            path={nav.pattern}
            render={props =>
                // @ts-ignore
                <Component {...props.match.params as any} />
            }
        />,
    )

const {
    Header, Footer, Sider, Content,
} = Layout;
/**
 * Legacy provider used for connected-react-router
 * @constructor
 */
const App = () =>
    <StoreProvider value={store}>
        <Provider store={store}>
            <Layout style={{ padding: '0 50px', minHeight: '100vh' }}>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Menu />
                </Header>
                <Layout>
                    <Sider style={{ background: '#fff', padding: 0 }}>
                        <Schools/>
                    </Sider>
                    <Content>
                        <ConnectedRouter history={history}>
                            <Switch>
                                {
                                    reactRoutes
                                }
                            </Switch>
                        </ConnectedRouter>
                    </Content>
                </Layout>
            </Layout>
        </Provider>
    </StoreProvider>

export default App
