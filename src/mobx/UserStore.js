import {observable, action, makeObservable} from 'mobx';

class UserInfo {
  @observable user = {
    header: "/upload/18665711978.png",
    nick_name: 'JustThesun'
  }

  @action setUser(user){
    this.user = user;
  }
  @action clearUser(){
    this.user = {};
  }
}

export default new UserInfo();