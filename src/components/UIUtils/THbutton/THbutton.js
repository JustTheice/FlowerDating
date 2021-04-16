import LinearGradient from 'react-native-linear-gradient';

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class THbutton extends Component {
  static defaultProps = {
    style: {width:100,height:50},
    textStyle: {},
    disabled: false
  }
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={this.props.pressFn} style={{...this.props.style,overflow:'hidden'}}>
        <LinearGradient
          colors={['#9b63cd', '#e07081']} start={{x:0,y:0}} end={{x:1,y:0}}
          style={{...styles.linearGradient}}>
          <Text style={{...styles.buttonText,...this.props.textStyle}}>{this.props.children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default THbutton;

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent:'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
