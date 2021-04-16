import React, { Component } from 'react';
import { View,Text,StatusBar,ImageBackground,TouchableOpacity } from 'react-native';
import {NavigationContext} from '@react-navigation/native';

import {pxToDp} from '../../utils/phoneConvertUtil';
import IconFont from '../IconFont/IconFont';

class THheader extends Component {
  static contextType = NavigationContext;
  componentDidMount(){
    console.log(this.context)
  }
  render() {
    const {backTo} = this.props;
    return (
      <View>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground source={require('./img/headbg.png')} style={{
          height:pxToDp(80),justifyContent:'flex-end'
        }}>
          <View style={{flexDirection:'row',padding:pxToDp(8),justifyContent:'space-between',
            alignItems:'center'}}>
            {/* 左侧返回 */}
            <TouchableOpacity onPress={backTo ? () => this.context.navigate(backTo) : this.context.goBack} style={{width:pxToDp(70),flexDirection:'row',alignItems:'center'}}>
              <IconFont name="iconfanhui" style={{color:'white',fontSize:pxToDp(18)}} />
              <Text style={{fontSize:pxToDp(16),color:'white'}}>返回</Text>
            </TouchableOpacity>
            {/* 标题 */}
            <Text style={{fontSize:pxToDp(20),color:'white'}}>{this.props.title}</Text>
            {/* 填充 */}
            <View style={{width:pxToDp(70)}}>{this.props.rightCompoent}</View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default THheader;
