import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import THheader from '../../../../components/THheader/THheader';
import { pxToDp } from '../../../../utils/phoneConvertUtil';
import {inject, observer} from 'mobx-react';
import UserStore from '../../../../mobx/UserStore';
import { ScrollView } from 'react-native';
import { BASE_URI } from '../../../../apis/pathMap';

@inject('UserStore')
@observer
class index extends Component {
  state = {
    
    testRet: this.props.route.params || {
      qid: 1,
      content: `你们都是感性动物，更加在乎恋爱中双方的感受。
      也许你们都经历过生活的坎坷，所以你们都希望有一个安安稳稳的未来生活，两个孩子一只狗，一个温馨的家是你们的归属。
      你们对生活有着更长远的打算，也许当下苦一点，并不会对你们造成多少伤害，你们期许的是一个更好的未来。
      你们都不相信所谓命运，爱情是自己争取的，它从来不会从天而降。`,
      extroversion: 82,
      judgment: 91,
      abstract: 89,
      rational: 87,
      currentUser:{
        id: 7,
        vcode: "888888",
        mobile: "18665711978",
        email: null,
        header: "/upload/161335014084118665711978.jpg",
        nick_name: "记号笔",
        age: 23,
        gender: "男",
        birthday: "2021-02-10T16:00:00.000Z",
        city: "唐山",
        address: "fjdskjfdvdksjkfkjksjkcjdkjvk",
        xueli: "硕士",
        amount: null,
        status: 0,
        lng: 110,
        lat: 110,
        Distance: 9666804.2,
        login_time: "2021-04-02T08:50:23.000Z",
        marry: "已婚",
        guid: "186657119781591501526289"
      }
    }
  }
  componentDidMount(){
    // console.log(this.props.route.params);
  }
  render() {
    const {testRet} = this.state;
    const {UserStore:{user}} = this.props;
    return (
      <ImageBackground source={require('../img/qabg.png')} style={{
        flex:1,width:'100%'}} imageStyle={{height:'100%'}}>
        <THheader backTo='TestSoul' title="测试结果"/>
        <ImageBackground source={require('../img/result.png')} style={{
        width:'100%',height:'100%',position:'relative'}} imageStyle={{width:'100%',height:'100%'}}
        resizeMode='stretch'>
          <Text style={{color:'#DDD',letterSpacing:pxToDp(3),fontSize:pxToDp(18)
            ,position:'absolute',top:'1%',left:'6%'}} >灵魂基因鉴定单</Text>
          <View style={{position:'absolute',top:'5.5%',right:'5%',width:'45%',
            height:pxToDp(235)}}>
            {/* 名字标题-start */}
            <View style={{flexDirection:'row',justifyContent:'space-between',
              }}>
              <Text style={{color:'#FFF',fontSize:pxToDp(20)}}>[</Text>
              <Text style={{color:'#FFF',fontSize:pxToDp(20)}}>{user.nick_name}</Text>
              <Text style={{color:'#FFF',fontSize:pxToDp(20)}}>]</Text>
            </View>
            {/* 名字标题-end */}
            {/* 文字内容-start */}
            <ScrollView style={{marginTop:pxToDp(15),overflow:'hidden',
              }}>
              <Text style={{color:'#FFF',fontSize:pxToDp(17)}}>{testRet.content}</Text>
            </ScrollView>
            {/* 文字内容-end */}
          </View>
          {/* 四个信息模块-start */}
          <Text style={{fontSize:pxToDp(17),position:'absolute',
            top:'45.5%',left:'5%',color:'#DDD'}}>外向 {testRet.extroversion}%</Text>
          <Text style={{fontSize:pxToDp(17),position:'absolute',
          top:'51.8%',left:'5%',color:'#DDD'}}>判断 {testRet.judgment}%</Text>
          <Text style={{fontSize:pxToDp(17),position:'absolute',
          top:'58.2%',left:'5%',color:'#DDD'}}>抽象 {testRet.abstract}%</Text>
          <Text style={{fontSize:pxToDp(17),position:'absolute',
          top:'45.8%',right:'6%',color:'#DDD'}}>抽象 {testRet.abstract}%</Text>
          {/* 四个信息模块-end */}
          <Text style={{position:'absolute',top:'68.8%',left:'3.5%',color:'#EEE',
          fontSize:pxToDp(18),letterSpacing:pxToDp(5)}}>与你相似</Text>
          {/* 相似列表-start */}
          <View style={{position:'absolute',top:'74%',left:'5%',flexDirection:'row'}}>
            <TouchableOpacity style={{width:pxToDp(50),height:pxToDp(50),
              borderRadius:pxToDp(25),overflow:'hidden',marginRight:pxToDp(15)}}>
              <Image source={{uri:BASE_URI+testRet.currentUser.header}} style={{width:'100%',
                height:'100%'}} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:pxToDp(50),height:pxToDp(50),
              borderRadius:pxToDp(25),overflow:'hidden',marginRight:pxToDp(15)}}>
              <Image source={{uri:BASE_URI+testRet.currentUser.header}} style={{width:'100%',
                height:'100%'}} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:pxToDp(50),height:pxToDp(50),
              borderRadius:pxToDp(25),overflow:'hidden',marginRight:pxToDp(15)}}>
              <Image source={{uri:BASE_URI+testRet.currentUser.header}} style={{width:'100%',
                height:'100%'}} />
            </TouchableOpacity>
            <TouchableOpacity style={{width:pxToDp(50),height:pxToDp(50),
              borderRadius:pxToDp(25),overflow:'hidden',marginRight:pxToDp(15)}}>
              <Image source={{uri:BASE_URI+testRet.currentUser.header}} style={{width:'100%',
                height:'100%'}} />
            </TouchableOpacity>
          </View>
          {/* 相似列表-end */}
        </ImageBackground>
      </ImageBackground>
    );
  }
}

export default index;
