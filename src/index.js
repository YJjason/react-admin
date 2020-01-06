import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Router from './router'
import {Provider} from 'react-redux'
import store from './store'

// ReactDOM.render(<Router/>,document.getElementById('root'))

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('root')
)
