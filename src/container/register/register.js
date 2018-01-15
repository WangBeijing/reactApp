import React from 'react';
import Logo from '../../component/login/logo';
import {List ,InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { regisger } from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
import reactForm from '../../component/react-form/react-from';//高阶组件

@connect(
    state=>state.user,
    {regisger}
)
@reactForm

class Register extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius',//或者boss
        // }
        this.handleRegister=this.handleRegister.bind(this)
    }
    componentDidMount(){
        console.log(1)
        this.props.handleChange('type','genius')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleRegister(){
        this.props.regisger(this.props.state)
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem 
                    onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <InputItem type="password"
                    onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <InputItem  type="password" 
                    onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                    checked={this.props.state.type == 'genius'}
                    onChange={()=>this.props.handleChange('type','gennius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem 
                    cheched={this.props.state.type == 'boss'}
                    onChange={()=>this.props.handleChange('type','boss')}
                    >
                        BOSS
                    </RadioItem> 
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>

                </List>
                          
            </div>
        )
    }
}

export default Register