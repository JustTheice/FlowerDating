import React, { Component } from 'react';
import { View, Text } from 'react-native';
import iconfont from '../../res/font/iconfont';

class IconFont extends Component {
  render() {
    return (
      <View>
        <Text onPress={this.props.onPress} style={{fontFamily:'iconfont',...this.props.style}}>{iconfont[this.props.name]}</Text>
      </View>
    );
  }
}

export default IconFont;
