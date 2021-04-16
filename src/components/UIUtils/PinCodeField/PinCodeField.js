import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
class PinCodeField extends Component {
  state = {
    textValue: ''
  }
  
  render() {
    const {textValue} = this.state;
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>请输入6位验证码</Text>
        <CodeField
          value={this.props.pinCodeValue}
          onChangeText={this.props.handleChangeText}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, paddingHorizontal:45,paddingVertical:30},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 10},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
 

 
export default PinCodeField;
