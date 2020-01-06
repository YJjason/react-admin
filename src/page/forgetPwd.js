import React, {Component} from 'react';
import {Form, Input, Button, Row, Col} from "antd";

import "./../style/login.css"

const FormItem = Form.Item;

class ForgetPwd extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {


                this.props.history.push('/')
            }
        })

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
        return (
            <div className='login-container'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-register">
                    <FormItem label="邮箱:">
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '不符合要求的邮箱'
                                    },
                                    {
                                        required: true,
                                        message: '请输入邮箱'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入邮箱"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号:">
                        {
                            getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入手机号'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入手机号"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="验证码:">
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
                    <FormItem {...tailFormItemLayout}>
                        {
                            <Button htmlType="submit" type="primary">提交</Button>
                        }
                    </FormItem>
                </Form>

            </div>
        );
    }
}

export default Form.create({})(ForgetPwd);