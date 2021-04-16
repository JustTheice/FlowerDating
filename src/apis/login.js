/**
 *  登录界面的请求方法
 */
import {loginRequester} from './requesters';
import {ACCOUNT_LOGIN,ACCOUNT_VALIDATEVCODE} from './pathMap';

export default {
  reqPinCode: (postData) => loginRequester.post(ACCOUNT_LOGIN, postData),
  confirmPinCode: (postData) => loginRequester.post(ACCOUNT_VALIDATEVCODE, postData),

}