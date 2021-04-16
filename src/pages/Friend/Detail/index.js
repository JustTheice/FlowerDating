import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Modal } from 'react-native';
import {Carousel} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';

import friendApi from '../../../apis/friend';
import {pxToDp, screenHeight, screenWidth} from '../../../utils/phoneConvertUtil';
import IconFont from '../../../components/IconFont/IconFont';
import { TouchableOpacity } from 'react-native';

const dList = [
  {
    message: '怎么这样子，雨还没停你就撑伞要走',
    imgs: [require('./img/zz.jpg'),require('./img/bdkj.jpg')]
  },
  {
    message: '已经习惯不去阻止你过好一阵子你就会回来\n印象中的爱情好像抵不住那时间',
    imgs: [require('./img/zz.jpg'),require('./img/bdkj.jpg'),require('./img/bdkj.jpg')]
  },
  {
    message: '所以你弃权',
    imgs: [require('./img/zz.jpg'),require('./img/bdkj.jpg')]
  }
];
class index extends Component {
  state={
    isShowAlbum:false,
    albumImgArr:[],
    albumImgIndex: 0
  }
  async componentDidMount(){
    let ret = await friendApi.reqPersonalInfo(9);
    console.log(ret)
  }
  showAlbum = (listIndex, albumImgIndex) => {
    // console.log('点击了图片',listIndex,imgIndex)
    this.setState({
      albumImgArr:dList[listIndex].imgs.map((source) => ({props:{source}})),
      albumImgIndex, isShowAlbum:true
    });
  }
  render() {
    const {isShowAlbum} = this.state;
    return (
      <HeaderImageScrollView
        maxHeight={pxToDp(238)}
        minHeight={pxToDp(44)}
        renderForeground={() => (
          <Carousel control interval={5000} style={{height: pxToDp(238),width:'100%'}}>
            <Image style={{width: '100%', height: pxToDp(238)}} resizeMode='cover' source={require('./img/scenery1.jpg')} />
            <Image style={{width: '100%', height: pxToDp(238)}} resizeMode='cover' source={require('./img/scenery2.jpg')} />
            <Image style={{width: '100%', height: pxToDp(238)}} resizeMode='cover' source={require('./img/scenery3.jpg')} />
          </Carousel>
        )}>
        <View style={{}}>
        {/* 个人信息面板-start */}
        <View style={{paddingVertical:pxToDp(12),borderBottomColor:'#DDD',
          borderBottomWidth:pxToDp(5),flexDirection:'row',paddingHorizontal:pxToDp(10)}}>
          <View style={{flex:3,justifyContent:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#444',fontSize:pxToDp(18)}}>查无此人</Text>
              
              <IconFont style={{color:'#F0A0A0',marginHorizontal:pxToDp(2),
              fontSize:pxToDp(18)}} name={'icontanhuanan'} />
              <Text style={{marginLeft:pxToDp(5),fontSize:pxToDp(15),
                color:'#666'}}>25</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:pxToDp(7)}}>
              <Text style={{color:'#555',fontSize:pxToDp(14)}}>未婚&nbsp;|&nbsp;大学&nbsp;|&nbsp;年龄相仿</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{position:'relative'}}>
              <Text style={{position:'absolute',zIndex:9,top:pxToDp(17.5),left:pxToDp(17.5),
                color:'#FBFBFB'}}>25</Text>
              <IconFont name="iconxihuan" style={{color:'#F03030',fontSize:pxToDp(50)}} />
            </View>
            <Text style={{color:'#F04040',marginTop:pxToDp(-5),fontSize:pxToDp(12)}}>缘分值</Text>
          </View>
        </View>
        {/* 个人信息面板-end */}
        {/* 动态-start */}
        <View style={{paddingHorizontal:pxToDp(12),paddingVertical:pxToDp(5)}}>
          {/* 动态头部-start */}
          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:pxToDp(6),
            justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'#555',fontSize:pxToDp(16)}}>动态</Text>
              <Text style={{color:'white',backgroundColor:'red',width:pxToDp(16),
                height:pxToDp(16),borderRadius:pxToDp(10),marginLeft:pxToDp(2),
                textAlign:'center',lineHeight:pxToDp(15)}}>3</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity>
                <LinearGradient colors={['#F1A558','#EC7C50']} 
                  start={{x:0,y:0}} end={{x:1,y:0}} style={{
                  width:pxToDp(100),height:pxToDp(40),flexDirection:'row',
                  justifyContent:'center',alignItems:'center',borderRadius:pxToDp(20)
                }}>
                  <IconFont name="iconliaotian" style={{fontSize:pxToDp(16),color:'#FFF'}} />
                  <Text style={{color:'#FFF',fontSize:pxToDp(16),marginLeft:pxToDp(4)}}>聊一下</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:pxToDp(8)}}>
                <LinearGradient colors={['#7149F8','#E88799']} 
                  start={{x:0,y:0}} end={{x:1,y:0}} style={{
                  width:pxToDp(100),height:pxToDp(40),flexDirection:'row',
                  justifyContent:'center',alignItems:'center',borderRadius:pxToDp(20)
                }}>
                  <IconFont name="iconxihuan" style={{fontSize:pxToDp(16),color:'#FFF'}} />
                  <Text style={{color:'#FFF',fontSize:pxToDp(16),marginLeft:pxToDp(4)}}>喜欢</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {/* 动态头部-end */}
          {/* 动态列表-start */}
          <View>
            {dList.map((d,i) => (
              <View key={i} style={{paddingVertical:pxToDp(10),
                borderTopColor:'#333',borderTopWidth:pxToDp(0.2)}}>
                <View style={{flexDirection:'row',paddingBottom:pxToDp(5),alignItems:'center'}}>
                  <Image source={require('../home/img/ywy.jpg')} style={{width:pxToDp(50),
                    height:pxToDp(50),borderRadius:pxToDp(30)}} />
                  <View style={{paddingVertical:pxToDp(5),paddingHorizontal:pxToDp(10)}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={{color:'#444',fontSize:pxToDp(16)}}>查无此人</Text>
                      
                      <IconFont style={{color:'#F0A0A0',marginHorizontal:pxToDp(2),
                      fontSize:pxToDp(18)}} name={'icontanhuanan'} />
                      <Text style={{marginLeft:pxToDp(5),fontSize:pxToDp(15),
                        color:'#666'}}>25</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:pxToDp(5)}}>
                      <Text style={{color:'#555',fontSize:pxToDp(14)}}>未婚&nbsp;|&nbsp;大学&nbsp;|&nbsp;年龄相仿</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:pxToDp(16),color:'#222'}}>{d.message}</Text>
                  <View style={{flexDirection:'row',marginTop:pxToDp(5)}}>
                    {d.imgs.map((img,imgIndex) => (
                      <TouchableOpacity onPress={this.showAlbum.bind(this,i,imgIndex)} key={imgIndex}
                        style={{paddingRight:pxToDp(3)}}>
                        <Image style={{height:pxToDp(100),width:pxToDp(100)}} source={img} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
          {/* 动态列表-end */}
        </View>
        {/* 动态-end */}
        </View>
        <Modal visible={isShowAlbum} transparent={true}>
          <ImageViewer onClick={() => this.setState({isShowAlbum:false})} imageUrls={dList[0].imgs.map((img)=>({props:{source:img}}))} index={0}/>
        </Modal>
        </HeaderImageScrollView>
    );
  }
}

export default index;
