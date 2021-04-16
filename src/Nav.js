import React, { Component } from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {observer,inject} from 'mobx-react';

import Login from './pages/Login/Login';
import PerfectInfo from './pages/PerfectInfo/PerfectInfo';
import Tabbar from './Tabbar';
import TanHua from './pages/Friend/TanHua';
import Near from './pages/Friend/Near';
import TestSoul from './pages/Friend/TestSoul';
import TestQA from './pages/Friend/TestSoul/TestQA';
import TestRet from './pages/Friend/TestSoul/TestRet';
import FriendDetail from './pages/Friend/Detail';

const Stack = createStackNavigator();

@inject('RootStore')
@observer
class Nav extends Component {
  constructor(props){
    super(props);
    this.state={
      initialRouteName: this.props.RootStore.token ? 'Tabbar' : 'Login'
    }
  }
  componentDidMount(){
    console.log('进入nav')
  }
  render() {
    const {initialRouteName} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PerfectInfo" component={PerfectInfo} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen name="TanHua" component={TanHua} />
          <Stack.Screen name="Near" component={Near} />
          <Stack.Screen name="TestSoul" component={TestSoul} />
          <Stack.Screen name="TestQA" component={TestQA} />
          <Stack.Screen name="TestRet" component={TestRet} />
          <Stack.Screen name="FriendDetail" component={FriendDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
