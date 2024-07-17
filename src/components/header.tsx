// src/components/Header.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import logo from '../logo.png';
import { DownOutlined, HeartOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import user from '../stores/UserStore'
import { storageService } from '../services/storangeService';

interface MenuItem {
    label: ReactNode
    key: string
    icon: ReactNode
    users: string[]
}

const Header: React.FC = observer(() => {
    const navigate = useNavigate();
    const imageFolder:string = (process.env.REACT_APP_SERVER_HOST || '')  + process.env.REACT_APP_IMAGES_FOLDER;
    useEffect(() => {
        if (user.isAuthorized) {
            if (user?.isAdmin)
                setUserMenuItems(items.filter(x => x.users.includes('Admin')))
            else
                setUserMenuItems(items.filter(x => x.users.includes('User')))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.name])
    
    const logout = async () => {

        storageService.removeTokens();
        user.clearUserData();
        navigate('/')
    }


    const onFavoriteButtonClick = () => {

    }

    const onUserButtonClick = () => {
        if (!user.isAuthorized) {
            navigate('/login');
        }
    }

    const onAddAdvertButtonClick = () => {

    }

    const items: MenuItem[] = [
        {
            label:<Link to="account">
                <Button type="link">{user.name} {user.surname}</Button></Link>,
            key: '0',
            icon: <Avatar src={imageFolder +'/800_'+ user.avatar} />,
            users: ['User', 'Admin']
        },
        
        {
            label: <Link to="registration">
                <Button type="link">Hовий адмін</Button>
            </Link>,
            key: '2',
            icon: <UserAddOutlined className='fs-6' />,
            users: ['Admin']
        },
        {
            label: <Button onClick={logout} type="link">Вийти</Button>,
            key: '3',
            icon: <LogoutOutlined className='fs-6' />,
            users: ['User', 'Admin']
        }
    ]
    const [userMenuItems, setUserMenuItems] = useState<MenuItem[]>(items);

    return (
        <header>
            <div className='w-75 mx-auto d-flex  justify-content-between align-items-center'>
                <img style={{ height: 40, width: 70 }} src={logo} alt='logo' />
                <div className=' d-flex gap-lg-5'>
                    <HeartOutlined className='favourite-button' onClick={onFavoriteButtonClick} />
                    {(user.isAuthorized &&
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            trigger={['click']}
                        >
                            <div className='user-profile-button d-flex gap-2 align-items-center' onClick={onUserButtonClick}>
                                <UserOutlined />
                                <span>Ваш профіль</span>
                                <DownOutlined />
                            </div>
                        </Dropdown>) ||
                        <div className='user-profile-button d-flex gap-2 align-items-center' onClick={onUserButtonClick}>
                            <UserOutlined />
                            <span>Ваш профіль</span>
                        </div>}
                    <Button onClick={onAddAdvertButtonClick} size='large'>Додати оголошення</Button>
                </div>
            </div>
        </header>
    );
});

export default Header;
