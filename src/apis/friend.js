/**
 *  朋友界面的请求方法
 */

import {privateRequester} from './requesters';
import {FRIENDS_VISITORS,FRIENDS_TODAYBEST,FRIENDS_RECOMMEND,FRIENDS_CARDS,
  FRIENDS_LIKE,FRIENDS_SEARCH,FRIENDS_QUESTIONS,FRIENDS_QUESTIONSECTION,
  FRIENDS_QUESTIONANS, FRIENDS_PERSONALINFO} from './pathMap';

export default{
  reqVisitors: () => privateRequester.get(FRIENDS_VISITORS),
  reqPerfectGrils: () => privateRequester.get(FRIENDS_TODAYBEST),
  reqRecommands: (params) => privateRequester.get(FRIENDS_RECOMMEND,{params}),
  reqFriendCards: (params) => privateRequester.get(FRIENDS_CARDS,{params}),
  sendFriendLike: (id,type) => privateRequester.get(FRIENDS_LIKE.replace(':id',id).replace(':type',type)),
  reqNears: (params) => privateRequester.get(FRIENDS_SEARCH,{params}),
  reqQuestions: () => privateRequester.get(FRIENDS_QUESTIONS),
  reqQuestionSection: (id) => privateRequester.get(FRIENDS_QUESTIONSECTION.replace(':id',id)),
  getQuestionAnswer: (id,answers) => privateRequester.post(FRIENDS_QUESTIONANS.replace(':id',id), {answers}),
  reqPersonalInfo: (id) => privateRequester.get(FRIENDS_PERSONALINFO.replace(':id',id), {id})
}
