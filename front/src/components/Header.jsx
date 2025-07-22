import React from 'react'
import './header.css'

const Header = ({ activeMenu, setActiveMenu }) => {

    return (
        <>
            <div className='header'>
                <div className='title'>
                    <span>PlaceMemo !</span>
                </div>
                <div className='menu'>
                    <div className={activeMenu === 'login' ? 'active' : 'login'}
                        onClick={() => setActiveMenu('login')}>
                        <span>Login</span>
                    </div>
                    <div className={activeMenu === 'signUp' ? 'active' : 'signUp'}
                        onClick={() => setActiveMenu('signUp')}>
                        <span>Sign-up</span>
                    </div>
                    <div className={activeMenu === 'search' ? 'active' : 'search'}
                        onClick={() => setActiveMenu('search')}>
                        <span>Search</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header