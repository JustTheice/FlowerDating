import React, { Component } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker';

import IconFont from '../../../../components/IconFont/IconFont';
import {pxToDp} from '../../../../utils/phoneConvertUtil';
import SvgUri from 'react-native-svg-uri';
import {Slider} from 'react-native-elements';

import THbutton from '../../../../components/UIUtils/THbutton/THbutton';

import cityJson from '../../../../res/json/citys.json';
import { male, female } from '../../../../res/font/iconSvg';


class FriendFillter extends Component {
  state = {
    ...this.props.filterParams
  }
  componentDidMount(){}
  chooseGender = (gender) => {
    this.setState({gender})
  }
  chooseLastLogin = () => {
    this.alertPicker(['15分钟','1天','1小时','不限制'],['15分钟'],[1,0,0],0,'lastLogin','最近登陆时间')
  }
  chooseCity = () => {
    this.alertPicker(cityJson,['北京','北京'],[1,1,0],1,'city','选择城市')
  }
  chooseEducation = () => {
    let eduData = ["博士后","博士","硕士","本科","大专","高中","留学","其他"];
    this.alertPicker(eduData,['其它'],[1,0,0],0,'education','选择学历');
  }
  alertPicker = (pickerData,selectedValue,wheelFlex,setData,stateName,pickerTitleText) => {
    Picker.init({
      pickerData,
      selectedValue,
      wheelFlex,
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText,
      onPickerConfirm: data => {
        this.setState(
          {
            [stateName]: data[setData]
          }
        );
      }
    });
    Picker.show();
  }
  submitParams = () => {
    this.props.filterSubmit(this.state);
    this.props.hideOverlay();
  }
  render() {
    const {gender,distance,lastLogin,city,education} = this.state;
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
        {/* 近期登录时间-start */}
        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:pxToDp(10),
          marginTop:pxToDp(3),paddingHorizontal:pxToDp(22)}}>
          <Text style={{fontSize:pxToDp(15),color:'#555',marginRight:pxToDp(10)}}>近期登录时间：</Text>
          <TouchableOpacity onPress={this.chooseLastLogin}>
            <Text style={{fontSize:pxToDp(15),color:'#888'}}>{lastLogin || '请选择'}</Text>
          </TouchableOpacity>
        </View>
        {/* 近期登陆时间-end */}
        {/* 距离-start */}
        <View style={{paddingVertical:pxToDp(10),paddingHorizontal:pxToDp(22),marginTop:pxToDp(3)}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:pxToDp(15),color:'#555',marginRight:pxToDp(10)}}>距离：</Text>
            <Text style={{fontSize:pxToDp(15),color:'#888'}}>{distance+'KM' || '请选择'}</Text>
          </View>
          <View>
            <Slider
            value={distance} maximumValue={10} minimumValue={0.5} step={0.5}
            onValueChange={(distance) => this.setState({ distance })}
            thumbStyle={{ height:pxToDp(25), width:pxToDp(25), backgroundColor:'#A020A0' }}
            />
          </View>
        </View>
        {/* 距离-end */}
        {/* 居住地-start */}
        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:pxToDp(10),
          marginTop:pxToDp(3),paddingHorizontal:pxToDp(22)}}>
          <Text style={{fontSize:pxToDp(15),color:'#555',marginRight:pxToDp(10)}}>居住地：</Text>
          <TouchableOpacity onPress={this.chooseCity}>
            <Text style={{fontSize:pxToDp(15),color:'#888'}}>{city || '请选择'}</Text>
          </TouchableOpacity>
        </View>
        {/* 居住地-end */}
        {/* 学历-start */}
        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:pxToDp(10),
          marginTop:pxToDp(3),paddingHorizontal:pxToDp(22)}}>
          <Text style={{fontSize:pxToDp(15),color:'#555',marginRight:pxToDp(10)}}>学历：</Text>
          <TouchableOpacity onPress={this.chooseEducation}>
            <Text style={{fontSize:pxToDp(15),color:'#888'}}>{education || '请选择'}</Text>
          </TouchableOpacity>
        </View>
        {/* 学历-end */}
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

export default FriendFillter;
