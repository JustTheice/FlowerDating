import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { pxToDp } from '../../utils/phoneConvertUtil';
import SvgUri from 'react-native-svg-uri';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';
// import { PermissionsAndroid, Platform } from "react-native";
import {Toast,Overlay} from 'teaset';
import {inject,observer } from "mobx-react";

//自定义组件
import { male, female } from '../../res/font/iconSvg';
import AMap from '../../utils/AMap';
import THbutton from '../../components/UIUtils/THbutton/THbutton';
import CityJson from '../../res/json/citys.json';
import perfectInfoApi from '../../apis/perfectInfo';
import JMeassage from '../../utils/JMeassage';

//全局代码
const nowDate = new Date();
const currentDateStr = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`


@inject("RootStore") // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件重新渲染 从而显示最新的数据
class PerfectInfo extends Component {
  state = {
    nickname: "",
    gender: "",
    birthday: "",
    city: "",
    header: "",
    lng: "",
    lat: "",
    address: ""
  }
  //请求地址函数
  reqPositionInfo = async () => {
    const {address} = this.state;
    if(this.props.RootStore.isInitGeo && address==''){
      let ret = await AMap.getCityByLocation();
      if(ret.status == 1){
        const {formatted_address,addressComponent:{city,streetNumber:{location}}} = ret.regeocode;
        const [lng, lat] = location.split(',');
        this.setState({address:formatted_address.split, lng, lat, city:city.split('市')[0]})
      }
    }
  }
  componentDidMount(){
    this.reqPositionInfo();
  }
  //选择性别
  chooseGender = (gender) => {
    return () => {
      this.setState({gender});
    }
  }
  componentDidUpdate(){
    this.reqPositionInfo();
  }
  //选择城市
  chooseCity = () => {
    Picker.init({
      pickerData: CityJson,
      selectedValue: ["北京", "北京"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => {
        this.setState(
          {
            city: data[1]
          }
        );
      }
    });
    Picker.show();
  }
  //选择头像
  chooseAvatar = async () => {
    const {nickname,birthday,city,gender} = this.state;
    if(!nickname || !birthday || !city || !gender)  return Toast.sad('性别昵称生日城市必须填写！',2000,'center');
    //选择相册图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    });
    console.log('图像信息',image)
    //开启头像悬浮审核效果
    let overlayView = (
      <Overlay.View
        style={{alignItems: 'center', justifyContent: 'center',flex:1,position:'relative'}}
        modal={false}
        overlayOpacity={0.9}
        >
        <View style={{width:pxToDp(300),height:pxToDp(300), padding:pxToDp(20),position:'absolute',top:'20%', alignItems: 'center'}}>
          <Text style={{color:'white',marginBottom:pxToDp(25),fontSize:pxToDp(20)}}>头像审核中</Text>
          <View style={{position:'relative',height:pxToDp(250), alignItems: 'center',justifyContent:'center'}}>
          <Image style={{width:pxToDp(250),height:pxToDp(250),position:'absolute',top:pxToDp(-7.2),zIndex:99}} source={require('./img/scan.gif')}/>
          <Image style={{width:pxToDp(175),height:pxToDp(175)}} source={{uri:image.path}}/>
          </View>
        </View>
      </Overlay.View>
    );
    this.state.overlayKey = Overlay.show(overlayView);
    this.uploadUserInfo(image);
  }
  //上传信息
  uploadUserInfo = async (image) => {
    //构建参数，然后上传头像
    let formData = new FormData();
    formData.append('headPhoto', {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop()
    });
    console.log(this.props.RootStore);
    let ret0 = await perfectInfoApi.uploadAvatar(formData);
    if(ret0.code==10000){
      //头像上传成功,接着上传用户信息
      let infoData = this.state;
      infoData.header = ret0.data.headImgPath;
      let ret1 = await perfectInfoApi.uploadUserInfo(infoData);
      if(ret1.code==10000){
        Toast.success('信息上传成功',2000);
        Overlay.hide(this.state.overlayKey);
        //注册极光
        JMeassage.register(this.props.RootStore.userId, this.props.RootStore.phoneNumber).then((ret) => {
          console.log('极光注册成功',ret);
        }, (err) => {
          console.log('极光注册失败，请稍后再试',err);
        })
        
      }
    }
  }
  render() {
    const {gender,city} = this.state;
      return (
      <View style={{ flex: 1, backgroundColor: "#fff", padding: pxToDp(25) }}>
        <Image/>
        <Text>{this.props.RootStore.isInitGeo}</Text>
        <View style={{ paddingTop: 5 }}>
          <Text style={{ color: '#777', fontSize: pxToDp(30) }}>完善信息</Text>
          <Text style={{ color: '#777', fontSize: pxToDp(30) }}>提升我的魅力</Text>
        </View>
        <View style={{ alignContent: 'center', padding: pxToDp(20) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '65%', alignSelf: 'center' }}>
            <TouchableOpacity onPress={this.chooseGender('男')} style={{ padding: 10, backgroundColor: gender=='男'?'red':'#eee', borderRadius: pxToDp(55) }}>
              <SvgUri width={pxToDp(65)} height={pxToDp(65)} svgXmlData={male} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.chooseGender('女')} style={{ padding: 10, backgroundColor: gender=='女'?'red':'#eee', borderRadius: pxToDp(55) }}>
              <SvgUri width={pxToDp(65)} height={pxToDp(65)} svgXmlData={female} />
            </TouchableOpacity>
          </View>
          {/* 信息框 */}
          <View style={{paddingTop:pxToDp(14)}}>
            <Input
            placeholder='请输入昵称' onChangeText={(nickname) => this.setState({nickname})}
            placeholderTextColor='#afafaf' style={{fontSize:pxToDp(16)}}
            errorStyle={{ color: 'red' }}
            errorMessage=''
            />
            <DatePicker
              androidMode="spinner"
              style={{width: '100%'}}
              date={this.state.birthday}
              mode="date"
              placeholder="选择你的出生日期"
              format="YYYY-MM-DD"
              minDate="1960-01-01"
              maxDate={currentDateStr}
              confirmBtnText="确定"
              cancelBtnText="取消"
              customStyles={{
                dateIcon: {
                  display:'none'
                },
                dateInput: {
                  borderWidth:0,
                  marginHorizontal:pxToDp(8),
                  paddingLeft:pxToDp(4.5),
                  borderColor:'rgb(145,157,167)',
                  borderBottomWidth:pxToDp(1),
                  alignItems:'flex-start'
                },
                placeholderText: {
                  fontSize: pxToDp(16),
                  color:'#afafaf'
                }
              }}
              onDateChange={(birthday) => {this.setState({birthday})}}
            />
            <TouchableOpacity onPress={this.chooseCity}>
              <Input
              placeholder='请手动选择城市' onChangeText={(city) => this.setState({city})}
              placeholderTextColor='#afafaf' style={{fontSize:pxToDp(16), marginTop:pxToDp(22), width:'100%'}}
              value={city} disabled
              />
            </TouchableOpacity>
          </View>
          {/* 设置头像按钮 */}
          <View>
            <THbutton pressFn={this.chooseAvatar} style={{width:'100%',marginTop:pxToDp(10),height:pxToDp(40),alignSelf:'center',borderRadius:pxToDp(15)}}>设置头像</THbutton>
          </View>
        </View>
      </View>
    );
  }
}

export default PerfectInfo;
