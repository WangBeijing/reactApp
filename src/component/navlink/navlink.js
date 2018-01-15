import React from 'react';
import PropTypes from 'prop-types';//属性检测
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter

class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired,//类型检测，function,必穿
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const { pathname } = this.props.location;
        return(
           <TabBar>
               {
                   navList.map(v=>(
                       <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}.png`)}}
                        selected={pathname === v.path}
                        onPress={()=>{
                            console.log(v.path)
                            this.props.history.push(v.path )
                        }}
                       >

                       </TabBar.Item>
                   ))
               }
           </TabBar>
        )
    }
}

export default NavLinkBar;