import React from 'react';
import { Grid , List} from 'antd-mobile';
import PropTypes from 'prop-types';//属性检测

class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,//类型检测，function,必穿
    }
    constructor(props){
        super(props)
        this.state = {  
        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(v=>({
            icon:require(`../img/${v}.png`),
            text:v
        }))
        const gridHeader = this.state.text?
        (<div><span>已选择头像<img style={{width:20}} src={this.state.icon} alt=""/></span></div>):'请选择头像';
        return (
            <div>
                <List renderHeader={()=>gridHeader }>
                    <Grid data={avatarList}  columnNum={5}
                    onClick={ele=>{
                        this.setState(ele)
                        this.props.selectAvatar(ele.text)
                    }}
                    />
                </List>  
                         
            </div>
        )
    }
}
export default AvatarSelector;