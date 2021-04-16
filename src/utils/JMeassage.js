import JMessage from "jmessage-react-plugin";
export default{
  init(){ //极光初始化
    JMessage.init({
      'appkey': '3d14c81beda4358dcd258b81',
      'isOpenMessageRoaming': true,
      'isProduction': false,
      'channel': ''
    })
    JMessage.setDebugMode({enable: true});
  },
  //注册
  register(username,password){
    return new Promise((reslove,reject) => {
      JMessage.register({
        username,
        password
      }, reslove, reject); //如果成功的话，调用reslove，失败调用reject，以便进入.then
    });
  },
  //登陆
  login(username,password){
    return new Promise((reslove,reject) => {
      JMessage.login({
        username,
        password
      }, reslove, reject); //如果成功的话，调用reslove，失败调用reject，以便进入.then
    });
  }
}



