import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import TabNavigator from 'react-native-tab-navigator';
// import SvgData from './res/svg';
import {friend, selectedFriend, group, selectedGroup, message, selectedMessage, my, selectedMy} from './res/font/iconSvg';
import Friend from './pages/Friend/home';
import Group from './pages/Group/home';
import Message from './pages/Message/home';
import Mine from './pages/Mine/home';

const dataSource = [
  {
    id: 1,
    selectedTab: 'friend',
    title: '交友',
    renderIconSvg: friend,
    renderSelectedIconSvg: selectedFriend,
    // onPress: () => this.setState({selectedTab: 'friend'}),
    component: <Friend/>,
  },
  {
    id: 2,
    selectedTab: 'group',
    title: '圈子',
    renderIconSvg: group,
    renderSelectedIconSvg: selectedGroup,
    // onPress: () => this.setState({selectedTab: 'group'}),
    component: <Group/>,
  },
  {
    id: 3,
    selectedTab: 'message',
    title: '消息',
    renderIconSvg: message,
    renderSelectedIconSvg: selectedMessage,
    // onPress: () => this.setState({selectedTab: 'group'}),
    component: <Message/>,
  },
  {
    id: 4,
    selectedTab: 'mine',
    title: '我的',
    renderIconSvg: my,
    renderSelectedIconSvg: selectedMy,
    // onPress: () => this.setState({selectedTab: 'group'}),
    component: <Mine/>,
  }
];

class Tabbar extends Component {
  state = {
    selectedTab: 'friend',
  };
  componentDidMount(){
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F5FCFF'}}>
        <TabNavigator>
          {dataSource.map((page) => (
            <TabNavigator.Item key={page.id}
              selected={this.state.selectedTab === page.selectedTab}
              title={page.title}
              tabStyle={stylesheet.tab}
              titleStyle={{color: '#999999'}}
              selectedTitleStyle={{color: '#c863b5'}}
              renderIcon={() => (
                <SvgUri width="23" height="23" svgXmlData={page.renderIconSvg} />
              )}
              renderSelectedIcon={() => (
                <SvgUri width="23" height="23" svgXmlData={page.renderSelectedIconSvg} />
              )}
              onPress={() => this.setState({selectedTab:page.selectedTab})}>
              {page.component}
            </TabNavigator.Item>
          ))}
        </TabNavigator>
      </View>
    );
  }
}
const stylesheet = StyleSheet.create({
  tab: {
    justifyContent: 'center',
  },
  tabIcon: {
    color: '#999',
    width: 23,
    height: 23,
  },
});
export default Tabbar;
