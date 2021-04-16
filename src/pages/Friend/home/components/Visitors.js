import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image } from 'react-native';
import {pxToDp} from '../../../../utils/phoneConvertUtil';

import friendApi from '../../../../apis/friend';
import {BASE_URI} from '../../../../apis/pathMap';


class Visitors extends Component {
  state = {
    visitors: [
      // target_uid: 7
      // uid: 8
      // nick_name: "雾霭朦胧"
      // age: 21
      // xueli: "大专"
      // marry: "未婚"
      // gender: "女"
      // Distance: 9666804.2
      // header: "/upload/13828459782.png"
      // agediff: -2
      // fateValue: 60
    ]
  }
  async componentDidMount(){
    const visitorsRet = await friendApi.reqVisitors();
    if(visitorsRet.code == 10000){
      this.setState({visitors: visitorsRet.data});
    }
  }
  render() {
    const {visitors} = this.state;
    return (
      <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#F5F5F5',
      height:pxToDp(50),alignItems:'center',paddingHorizontal:pxToDp(5),
      marginHorizontal:pxToDp(5),marginTop:pxToDp(5)}}>
        <Text style={{color:'#666',fontSize:pxToDp(16),flex:1}}>有{visitors.length}个人偷偷看了你...</Text>
        <View style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'space-around'}}>
          {visitors.slice(0,3).map((visitor) => (
            <Image style={{width:pxToDp(42),height:pxToDp(42),borderRadius:pxToDp(23)}} source={{uri:BASE_URI+visitor.header}} key={visitor.uid} />
          ))}
          <Text style={{fontSize:pxToDp(18),color:'#666'}}>&gt;</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Visitors;
