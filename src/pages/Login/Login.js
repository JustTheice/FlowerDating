import React, {Component} from 'react';
import {View, Text, StatusBar, Image, AsyncStorage} from 'react-native';
import {Input} from 'react-native-elements';
import {Toast} from 'teaset';
import {observer,inject} from 'mobx-react';
//引入 网络请求api和单元工具库
import {pxToDp} from '../../utils/phoneConvertUtil';
import validator from '../../utils/validator';
import loginApi from '../../apis/login';
// import AsyncStorage from 'react-native-async-storage';
//引入 组件
import THbutton from '../../components/UIUtils/THbutton/THbutton';
import PinCodeField from '../../components/UIUtils/PinCodeField/PinCodeField';

@inject('RootStore')
@observer
class Login extends Component {
  state = {
    phoneNumber: "18665711978",
    errorMessage: '',
    isPinCodePage: false,
    getPinCodeTime: 0,
    pinCodeValue: ''
  };
  componentDidMount(){
    // alert('进入应用');
  }
  //输入完成
  handleSubmit = () => {
    let {phoneNumber} = this.state;
    if(this.state.getPinCodeTime) return;
    if (validator.validatePhone(phoneNumber)) {
      //手机号正确 发送请求获取验证码
      this.setState({isPinCodePage: true, getPinCodeTime: 5});
      let pinCodeTimer = setInterval(() => {
        this.setState({getPinCodeTime:this.state.getPinCodeTime-1});
        if(this.state.getPinCodeTime == 0) clearInterval(pinCodeTimer);
      }, 1000);

      loginApi.reqPinCode({phone: phoneNumber}).then(
        (data) => {
          console.log('已获取到验证码', data);
        },
        (err) => {
          console.log('获取验证码失败', err);
          alert(err);
        },
      );
    } else {
      this.setState({errorMessage: '请输入正确的手机号'});
    }
  };
  handleChangeText = (pinCodeValue) => {
    this.setState({pinCodeValue});

    if(pinCodeValue.length == 6){ //验证码长度足够 发送请求验证
      loginApi.confirmPinCode({phone:this.state.phoneNumber,vcode:pinCodeValue}).then(
        res => {
          alert('请求验证码了');
          if(res.code == 10000){
            const data = res.data;
            const {phoneNumber} = this.state;
            const {id, token, isNew} = data;
            //更新mobx中的用户状态
            this.props.RootStore.setUserInfo({userId:id, token,phoneNumber});
            //更新本地存储状态
            AsyncStorage.setItem('userinfo', JSON.stringify({userId:id, token,phoneNumber}));
            if(isNew){ //新用户跳转完善信息页面
              this.props.navigation.navigate('PerfectInfo')
            }else{ //老用户跳转应用界面
              this.props.navigation.navigate('Tabbar')
              alert('老用户，跳到交友页面');
            }
            
          }else{
            Toast.fail('验证失败');
            this.setState({pinCodeValue:''})
          }
        },
        err => {console.log(err)}
      );
    }
  }

  loginPageRender = () => {
    const {phoneNumber, errorMessage} = this.state;
    return (
      <View style={{padding: pxToDp(20)}}>
        <Input
          placeholder="请输入手机号"
          value={phoneNumber}
          keyboardType="phone-pad"
          maxLength={11}
          errorMessage={errorMessage}
          leftIcon={{
            type: 'font-awesome',
            name: 'phone',
            color: 'yellowgreen',
          }}
          style={{color: '#333', padding: 10}}
          onSubmitEditing={this.handleSubmit}
          onChangeText={(phoneNumber) => this.setState({phoneNumber})}
        />
        <View style={{alignSelf: 'center'}}>
          <THbutton
            pressFn={this.handleSubmit}
            style={{
              width: pxToDp(270),
              height: pxToDp(40),
              borderRadius: pxToDp(20),
            }}>
            获取验证码
          </THbutton>
        </View>
      </View>
    );
  };
  pinPageRender = () => {
    const {getPinCodeTime} = this.state;
    return (
      <View style={{}}>
        <View style={{height:pxToDp(125)}}>
          <PinCodeField pinCodeValue={this.state.pinCodeValue} handleChangeText={this.handleChangeText}/>
        </View>
        <View style={{alignSelf:'center'}}>
          <THbutton disabled={getPinCodeTime?true:false} pressFn={this.handleSubmit} style={{width:pxToDp(200),height:pxToDp(40),borderRadius:pxToDp(20)}}>重新获取{getPinCodeTime?`${getPinCodeTime}s`:''}</THbutton>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        {/* 设置透明状态栏 */}
        <StatusBar backgroundColor="transparent" translucent />
        <Image source={require('./img/background.jpg')} />
        {this.state.isPinCodePage ? this.pinPageRender() : this.loginPageRender()}
      </View>
    );
  }
}

export default Login;
