import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Overlay} from 'teaset';
import {NavigationContext} from '@react-navigation/native';

import IconFont from '../../../../components/IconFont/IconFont';
import {pxToDp} from '../../../../utils/phoneConvertUtil';
import friendApi from '../../../../apis/friend';
import {BASE_URI} from '../../../../apis/pathMap';
import FriendFilter from './FriendFilter';

class RecommendList extends Component {
  static contextType = NavigationContext;
  state = {
    params: {
      page: 1,
      pagesize: 10,
      gender: '女',
      distance: 2,
      lastLogin: '',
      city: '',
      education: ''
    },
    
    recommends: []
  }
  async componentDidMount(){
    let ret = await friendApi.reqRecommands(this.state.params);
    this.setState({recommends:ret.data});
  }
  //筛选器提交完成
  filterSubmit = async (params) => {
    let combineParams = {...this.state.params,...params};
    this.setState({params:combineParams});
    let ret = await friendApi.reqRecommands(combineParams);
    this.setState({recommends:ret.data});
  }
  showFillter = () => {
    const {page,pagesize,...others} = this.state.params;
    let overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center',
          flex:1, position:'relative'}}
        modal={true}
        overlayOpacity={0.6}
        ref={v => this.overlayView = v}
        >    
        <FriendFilter filterSubmit={this.filterSubmit} filterParams={others} hideOverlay={() => {Overlay.hide(overlayId)}} />
      </Overlay.View>
    );
    let overlayId = Overlay.show(overlayView);
  }
  render() {
    const {recommends} = this.state;
    return (
      <View style={{paddingHorizontal:pxToDp(5)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',
          alignItems:'center',backgroundColor:'#EEE',padding:pxToDp(5)}}>
          <Text style={{fontSize:pxToDp(15),color:'#666'}}>推荐列表</Text> 
          <IconFont name="iconshaixuan" style={{marginRight: pxToDp(3),
            color:'#666',fontSize:pxToDp(15)}} onPress={this.showFillter} />
        </View>
        <View>
          {recommends.map((item) => (
            <TouchableOpacity key={item.id} style={{padding:pxToDp(10),borderBottomWidth:pxToDp(.7),
              borderBottomColor:'#777',flexDirection:'row',alignItems:'center',
              }} onPress={() => this.context.navigate('FriendDetail', {userId:item.id})}>
              <Image source={{uri:BASE_URI+item.header}} style={{width:pxToDp(60),
              height:pxToDp(60),borderRadius:pxToDp(30)}} />
              {/* 右边 */}
              <View style={{flex:1,paddingVertical:pxToDp(12),
                flexDirection:'row',paddingHorizontal:pxToDp(10)}}>
                <View style={{flex:3}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'#444',fontSize:pxToDp(18)}}>{item.nick_name}</Text>
                    <IconFont style={{color:item.gender=='男'?'#20A0F0':'#F0A0A0',marginHorizontal:pxToDp(2),
                    fontSize:pxToDp(18)}} name={item.gender=='男'?'icontanhuanan':'icontanhuanv'} />
                    <Text style={{marginLeft:pxToDp(5),fontSize:pxToDp(15),
                      color:'#666'}}>{item.age}</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',marginTop:pxToDp(7)}}>
                    <Text style={{color:'#555',fontSize:pxToDp(14)}}>{item.marry}&nbsp;|&nbsp;{item.xueli}&nbsp;|&nbsp;年龄相仿</Text>
                  </View>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <IconFont name="iconxihuan" style={{color:'#F03030',fontSize:pxToDp(25)}} />
                    <Text style={{color:'#555',fontSize:pxToDp(15),marginLeft:pxToDp(5)}}>{item.fateValue}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            
          ))}
        </View>
      </View>
    );
  }
}

export default RecommendList;
