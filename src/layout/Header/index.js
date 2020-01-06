import React, {Component} from 'react';
import {Row, Col} from "antd";

import axios from './../../axios'
import utils from './../../utils'
import {ASSESKEY} from './../../config/config'

import './index.css'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city_info: {},
            sys_time: '',
            user_name: 'admin',
            timer: null
        }
    }

    componentDidMount() {
        let default_info = {
            point: {
                lng: 116.404,
                lat: 39.915
            },
            city: '北京'
        }
        this.setState({
            city_info: utils.getLocation() || default_info
        })
        setTimeout(() => {
            this.getLocationWeather()
        }, 1000)

        /*同步系统时间*/
        this.timer = setInterval(() => {
            let sys_time = utils.formatTime(new Date().getTime());
            this.setState({sys_time})
            this.dayAndNight()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /*判断白天还是晚上*/
    dayAndNight() {
        let now = new Date().getHours()
        if (now > 18 || now <= 6) {
            this.setState({
                day: false
            })
        } else if (now > 7 || now <= 18) {
            this.setState({
                day: true
            })
        }

    }

    getLocationWeather() {
        let url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(this.state.city_info.city) + '&output=json&ak=' + ASSESKEY
        axios.jsonp({
            url: url,
        }).then(res => {
            let data = res.results[0].weather_data[0]
            this.setState({
                dayPicture: data.dayPictureUrl,
                nightPicture: data.nightPictureUrl,
                weatherName: data.weather
            })
        })
    }


    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{this.state.user_name}</span>
                        <a href="">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sys_time}</span>
                        <span className='weather-img'>
                            {
                                this.state.day ? <img src={this.state.dayPicture} alt=""/> :
                                    <img src={this.state.nightPicture} alt=""/>
                            }
                        </span>
                        <span className='weather-detail'>
                            {this.state.weatherName}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Index;
