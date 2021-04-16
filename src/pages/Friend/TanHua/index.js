import React, { Component } from 'react';
import {View,Text,StatusBar,ImageBackground,StyleSheet, Image,TouchableOpacity} from 'react-native';
import THheader from '../../../components/THheader/THheader';
import Swiper from 'react-native-deck-swiper';
import {pxToDp} from '../../../utils/phoneConvertUtil';
import friendApi from '../../../apis/friend';
import { BASE_URI } from '../../../apis/pathMap';
import IconFont from '../../../components/IconFont/IconFont';
import {Toast} from 'teaset';

class index extends Component {
  state = {
    params: {
      page: 1,
      pagesize: 5,
      pages: 50
    },
    cards:[],
    cardIndex:0
  }
  swiperEl = React.createRef()
  componentDidMount(){
    this.reqFriendCards();
  }
  setLike = (type) => { //点击喜欢/不喜欢
    this.swiperEl.current['swipe'+(type=='like'?'Right':'Left')]();
  }
  swipeLike = async (type) => { //发送喜欢/不喜欢
    const {cards,cardIndex} = this.state;
    let ret = await friendApi.sendFriendLike(cards[cardIndex].id, type);
    Toast.message(ret.data,1000,'center');
  }
  swipedAll = async () => { //滑动完一组
    let {params:{page,pages}} = this.state;
    if(++page > pages){
      return Toast.message('没有美女了', 3000, 'center');
    }
    this.reqFriendCards(page);
  }
  reqFriendCards = async(reqPage=1) => { //请求卡片列表
    let ret = await friendApi.reqFriendCards({...this.state.params,page:reqPage});
    const {data,page,pagesize,pages} = ret;
    console.log(ret)
    this.setState({cards:[...this.state.cards,...data], params:{page,pagesize,pages}});
  }
  render() {
    const {cards,cardIndex} = this.state;
    return (
      <View>
        <THheader title='探花' />
        <ImageBackground source={require('./img/testsoul_bg.png')}
          style={{width:'100%',height:'68%',alignItems:'center'}} imageStyle={{height:'100%'}}
        >
        {/* 卡片-start */}
        <View style={styles.container}>
          <Swiper key={cardIndex} ref={this.swiperEl}
            cards={cards}
            renderCard={(card) => {
              if(!cards[cardIndex]){
                return <></>;
              }
              return (
                <View style={styles.card}>
                  <Image source={{uri:BASE_URI+card.header}} style={{
                    width:'100%',height:'80%'
                  }} />
                  {/* 信息-start */}
                  <View style={{paddingVertical:pxToDp(12),height:'20%',marginTop:pxToDp(5),
                    alignItems:'center',justifyContent:'center',paddingHorizontal:pxToDp(10)}}>
                    <View style={{flex:3}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#444',fontSize:pxToDp(18)}}>{card.nick_name}</Text>
                        <IconFont style={{color:card.gender=='男'?'#20A0F0':'#F0A0A0',marginHorizontal:pxToDp(2),
                        fontSize:pxToDp(18)}} name={card.gender=='男'?'icontanhuanan':'icontanhuanv'} />
                        <Text style={{marginLeft:pxToDp(5),fontSize:pxToDp(15),
                          color:'#666'}}>{card.age}</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center',marginTop:pxToDp(7)}}>
                        <Text style={{color:'#555',fontSize:pxToDp(14)}}>{card.marry}&nbsp;|&nbsp;{card.xueli}&nbsp;|&nbsp;年龄相仿</Text>
                      </View>
                    </View>
                  </View>
                  {/* 信息-end */}
                </View>
              )
            }}
            onSwiped={() => {
              this.setState({cardIndex:cardIndex+1});
            }}
            onSwipedLeft={this.swipeLike.bind(this,'dislike')} 
            onSwipedRight={this.swipeLike.bind(this,'like')}
            onSwipedAll={this.swipedAll}
            cardIndex={cardIndex} stackSeparation={pxToDp(-13)}
            backgroundColor={'transparent'}
            cardVerticalMargin={pxToDp(25)}
            stackSize={3}>
          </Swiper>
        </View>
        {/* 卡片-end */}
        </ImageBackground>
        <View style={{flexDirection:'row',marginTop:pxToDp(50),width:'65%',
          justifyContent:'space-between',alignSelf:'center'}}>
          <TouchableOpacity style={{width:pxToDp(66),height:pxToDp(66),
            backgroundColor:'#EBC869',borderRadius:pxToDp(33),alignItems:'center',
            justifyContent:'center'}} onPress={this.setLike.bind(this,'dislike')}>
            <IconFont name="iconbuxihuan" style={{color:'white',fontSize:pxToDp(40)}} />
          </TouchableOpacity>
          <TouchableOpacity style={{width:pxToDp(66),height:pxToDp(66),
            backgroundColor:'#FE5214',borderRadius:pxToDp(33),alignItems:'center',
            justifyContent:'center'}} onPress={this.setLike.bind(this,'like')}>
            <IconFont name="iconxihuan" style={{color:'white',fontSize:pxToDp(40)}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex:1,width:'100%',alignItems:'center'
  },
  card: {
    height: '70%',
    borderRadius: pxToDp(4),
    borderWidth: pxToDp(2),
    borderColor: "#E8E8E8",
    // justifyContent: "center",
    backgroundColor: "white",
    marginTop:0
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default index;
