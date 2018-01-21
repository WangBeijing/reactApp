import React from 'react';
import { connect } from 'react-redux';
import { List , Badge} from 'antd-mobile';

import { getMsgList } from '../../redux/chat.redux'

@connect(
  state=>state,
  {
    getMsgList
  }
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
        this.props.getMsgList()
        //this.props.recvMsg()
    }
}
  render(){
    // if(!this.props.chat.chatmsg.length){
    //   return;
    // }
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    const mgsGroup = {};
    this.props.chat.chatmsg.forEach(v=>{
      mgsGroup[v.chatid] = mgsGroup[v.chatid] || []
      mgsGroup[v.chatid].push(v)
    })
    //用户聊天信息的数组
    const chatList = Object.values(mgsGroup).sort((a,b)=>{
      //通过时间戳大小对比排序
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last-a_last;
    });
    
    //按聊天用户分组
    return (
      <div>
        
            {chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = v[0].from ==userid?v[0].to:v[0].from;
              const unreadNum = v.filter(v=>!v.read && v.to == userid).length
              //消息列表 头像 和 名字
              const name = userinfo[targetId] ? userinfo[targetId].name :'';
              const avatar = userinfo[targetId] ? userinfo[targetId].avatar :'';
              
              return (
                <List key={lastItem._id}>
                <Item key={lastItem._id}
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}  
                  <Brief>{name }</Brief>
                </Item>
                </List>
              )
              
            })}
        
      </div>
    )
  }
}
export default Msg;