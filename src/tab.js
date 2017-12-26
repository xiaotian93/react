import React, { Component } from 'react';
import './top.css';
class Tabs extends Component{
    getUrl(e) {
        var urls=this.props.url;
        //this.props.getData(urls);
    }
    render() {
        return (
                <div onClick={this.getUrl.bind(this)}><a href={this.props.url} className="active">{this.props.tab}</a></div>
            )

    }
}
export default Tabs;