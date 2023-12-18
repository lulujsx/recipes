import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import './index.css'

import App from './App'
import { createTheme, ThemeProvider } from '@material-ui/core'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const theme = createTheme()

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    
    document.getElementById('root')
)