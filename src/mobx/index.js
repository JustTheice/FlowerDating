import { observable, action, makeObservable } from "mobx";

class RootStore {
  
  @observable isInitGeo = false;
  @action setState(key, value) {
    this[key] = value;
  }

  //用户信息
  // @observable phoneNumber = '13345677654';
  @observable phoneNumber = '';

  // @observable userId = '133456776541613225195842';
  @observable userId = '';

  // @observable token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA1OCwibmFtZSI6IjEzMzQ1Njc3NjU0IiwiaWF0IjoxNjE0NDg0NTE1LCJleHAiOjE2NDA0MDQ1MTV9.BaC3BRQv73KT_Or6qpWoOtlXrOY30Elz5wjJM8cmzPw';
  @observable token = '';
  
  @action setUserInfo(userObj={}){
    for (let key in userObj) {
      if(key==='phoneNumber' || key==='userId' || key==='token')  this[key] = userObj[key];
    }
  }
  constructor(){
    makeObservable(this,{
      isInitGeo:observable,
      setState:action
    })
  }
}

export default new RootStore();