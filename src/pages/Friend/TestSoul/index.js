import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet, Image } from 'react-native';
import THheader from '../../../components/THheader/THheader';
import friendApi from '../../../apis/friend';
import Swiper from 'react-native-deck-swiper';
import {NavigationContext} from '@react-navigation/native';

import { pxToDp } from '../../../utils/phoneConvertUtil';
import { BASE_URI } from '../../../apis/pathMap';
import THbutton from '../../../components/UIUtils/THbutton/THbutton';


class index extends Component {
  static contextType = NavigationContext;
  state = {
    // qid: 1
    // type: "初级"
    // title: "初级灵魂题"
    // star: 2
    // imgpath: "/upload/questions/1.png"
    // status: 0
    // count: 3
    // sort_no: 1
    // istested: true
    // islock: false
    questions: [],
    currIndex: 0
  }
  swiperEl = React.createRef(); //Swiper组件
  async componentDidMount(){
    let ret = await friendApi.reqQuestions();
    this.setState({questions:ret.data});
  }
  handleSwiped = () => { //卡片滑动处理
    let {currIndex} = this.state;
    currIndex++;
    if(currIndex > 2){currIndex = 0;}
    this.setState({currIndex});
  }
  goQAPage = () => {
    const {questions,currIndex} = this.state;
    this.context.navigate('TestQA', {qid:questions[currIndex].qid});
  }
  render() {
    const {questions,currIndex} = this.state;
    return (
      <View style={{flex:1,position:'relative'}}>
        <THheader title="测灵魂" />
        <ImageBackground source={require('./img/testsoul_bg.png')} style={{
          height:'60%',width:'100%'}} imageStyle={{height:'100%',width:'100%'}}>
          {questions.length ? 
            <Swiper ref={this.swiperEl} key={currIndex}
              cards={questions}
              renderCard={(q) => {
                return (
                  <View style={styles.card}>
                    <Image source={{uri:BASE_URI+q.imgpath}} style={{
                      width:'100%',height:'100%'}}>
                    </Image>
                  </View>
                )
              }}
              onSwiped={this.handleSwiped}
              cardIndex={currIndex} cardVerticalMargin={20} verticalSwipe={false}
              backgroundColor={'transparent'} stackSeparation={pxToDp(-11)}
              stackSize={3}>
            </Swiper>
          : <></>}
        </ImageBackground>
        <THbutton style={{position:'absolute',bottom:pxToDp(45),alignSelf:'center',
          width:'50%',height:pxToDp(40),borderRadius:pxToDp(20)}} pressFn={this.goQAPage}
          textStyle={{fontSize:pxToDp(17)}}>开始测试</THbutton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    height:'75%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
export default index;
