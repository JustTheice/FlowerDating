import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {NavigationContext} from '@react-navigation/native';

import {tanhua, near, testSoul} from '../../../../res/font/iconSvg';
import {pxToDp} from '../../../../utils/phoneConvertUtil';

class FriendHeader extends Component {
  static contextType = NavigationContext;
  goPage = (pageName) => {
    return () => {
      this.context.navigate(pageName);
    }
  }
  render() {
    return (
      <View style={{flexDirection:'row',width:'78%',alignSelf:'center',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={this.goPage('TanHua')} style={{justifyContent:'center',alignItems:'center',width:pxToDp(80),height:pxToDp(80),borderRadius:pxToDp(40),backgroundColor:'#FF5050D0'}}>
          <SvgUri width={pxToDp(45)} height={pxToDp(45)} svgXmlData={tanhua} />
          <Text style={{color:'#FFF',fontSize:pxToDp(12)}}>探花</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goPage('Near')} style={{justifyContent:'center',alignItems:'center',width:pxToDp(80),height:pxToDp(80),borderRadius:pxToDp(40),backgroundColor:'#05E050D0'}}>
          <SvgUri width={pxToDp(45)} height={pxToDp(45)} svgXmlData={near} />
          <Text style={{color:'#FFF',fontSize:pxToDp(12)}}>附近</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goPage('TestSoul')} style={{justifyContent:'center',alignItems:'center',width:pxToDp(80),height:pxToDp(80),borderRadius:pxToDp(40),backgroundColor:'#0550FFD0'}}>
          <SvgUri width={pxToDp(45)} height={pxToDp(45)} svgXmlData={testSoul} />
          <Text style={{color:'#FFF',fontSize:pxToDp(12)}}>测灵魂</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FriendHeader;
