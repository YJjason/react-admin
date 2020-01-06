import React, {Component} from 'react';
import {Row,Col} from "antd";
import './style/common.css'
import Header from './layout/Header/index'
import NavLeft from './layout/NavLeft/index'


class App extends Component {
    render() {
        return (
            <div>
                <Row className='container'>
                    <Col span={3} className='nav-left'>
                        <NavLeft/>
                    </Col>
                    <Col span={21} className='main'>
                        <Header/>
                        <Row className='content'>
                            {this.props.children}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
