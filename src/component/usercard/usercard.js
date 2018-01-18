import React from 'react';
import PropTypes from 'prop-types';//属性检测
import { Card, WhiteSpace, WingBlank} from 'antd-mobile';
import { withRouter } from 'react-router-dom'
//var injectTapEventPlugin =  require（'react-tap-event-plugin'）

//import injectTapEventPlugin from 'react-tap-event-plugin'
//injectTapEventPlugin()
@withRouter


class UserCard extends React.Component{
    static propTypes = {
        userlist: PropTypes.array.isRequired,//类型检测，function,必传
    }
    handleClick(v){        
        this.props.history.push(`/chat/${v._id}`)
    }
    //onClick={()=>this.handleClick(v)}  
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
       return(
        <WingBlank style={{cursor:'pointer'}}>
            <WhiteSpace></WhiteSpace>
            {this.props.userlist.map(v=>(
                v.avatar?(
                    <Card key={v._id} style={{cursor:'pointer'}}
                    onClick={()=>this.handleClick(v)}                    
                    >
                    <Header  
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                    ></Header>
                    <Body>
                    {v.type == 'boss'?<div>公司:{v.company}</div>:null}
                        {v.desc.split('\n').map(d=>(
                            <div key={d}>{d}</div>
                        ))}
                        {v.type == 'boss'?<div>薪资:{v.money}</div>:null}
                    </Body>                        
                </Card>):null
            ))}
           
        </WingBlank>
       )
    }
}

export default UserCard;