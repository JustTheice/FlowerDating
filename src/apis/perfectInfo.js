/**
 *    完善界面的请求方法
 */

import {privateRequester} from './requesters';
import {ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO} from './pathMap';
import RootStore from '../mobx';

export default {
  //上传头像
  uploadAvatar: (postData={},options={}) => privateRequester.post(ACCOUNT_CHECKHEADIMAGE,postData,{
    // ...options,
    headers:{
      ...options.headers,
      "Content-Type": "multipart/form-data"
    }
  }),
  uploadUserInfo: (postData={},options={}) => privateRequester.post(ACCOUNT_REGINFO,postData,{
    headers:{
      ...options.headers
    }
  })
}
