import React, { Component } from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {inject, observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContext} from '@react-navigation/native';

import { BASE_URI } from '../../../../apis/pathMap';
import THheader from '../../../../components/THheader/THheader';
import {pxToDp} from '../../../../utils/phoneConvertUtil';
import friendApi from '../../../../apis/friend';
import { TouchableOpacity } from 'react-native';

@inject('UserStore')
@observer
class index extends Component {
  static contextType = NavigationContext;
  state = {
    question: [],
    // qsid: 1
    // question_title: "未来生活的幸福指数，跟物质和精神哪个关系更大？"
    // answers: Array(2)
    // 0: {qsid: 1, ans_title: "跟物质关系更大", ans_No: "A"}
    // 1: {qsid: 1, ans_title: "跟精神关系更大", ans_No: "B"}
    currIndex:0,
  }
  levelInfo = [ //题目等级基本信息
    {qid:1, imgPath:require('../img/level1.png'), title:'初级测试题'},
    {qid:2, imgPath:require('../img/level2.png'), title:'中级测试题'},
    {qid:3, imgPath:require('../img/level3.png'), title:'高级测试题'},
  ]
  indexStr = '一二三四五六'; //数字映射字符串
  answers = [] //答案
  async componentDidMount(){
    let ret = await friendApi.reqQuestionSection(this.props.route.params.qid);
    this.setState({question:ret.data});
  }
  handleAnswer = async (ans) => { //点击答案
    const {question, currIndex} = this.state;
    this.answers.push(ans);
    if(currIndex >= question.length-1){
      //发送请求获取结果
      let ret = await friendApi.getQuestionAnswer(this.props.route.params.qid, this.answers.join(','));
      this.context.navigate('TestRet', ret.data);
    } else{
      this.setState({currIndex:currIndex+1});
    }
  }
  render() {
    const {question, currIndex} = this.state;
    const {UserStore:{user}, route:{params:{qid}}} = this.props;
    return (
      <View>
        <THheader title={this.levelInfo[qid-1].title} />
        <ImageBackground source={require('../img/qabg.png')} style={{
          width:'100%',height:'100%'}}
          imageStyle={{height:'100%'}}>
          {question.length ? 
          <View style={{marginTop:pxToDp(50)}}>
            {/* 上部标题-start */}
            <View style={{flexDirection:'row',justifyContent:'space-between',
              alignItems:'center'}}>
              <ImageBackground source={require('../img/qatext.png')} style={{
                width:pxToDp(80),height:pxToDp(55),justifyContent:'center',
                alignItems:'center'}}>
                <Image source={{uri:BASE_URI+user.header}} style={{width:pxToDp(50),
                height:pxToDp(50),borderRadius:pxToDp(30),position:'absolute',
                right:pxToDp(5)}} />
              </ImageBackground>
              <View>
                <Text style={{fontSize:pxToDp(20),color:'#FFF'}}>第{this.indexStr[currIndex]}题</Text>
                <Text style={{fontSize:pxToDp(16),color:'#FFF',textAlign:'center'}}>({`${currIndex+1}/${question.length}`})</Text>
              </View>
              <Image source={this.levelInfo[qid-1].imgPath} style={{width:pxToDp(80),height:pxToDp(55)}} />
            </View>
            {/* 上部标题-end */}
            {/* 题目内容-start */}
            <View style={{width:'80%', alignSelf:'center', marginTop:pxToDp(30)}}>
              <Text style={{color:'#FFF',fontSize:pxToDp(18)}}>
                {question[currIndex].question_title}
              </Text>
              <View style={{marginTop:pxToDp(10)}}>
                {question[currIndex].answers.map((ans,i) => 
                <TouchableOpacity key={i} onPress={this.handleAnswer.bind(this, ans.ans_No)}>
                  <LinearGradient
                    colors={['#7149F8', '#EC5C8B']} start={{x:0,y:0}} end={{x:1,y:0}}
                    style={{height:pxToDp(50),borderRadius:pxToDp(10),alignItems:'center',
                    justifyContent:'center',marginTop:pxToDp(10)}}>
                    <Text style={{fontSize:pxToDp(18),color:'#FFF'}}>{ans.ans_title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                )}
              </View>
              
            </View>
            {/* 题目内容-end */}
          </View>
          :<View></View>
          }
          
        </ImageBackground>
      </View>
    );
  }
}

export default index;
