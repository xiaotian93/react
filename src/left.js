import React, { Component } from 'react';
import { Icon } from 'antd';
import {NavLink} from 'react-router-dom';
import './top.css';
//import Tabs from './tab.js';
var data={id:3};
var path={
    pathname:"/test/new",
    aa:data
}
class Left extends Component{
    constructor(props){
        super(props);
        this.state={
            type:"news"
        }
    };
    changeType(){
        this.props.type(this.props.type)
    }
    render() {
        return (
                <div className="left">
                    <NavLink to='/loan_data/' activeClassName="active" exact>产品数据统计</NavLink>
                    <div>甲方数据统计 <Icon type="up"/></div>
                    <NavLink to="/loan_data/news/new" activeClassName="active" exact>新上贷款</NavLink>
                    <NavLink to='/loan_data/banner/banner' activeClassName="active" exact>banner图贷款</NavLink>
                    <NavLink to='/loan_data/feed/feed' activeClassName="active" exact>首页贷款</NavLink>
                    <NavLink to='/loan_data/complete/complete' activeClassName="active" exact>贷款大全</NavLink>
                </div>
            )
    }
}
export default Left;