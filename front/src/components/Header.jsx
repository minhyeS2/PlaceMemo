import './header.css';
import { parseJwt } from '../utils/parseJwt.js';

import React, { useEffect } from 'react';


const Header = ({ activeMenu, setActiveMenu, isLoggedIn, setIsLoggedIn, nickname, setNickname }) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = parseJwt(token);
            if (payload?.nickname) {
                setNickname(payload.nickname);
                setIsLoggedIn(true); // ✅ 프롭스로 받은 setter
            }
        }
    }, []);

    const onLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setNickname('');
        setActiveMenu('login');
    };

    return (
        <div className='header'>
            <div className='title'>
                <span>PlaceMemo !</span>
            </div>
            <div className='menu'>
                {isLoggedIn ? (
                    <>
                        <div className='welcome'>
                            <span>{nickname} 様、いらっしゃいませ!</span>
                        </div>
                        <div
                            className={activeMenu === 'logout' ? 'active' : 'logout'}
                            onClick={onLogout}>
                            <span>LOGOUT</span>
                        </div>
                        <div
                            className={activeMenu === 'search' ? 'active' : 'search'}
                            onClick={() => setActiveMenu('search')}
                        >
                            <span>SEARCH</span>
                        </div>
                        <div
                            className={activeMenu === 'my-memos' ? 'active' : 'my-memos'}
                            onClick={() => setActiveMenu('my-memos')}>
                            <span>MY MEMOS</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={activeMenu === 'login' ? 'active' : 'login'}
                            onClick={() => setActiveMenu('login')}
                        >
                            <span>LOGIN</span>
                        </div>
                        <div
                            className={activeMenu === 'signUp' ? 'active' : 'signUp'}
                            onClick={() => setActiveMenu('signUp')}
                        >
                            <span>SIGN-UP</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
