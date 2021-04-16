// In App.js in a new project

import React, {Component} from 'react';

import {Toast} from 'teaset';
import { Provider,observer} from "mobx-react";
// import AsyncStorage from 'react-native-async-storage';
import {View, Text, AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import JMeaasage from './utils/JMeassage';
import RootStore from './mobx';
import UserStore from './mobx/UserStore';
import AMap from './utils/AMap';

import Nav from './Nav';


class App extends Component {
  state = {
    canLodge: false
  }
  componentDidMount(){
    //启动图关闭
    SplashScreen.show();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    Toast.message('请打开位置权限');
    
    // this.setState({canLodge:true})
    //加载本地用户信息到mobx
    AsyncStorage.getItem('userinfo').then((ret) => {
      let userInfo = ret ? JSON.parse(ret) : {};
      console.log('获取到userinfo了', userInfo)
      if(userInfo.token){
        RootStore.setUserInfo(userInfo);
      }
      AMap.initGeo().then(
        () => {
          RootStore.setState('isInitGeo', true);
        }, err => {
          Toast.fail(err);
        }
      );
      JMeaasage.init(); //极光服务初始化
      this.setState({canLodge:true});
    }, (err) => {
      console.log('加载userinfo失败', err);
    });

  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider RootStore={RootStore} UserStore={UserStore}>
          {/* <Nav/> */}
          {this.state.canLodge ? <Nav/> : <></>}
        </Provider>
      </View>
    );
  }
}

export default App;
