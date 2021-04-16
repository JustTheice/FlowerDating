import React, { Component } from 'react';
import { View,Image,Text } from 'react-native';

import friendApi from '../../../../apis/friend';
import {pxToDp} from '../../../../utils/phoneConvertUtil';
import IconFont from '../../../../components/IconFont/IconFont';

const ywy = {
  header:require('../img/ywy.jpg'),
  nick_name: '云无月',
  gender: '女',
  age: 3000,
  text1: '魇魅',
  text2: '大妖',
  text3: '年龄差距过大',
  fateValue: 98
}
const zz = {
  header:require('../img/yhzz.jpg'),
  nick_name: '诱惑の姿姿',
  gender: '女',
  age: 19,
  text1: '小眼镜',
  text2: 'wuzizi',
  text3: '年龄相仿',
  fateValue: 99
}
class ProfectGril extends Component {
  state = {
    perfectGril: zz
    // id: 8
    // header: "/upload/13828459782.png"
    // nick_name: "雾霭朦胧"
    // gender: "女"
    // age: 21
    // marry: "未婚"
    // xueli: "大专"
    // dist: 9666804.2
    // agediff: -2
    // fateValue: 60
  }
  async componentDidMount(){
    const ret = await friendApi.reqPerfectGrils();
    console.log(ret)
  }
  render() {
    const {perfectGril} = this.state;
    return (
      <View style={{backgroundColor:'#EEE',flexDirection:'row',paddingRight:pxToDp(8),
      height:pxToDp(130),marginHorizontal:pxToDp(5),
      marginVertical:pxToDp(7),alignItems:'center'}}>
        <View style={{position:'relative'}}>
          <Image source={perfectGril.header} style={{
            width:pxToDp(130),height:pxToDp(130)
          }} />
          <Text style={{position:'absolute',left:0,bottom:pxToDp(10),
            color:'white',width:pxToDp(80),height:pxToDp(30),
            backgroundColor:'#A000A0AA',textAlign:'center',lineHeight:pxToDp(30),
            fontSize:pxToDp(15),borderTopRightRadius:pxToDp(8),
            borderBottomRightRadius:pxToDp(8)}}>
            今日佳人
          </Text>
        </View>
        {/* 右边 */}
        <View style={{flex:1,backgroundColor:'#FBFBFB',paddingVertical:pxToDp(12),
          flexDirection:'row',height:pxToDp(110),paddingHorizontal:pxToDp(10)}}>
          <View style={{flex:3}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#444',fontSize:pxToDp(18)}}>{perfectGril.nick_name}</Text>
              <IconFont style={{color:perfectGril.gender=='男'?'#20A0F0':'#F0A0A0',marginHorizontal:pxToDp(2),
                fontSize:pxToDp(18)}} name={perfectGril.gender=='男'?'icontanhuanan':'icontanhuanv'} />
              <Text style={{marginLeft:pxToDp(5),fontSize:pxToDp(15),
                color:'#666'}}>{perfectGril.age}岁</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:pxToDp(7)}}>
              <Text style={{color:'#555',fontSize:pxToDp(14)}}>{perfectGril.text1}&nbsp;|&nbsp;{perfectGril.text2}&nbsp;|&nbsp;{perfectGril.text3}</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{position:'relative'}}>
              <Text style={{position:'absolute',zIndex:9,top:pxToDp(17.5),left:pxToDp(17.5),
                color:'#FBFBFB'}}>{perfectGril.fateValue}</Text>
              <IconFont name="iconxihuan" style={{color:'#F03030',fontSize:pxToDp(50)}} />
            </View>
            <Text style={{color:'#F04040',marginTop:pxToDp(-5),fontSize:pxToDp(12)}}>缘分值</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ProfectGril;
