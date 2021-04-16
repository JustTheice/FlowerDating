import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
class Geo {
  async initGeo() {
    if (Platform.OS === "android") {
      var ret = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      console.log('定位权限',ret)
      if(ret!='granted'){
        return Promise.reject('无法获取定位权限');
      }
    }
    await init({
      ios: "dacd0f7ddcc4e1b1da8131287bdefb8b",
      android: "dacd0f7ddcc4e1b1da8131287bdefb8b"
    });
    // return Promise.resolve();
    return Promise.resolve('初始化成功');
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, reject);
    })
  }
  async getCityByLocation() {
    const { longitude, latitude } = await this.getCurrentPosition();
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      params: { location: `${longitude},${latitude}`, key: "46bc1e987d39426e7a71b337c5080066", }
    });
    return Promise.resolve(res.data);
  }
}


export default new Geo();