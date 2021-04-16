import React, { Component } from 'react';
import { View,Text,Image,StatusBar } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';

import {pxToDp} from '../../../utils/phoneConvertUtil';

import FriendHeader from './components/FriendHeader';
import Visitors from './components/Visitors';
import IconFont from '../../../components/IconFont/IconFont';
import PerfertGril from './components/PerfectGril';
import RecommendList from './components/RecommendList';

class FriendHome extends Component {
  render() {
    return (
      <HeaderImageScrollView
      maxHeight={pxToDp(155)}
      minHeight={pxToDp(44)}
      headerImage={require('./img/headfriend.png')}
      renderForeground={() => (
        <View style={{justifyContent:'center', height:pxToDp(155)}}>
          <StatusBar translucent backgroundColor="transparent" />
          <FriendHeader/>
        </View>
      )}>
        <View style={{padding:pxToDp(5)}}>
          <Visitors/>
          <PerfertGril/>
          <RecommendList/>
        </View>
      </HeaderImageScrollView>
    );
  }
}

export default FriendHome;
