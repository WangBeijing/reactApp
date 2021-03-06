import React from 'react';
import { NavBar , InputItem, TextareaItem,Button} from 'antd-mobile';
import  AvatarSelector  from '../../component/avatar-selecor/avatar-selecor'

import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom'
@connect(
  state=>state.user,
  { update }
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            desc:'',
        }
    }
    onChange(key, val){
        this.setState({
            [key] : val
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        console.log(path)
        console.log(redirect)

        return (
            <div>
            {redirect && redirect !== path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>
                求职职位
                </InputItem>
                <TextareaItem rows={3} autoHeight title='职位要求'
                onChange={(v)=>{this.onChange('desc',v)}}>
                个人简介
                </TextareaItem>
                <Button
                onClick={()=>{
                  this.props.update(this.state)
                }}
                type='primary'>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;
