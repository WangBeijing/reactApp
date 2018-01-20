import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';


@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
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
    // console.log(mgsGroup)
    const chatList = Object.values(mgsGroup);
    console.log(chatList)
    //按聊天用户分组
    return (
      <div>
        
            {chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = v[0].from ==userid?v[0].to:v[0].from;

              const name = userinfo[targetId] ? userinfo[targetId].name :'';
              const avatar = userinfo[targetId] ? userinfo[targetId].avatar :'';
              
              return (
                <List key={lastItem._id}>
                <Item key={lastItem._id}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
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