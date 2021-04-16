//  像稿宽度 / 像稿中元素宽度(px) = 手机宽度 / 手机中元素宽度(dp)
//  手机中元素宽度 = 手机宽度 * 像稿中元素宽度 / 像稿宽度
import {Dimensions } from "react-native";

export const pxToDp = pxWidth => screenWidth * pxWidth / 375;
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;