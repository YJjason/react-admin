import React, {Component} from 'react';
import {Input, Button, Form, Icon, Checkbox, Tooltip, Select, Row, Col} from "antd";
import './../style/login.css'

const FormItem = Form.Item;
const {Option} = Select;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(121, values)
                this.props.history.push('/login')
            }
        })
    };
    handleConfirmBlur = (e) => {
        const {value} = e.target;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        })
    };
    /*验证输入密码*/
    validatorToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true})
        }
        callback();
    };
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致，请重新输入')
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18}
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 18,
                    offset: 6
                }
            }
        };
        /*手机区号*/
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+86</Option>
            </Select>
        )

        return (
            <div className="login-container">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className='login-register'>
                    <FormItem label="邮箱:">
                        {
                            getFieldDecorator('邮箱', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'this input is not valid email'
                                    },
                                    {
                                        required: true,
                                        message: '请输入邮箱'
                                    }
                                ]
                            })(
                                <Input placeholder='请输入您的邮箱'/>
                            )
                        }
                    </FormItem>
                    <FormItem label='密码'>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.validatorToNextPassword
                                    }

                                ]
                            })(
                                <Input placeholder='请输入您的密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem label='确认密码'>
                        {
                            getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!'
                                    },
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(
                                <Input.Password placeholder='请再次输入您的密码'
                                                onBlur={this.handleConfirmBlur}/>
                            )
                        }
                    </FormItem>
                    <FormItem label={
                        <span>
                            昵称&nbsp;
                            <Tooltip title='What do you want others to call you?'>
                                <Icon type='question-circle-o'></Icon>
                            </Tooltip>
                        </span>
                    }>
                        {
                            getFieldDecorator('nikename', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your nikename!'
                                    }
                                ]
                            })(
                                <Input placeholder='请再次输入您的密码'/>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号">
                        {
                            getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your phone!'
                                    }
                                ]
                            })(
                                <Input addonBefore={prefixSelector} style={{width: '100%'}}
                                       placeholder='请再次输入您的手机号'/>
                            )
                        }
                    </FormItem>
                    <FormItem label="验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                {
                                    getFieldDecorator('captcha', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入验证码'
                                            }
                                        ]
                                    })(
                                        <Input/>
                                    )
                                }
                            </Col>
                            <Col span={12}>
                                <Button>获取验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem  {...tailFormItemLayout}>
                        {
                            getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )
                        }
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type='primary' htmlType='submit'>注册</Button>
                    </FormItem>

                </Form>

            </div>
        );
    }
}

export default Form.create({})(Register);