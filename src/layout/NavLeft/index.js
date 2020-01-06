import React, {Component} from 'react';
import logo from './../../assets/logo-ant.svg'
import {Menu} from "antd";
import {NavLink} from "react-router-dom";

import menuList from "../../config/menuConfig";

import './index.css'

const SubMenu = Menu.SubMenu

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let menuTrees = this.renderMenu(menuList)
        this.setState({
            menuTrees
        })

    }

    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>
                    {item.title}
                </NavLink>
            </Menu.Item>
        })

    }

    render() {
        return (
            <div>
                <div className='logo'>
                    <img src={logo} alt=""/>
                    <h1>React</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTrees}
                </Menu>
            </div>
        );
    }
}

export default Index;