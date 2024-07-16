import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginModel } from '../../models/LoginModel';
import { accountService } from '../../services/accountService';
import BackButton from '../common-components/BackButton';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { storageService } from '../../services/storangeService';

export const Login: React.FC = () => {
    const [remember, setRemember] = useState<boolean>(false);
    const navigate = useNavigate()
    
    const onFinish = async (loginModel: LoginModel) => {
        const responce = await accountService.login(loginModel);
       if (responce.status === 200) {
            if (remember){
                storageService.saveTokens(responce.data.accessToken);
            }
            else{
                storageService.setTemporalyTokens(responce.data.accessToken)
            }
            navigate('/')
        }
    }
    return (
        <>
            <BackButton />
            <div className='w-75 mx-auto'>
                <Divider className='fs-3  mb-5' orientation="left">Логін</Divider>
                <Form
                    layout='vertical'
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    className='mx-auto'
                >
                    <Form.Item
                        label="Електронна пошта"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Будьласка введіть логін!",
                            },
                            {
                                type: 'email',
                                message: "Невірно введена пошта!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Будьласка введіть пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Checkbox onChange={(e:CheckboxChangeEvent)=>setRemember(e.target.checked)}>Запам'ятати мене</Checkbox>
                    </Form.Item>
                    <div className='buttons-block'>
                        <Button type="primary" htmlType="submit">
                            Увійти
                        </Button>
                        <Link to="/registration">
                            <Button >Реєстрація</Button>
                        </Link>
                        <Link to='/fogotpassword'>Забули раполь?</Link>
                    </div>
                </Form>
            </div>

        </>


    )
}
