// src/components/Header.tsx
import React from 'react';
import logo from '../logo.png';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import user from '../stores/UserStore'


const Header: React.FC = observer(() => {
    const navigate = useNavigate();
    const onFavoriteButtonClick = () => {

    }

    const onUserButtonClick = () => {
        if (!user.isAuthorized) {
            navigate('/login');
        }
    }

    const onAddAdvertButtonClick = () => {

    }
    return (
        <header>
            <div className='w-75 mx-auto d-flex  justify-content-between align-items-center'>
                <img style={{ height: 40, width: 70 }} src={logo} alt='logo' />
                <div className=' d-flex gap-lg-5'>
                    <HeartOutlined className='favourite-button' onClick={onFavoriteButtonClick} />
                    <div className='user-profile-button d-flex gap-2 align-items-center' onClick={onUserButtonClick}>
                        <UserOutlined />
                        <span>Ваш профіль</span>
                    </div>
                    <Button onClick={onAddAdvertButtonClick} size='large'>Додати оголошення</Button>
                </div>
            </div>
        </header>
    );
});

export default Header;
