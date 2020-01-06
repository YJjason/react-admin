import React, {Component} from 'react';
import {BrowserRouter , Route, Switch, } from "react-router-dom";

import App from './App'
import Admin from './Admin'
import Home from './page/index'


import Login from './page/login'
import Register from "./page/register";
import ForgetPwd from "./page/forgetPwd";


import Charts from './page/echarts/base/index'

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/register' exact component={Register}></Route>
                        <Route path='/forgetpwd' component={ForgetPwd}></Route>

                        <Route path='/' render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home}></Route>
                                    <Route path='/charts' component={Charts}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                    </Switch>

                </App>
            </BrowserRouter>
        );
    }
}

export default Router;