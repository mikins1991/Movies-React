import React from 'react';
import './header.css';
import logo from '../../logo.png';
const AppHeader = (props) => {
    return (
        <header className='App-header'>
            <img src={logo} alt='Logo' />
        </header>
    );
};

export default AppHeader;
