import React, { Component } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import {Slider} from 'react-native-elements';
import IconFont from '../../../../components/IconFont/IconFont';
import THbutton from '../../../../components/UIUtils/THbutton/THbutton';
import { pxToDp } from '../../../../utils/phoneConvertUtil';
import SvgUri from 'react-native-svg-uri';
import { male,female } from '../../../../res/font/iconSvg';

class DisFilter extends Component {
  state = {
    ...this.props.filterParams
  }
  componentDidMount(){
    
  }
  submitParams = () => {
    this.props.filterSubmit(this.state);
    this.props.hideOverlay();
  }
  chooseGender = (gender) => {
    this.setState({gender})
  }
  render() {
    const {gender,distance} = this.state;
    return (
      <View style={{position:'absolute',bottom:0,height:'70%',
        backgroundColor:'#F2F2F2',left:0,width:'100%',paddingVertical:pxToDp(15),
        }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',
          alignItems:'center'}}>
          <Text style={{width:pxToDp(30)}}></Text>
          <Text style={{color:'#555',fontSize:pxToDp(22)}}>筛选</Text>
          <IconFont onPress={this.props.hideOverlay} style={{color:'#555',fontSize:pxToDp(25),marginRight:pxToDp(5)}} name="iconshibai" />
        </View>
        {/* 性别-start */}
        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:pxToDp(10),
          marginTop:pxToDp(10),paddingHorizontal:pxToDp(22)}}>
          <Text style={{fontSize:pxToDp(17),color:'#555'}}>性别：</Text>
          <TouchableOpacity style={{backgroundColor:gender=='男'?'red':'#DDD',
            borderRadius:pxToDp(50),overflow:'hidden',marginHorizontal:pxToDp(15)}}
            onPress={()=>this.chooseGender('男')}>
            <SvgUri width={pxToDp(50)} height={pxToDp(50)} svgXmlData={male} />
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:gender=='女'?'red':'#DDD',
            borderRadius:pxToDp(50),overflow:'hidden',marginHorizontal:pxToDp(15)}}
            onPress={()=>this.chooseGender('女')}>
            <SvgUri width={pxToDp(50)} height={pxToDp(50)} svgXmlData={female} />
          </TouchableOpacity>
          </View>
        {/* 性别-end */}
        {/* 距离-start */}
        <View style={{paddingVertical:pxToDp(10),paddingHorizontal:pxToDp(22),marginTop:pxToDp(3)}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:pxToDp(15),color:'#555',marginRight:pxToDp(10)}}>距离：</Text>
            <Text style={{fontSize:pxToDp(15),color:'#888'}}>{distance+'KM' || '请选择'}</Text>
          </View>
          <View>
            <Slider
            value={distance} maximumValue={10000} minimumValue={0} step={100}
            onValueChange={(distance) => this.setState({ distance })}
            thumbStyle={{ height:pxToDp(25), width:pxToDp(25), backgroundColor:'#A020A0' }}
            />
          </View>
        </View>
        {/* 距离-end */}
        {/* 确认按钮-start */}
        <View style={{alignItems:'center',paddingVertical:pxToDp(10),
          marginTop:pxToDp(20),paddingHorizontal:pxToDp(22)}}>
          <THbutton style={{width:pxToDp(200),height:pxToDp(35)}}
            pressFn={this.submitParams}>确定</THbutton>
        </View>
        {/* 确认按钮-end */}
      </View>
    
    );
  }
}

export default DisFilter;
