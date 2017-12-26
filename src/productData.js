import React, { Component } from 'react';
import { Table,Button,DatePicker,Select } from 'antd';
//import Select from './select';
import $ from 'jquery';
import xlsx from 'node-xlsx';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const Option=Select.Option;
class ProductData extends Component{
    constructor(props){
        super(props);
        this.state={
            ptype:["安卓","Ios"],
            version:['1','2'],
            data:[],
            urls:"http://172.16.30.60:9191/v2/cms/product/list",
            pagination:false,
            columns:[{
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width:150
            }, {
                title: '活跃设备数',
                dataIndex: 'active_device',
                key: 'active_device',
                width:150
            }, {
                title: '活跃注册用户数',
                dataIndex: 'active_user',
                key: 'active_user',
                width:150
            }, {
                title: '注册活跃比(%)',
                key: 'active',
                dataIndex:'active',
                width:150
            }, {
                title:'新增设备数' ,
                key:'news_device' ,
                dataIndex:"news_device",
                width:150

            }, {
                title: '新增注册用户',
                key: 'news_user',
                dataIndex:'news_user',
                width:150
            }, {
                title:"新增注册比（%）",
                key:"news",
                dataIndex:"news",
                width:150
            }
            ],
            load:true,
            emptyText:'正在加载中',
            active_device:0,
            active_user:0,
            news_device:0,
            news_user:0,
            startDate:'',
            endDate:''
        }
    };
    setBegin(e) {
        this.setState({
            ptype:e
        })

    };
    setVersion(e) {
        this.setState({
            version:e
        })
    };
    getData(e) {
        e="http://api.360fangxindai.com:9191/v1/cms/userActive?startDate="+this.state.startDate+"&endDate="+this.state.endDate;
        var array=[];
        var obj=new XMLHttpRequest();
        obj.open("get",e,true);
        obj.onreadystatechange=function(e){
            if(obj.readyState == 4 && obj.status == 200 || obj.status == 304){
                var aa=obj.response,active_device=0,active_user=0,news_device=0,news_user=0;
                aa=eval("("+aa+")");
                var datas=aa.data;
                for(var i in datas){
                    active_device+=datas[i].equipmentActiveNum;
                    active_user+=datas[i].userActiveNum;
                    news_device+=datas[i].equipmentRegisterNum;
                    news_user+=datas[i].userRegisterNum;
                    var ex={};
                    ex.key=i;
                    ex.time=datas[i].createTime.split(" ")[0];
                    ex.active_device=datas[i].equipmentActiveNum;
                    ex.active_user=datas[i].userActiveNum;
                    ex.active=datas[i].equipmentActiveNum==0?"0":Math.round((datas[i].userActiveNum/datas[i].equipmentActiveNum)*10000/100);
                    ex.news_device=datas[i].equipmentRegisterNum;
                    ex.news_user=datas[i].userRegisterNum;
                    ex.news=datas[i].equipmentRegisterNum==0?"0":Math.round((datas[i].userRegisterNum/datas[i].equipmentRegisterNum)*10000/100);
                    array.push(ex);
                }
                this.setState({
                    data:array,
                    load:false,
                    active_device:active_device,
                    active_user:active_user,
                    news_device:news_device,
                    news_user:news_user
                });
            }else{
                this.setState({
                    emptyText:'暂无数据'
                })
            }
        }.bind(this)
        obj.send();
    }
    componentWillMount() {
        this.getData();
    };
    onchange(dates,dateStrings) {
        this.setState({
            startDate:dateStrings[0],
            endDate:dateStrings[1]
        })
    };
    ptypeChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        var state=this.state;
        return (
                <div>
                    <div className="dataNum">
                        <RangePicker
                            ranges={{ 昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')], '最近一周': [moment().startOf('week'), moment().endOf('week')], '最近一个月':[moment().startOf('month'), moment().endOf('month')],'最近三个月':[moment().subtract(3,'month'),moment()] }}
                            onChange={this.onchange.bind(this)} defaultValue={[moment().subtract(1, 'days'),moment().subtract(1, 'days')]}
                            />
                        <Button type="primary" className="export" onClick={this.getData.bind(this)} className="lefts">查询</Button>
                    </div>
                    <div className="dataNum">
                        <span>活跃设备数：<span>{this.state.active_device}</span></span>
                        <span>活跃注册用户数：<span>{this.state.active_user}</span></span>
                        <span>活跃注册比：<span>{this.state.active_device==0?"0":(this.state.active_user/this.state.active_device*100).toFixed(2)+'%'}</span></span>
                        <span>新增设备数：<span>{this.state.news_device}</span></span>
                        <span>新增注册用户：<span>{this.state.news_user}</span></span>
                        <span>新增注册比：<span>{this.state.news_device==0?"0":(this.state.news_user/this.state.news_device*100).toFixed(2)+'%'}</span></span>

                    </div>
                    <Table  bordered columns={this.state.columns} dataSource={this.state.data} {...this.state} scroll={{y:340}} loading={this.state.load} locale={{emptyText:this.state.emptyText}}/>
                </div>
            )

    }
}
export default ProductData;