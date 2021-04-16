import React, { Component } from 'react';
import {View, Text, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {Overlay} from 'teaset';

import IconFont from '../../../components/IconFont/IconFont';
import THheader from '../../../components/THheader/THheader';
import {pxToDp, screenHeight, screenWidth} from '../../../utils/phoneConvertUtil';
import friendApi from '../../../apis/friend';
import { BASE_URI } from '../../../apis/pathMap';
import DisFilter from './components/DisFilter';


class index extends Component {
  state = {
    params: {
      gender: '女',
      distance: 10000
    },
    // uid: 8
    // header: "/upload/13828459782.png"
    // nick_name: "雾霭朦胧"
    // dist: 0
    nears:[]
  }
  async componentDidMount(){
    this.reqNears();
  }
  whMap = [
    {width:pxToDp(60),height:pxToDp(80)},
    {width:pxToDp(51),height:pxToDp(68)},
    {width:pxToDp(42),height:pxToDp(56)},
    {width:pxToDp(33),height:pxToDp(44)},
    {width:pxToDp(24),height:pxToDp(32)}
  ]
  getWHLevel = (dis) => {
    if(dis <= 100){
      return 0;
    }else if (dis <= 500){
      return 1;
    }else if (dis <= 800){
      return 2;
    }else if (dis <= 1500){
      return 3;
    } else{
      return 4;
    }
  }
  showFilter = () => {
    const {params} = this.state;
    let overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center',
          flex:1, position:'relative'}}
        modal={true}
        overlayOpacity={0.6}
        >    
        <DisFilter filterSubmit={this.filterSubmit} filterParams={params} hideOverlay={() => {Overlay.hide(overlayId)}} />
      </Overlay.View>
    );
    let overlayId = Overlay.show(overlayView);
  }
  filterSubmit = (params) => {
    this.reqNears(params);
  }
  reqNears = async (params=this.state.params) => {
    let ret = await friendApi.reqNears(params);
    this.setState({nears:ret.data});
  }
  render() {
    const {nears} = this.state;
    const {whMap,getWHLevel} = this;
    return (
      <View>
        <ImageBackground source={require('./img/search.gif')} imageStyle={{
          height:'100%'}} style={{width:'100%',height:'100%'}}>
          {/* 筛选按钮-start */}
          <TouchableOpacity onPress={this.showFilter} style={{width:pxToDp(70),height:pxToDp(70),opacity:0.9,
          justifyContent:'center',alignItems:'center',position:'absolute',
          right:pxToDp(50),top:pxToDp(50),borderRadius:pxToDp(70),backgroundColor:'white'}}>
            <IconFont name="iconshaixuan" style={{fontSize:pxToDp(37),color:'#715CB0'}} />
          </TouchableOpacity>
          {/* 筛选按钮-end */}
          {/* 随机位置显示附近的人-start */}
          {nears.map((item) => {
            let width = whMap[getWHLevel(item.dist)].width,
             height = whMap[getWHLevel(item.dist)].height;
            let top = Math.random() * (screenHeight-height-pxToDp(86)) + pxToDp(16),
             left = Math.random() * (screenWidth-width);
            return (
              <ImageBackground key={item.uid} source={require('./img/showfirend.png')} style={{
                width,height,alignItems:'center',position:'absolute',left,top}}>
                <Text style={{color:'#EEE',fontSize:pxToDp(13),position:'absolute',
                  top:pxToDp(-16)}} numberOfLines={1}>{item.nick_name}</Text>
                <Image source={{uri:BASE_URI+item.header}} style={{width:width*0.9,height:width*0.9,
                borderRadius:width/2,position:'absolute',top:width*0.05}} />
              </ImageBackground>
            );
          }
          )}
          {/* 随机位置显示附近的人-end */}
          {/* 下方文字-start */}
          <View style={{position:'absolute',bottom:pxToDp(30),alignItems:'center',alignSelf:'center'}}>
            <Text style={{color:'white',fontSize:pxToDp(18)}}>您附近有
              <Text style={{color:'red',fontSize:pxToDp(30),lineHeight:pxToDp(30)}}>{nears.length}</Text>
              个好友</Text>
            <Text style={{color:'white',fontSize:pxToDp(18)}}>快去聊聊吧</Text>
          </View>
          {/* 下方文字-end */}
        </ImageBackground>
      </View>
    );
  }
}

export default index;
