import React, { Component } from 'react';
import './top.css';

class Select extends Component{
    constructor(props){
        super(props);
        this.state={
            city:"begin",
            para:this.props.para
        }
    };
    handleChange(e) {
        var val=e.target.value;
        this.props.getPara(val)

    };
    text() {
        alert("text");
    };
    render() {
        return (
            <select val={this.state.city} id="" onChange={this.handleChange.bind(this)}>
                {
                    this.state.para.map(function(e,index){
                        return <option value={index} key={index}>{e}</option>
                    })
                }
            </select>
        )
    }
}

export default Select;