import React, { Component } from 'react';
import { Router,Route } from 'react-router-dom';
import Top from './top';
import Left from './left';
import ProductData from'./productData.js';
import News from './news.js';
import '../node_modules/antd/dist/antd.css';
import './top.css';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory();

class Main extends Component{
    static defaultProps={
        tab:["text1","text2","text3"]
    };
    constructor(props){
        super(props);
        this.state={
            height:document.documentElement.clientHeight,
            type:"news"
        }
        //let fs=require("fs");
        //fs.writeFile("test.txt")
        //console.log('=============');
    };
    getType(e){
        this.setState({
            type:e
        })
    }
    render() {
        return (
            <div className="main" style={{"height":this.state.height}}>
                <div>
                    <Top></Top>
                </div>
                <Router history={customHistory}>
                    <div className="main_bottom">
                        <Left type={this.getType.bind(this)}></Left>
                        <div className="main_show">
                            <div>
                                <Route path="/loan_data/news/:type" component={News} exact></Route>
                                <Route path="/loan_data/" component={ProductData} exact></Route>
                                <Route path="/loan_data/banner/:type" component={News} exact></Route>
                                <Route path="/loan_data/feed/:type" component={News} exact></Route>
                                <Route path="/loan_data/complete/:type" component={News} exact></Route>

                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
export default Main;