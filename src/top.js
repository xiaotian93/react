import React, { Component } from 'react';
import './top.css';
import logo from './logo.png';

class Top extends Component {

    render() {
        return (
            <div className="top">
                <div className="logo_name"><img src={logo} alt=""/><span>数据后台</span></div>
            </div>
        );
    }
}

export default Top;
