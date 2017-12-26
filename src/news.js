import React, { Component } from 'react';
import { Table,Button,DatePicker } from 'antd';
import Select from './select';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
class News extends Component{
    constructor(props){
        console.log(props)
        super(props);
        this.state={
            ptype:["安卓","Ios"],
            version:['1','2'],
            data:[],
            y:document.documentElement.clientHeight-200,
            urls:"http://172.16.30.60:9191/v2/cms/product/list",
            pagination:false,
            columns:[{
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width:150
            }, {
                title: '产品名',
                dataIndex: 'name',
                key: 'name',
                width:150
            }, {
                title: '点击数',
                dataIndex: 'click_num',
                key: 'click_num',
                width:150
            }, {
                title: '立即申请',
                key: 'apply_num',
                dataIndex:'apply_num',
                width:150
            }, {
                title:'申请点击比（%）' ,
                key:'apply' ,
                dataIndex:"apply",
                width:150

            }, {
                title: '分享',
                key: 'share',
                dataIndex:'share',
                width:150
            }
            ],
            complete_columns:[{
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width:150
            }, {
                title: '产品名',
                dataIndex: 'name',
                key: 'name',
                width:150
            }, {
                    title: '展示数',
                    dataIndex: 'show_num',
                    key: 'show_num',
                    width:150
            }, {
                title: '点击数',
                dataIndex: 'click_num',
                key: 'click_num',
                width:150
            }, {
                title:"点击展示比",
                dataIndex:"click",
                key:"click",
                width:150
            }, {
                title: '立即申请',
                key: 'apply_num',
                dataIndex:'apply_num',
                width:150
            }, {
                title:'申请点击比（%）' ,
                key:'apply' ,
                dataIndex:"apply",
                width:150

            }, {
                title: '分享',
                key: 'share',
                dataIndex:'share',
                width:150
            }
            ],
            emptyText:"正在加载中",
            load:true,
            click:0,
            apply_click:0,
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
    onchange(dates,dateStrings) {
        this.setState({
            startDate:dateStrings[0],
            endDate:dateStrings[1]
        })
    };
    getData(e) {
        e="http://api.360fangxindai.com:9191/v1/cms/behaviour?type="+this.props.match.params.type+"&startDate="+this.state.startDate+"&endDate="+this.state.endDate;
        var array=[];
        var obj=new XMLHttpRequest();
        obj.open("get",e,true);
        obj.onreadystatechange=function(e){
            if(obj.readyState == 4 && obj.status == 200 || obj.status == 304){
                var aa=obj.response,click=0,apply_click=0;
                aa=eval("("+aa+")");
                var datas=aa.data;
                for(var i in datas){
                    click+=datas[i].clickNum;
                    apply_click+=datas[i].applyNum;
                    var ex={};
                    ex.key=i;
                    ex.time=datas[i].createTime.split(" ")[0];
                    ex.name=this.props.match.params.type=="banner"?datas[i].banner.title:datas[i].loanProduct.title;
                    ex.click_num=datas[i].clickNum;
                    ex.apply_num=datas[i].applyNum;
                    ex.apply=datas[i].clickNum==0?"0":Math.round((datas[i].applyNum/datas[i].clickNum)*10000/100);
                    ex.share=datas[i].shareNum;
                    if(this.props.match.params.type=="complete"){
                        ex.show_num=datas[i].showNum;
                        ex.click=datas[i].showNum==0?"0":Math.round((datas[i].clickNum/datas[i].showNum).toFixed(2)*10000/100);
                    }
                    array.push(ex);
                }
                this.setState({
                    data:array,
                    load:false,
                    click:click,
                    apply_click:apply_click
                })
            }else{
                this.setState({
                    emptyText:"暂无数据"
                })
            }
        }.bind(this)
        obj.send();
    }
    componentWillMount() {
        this.getData();
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
                    <span>总点击：<span>{state.click}</span></span>
                    <span>立即申请总点击：<span>{state.apply_click}</span></span>
                    <span>申请点击比：<span>{state.apply_click==0?"0":(state.apply_click/state.click*100).toFixed(2)+'%'}</span></span>
                </div>
                <Table  bordered columns={this.props.match.params.type=="complete"?this.state.complete_columns:this.state.columns} dataSource={this.state.data}  scroll={{y:this.state.y}} pagination={this.state.pagination} loading={this.state.load} locale={{emptyText:this.state.emptyText}} />
            </div>
        )

    }
}
export default News;