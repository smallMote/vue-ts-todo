export let createRandomStr = (): string => {
  const str: string = (Math.random() * 256).toString(21)
  return str.substring(str.indexOf('.') + 1)
};


/**
 * 分割数组创建二维数组封装
 * @param arr 数组
 * @param senArrLen 需要分割成子数组的长度
 */
export let splitArr = (arr , senArrLen)=> {
  //处理成len个一组的数据
  let arr_len = arr.length;
  let arrOuter_len = arr_len % senArrLen === 0 ? arr_len / senArrLen : parseInt((arr_len / senArrLen) + '') + 1;
  let arrSec_len = arr_len > senArrLen ? senArrLen : arr_len;//内层数组的长度
  let arrOuter = new Array(arrOuter_len);//最外层数组
  let arrOuter_index = 0;//外层数组的子元素下标
  // console.log(arr_len % len);
  for (let i = 0; i < arr_len; i++) {
    if (i % senArrLen === 0) {
      arrOuter_index++;
      let len = arrSec_len * arrOuter_index;
      //将内层数组的长度最小取决于数据长度对len取余，平时最内层由下面赋值决定
      arrOuter[arrOuter_index - 1] = new Array(arr_len % senArrLen);
      if (arrOuter_index === arrOuter_len)//最后一组
        arr_len % senArrLen === 0 ?
          len = arr_len % senArrLen + senArrLen * arrOuter_index :
          len = arr_len % senArrLen + senArrLen * (arrOuter_index - 1);
      let arrSec_index = 0;//第二层数组的索引
      for (let k = i; k < len; k++) {//第一层数组的开始取决于第二层数组长度*当前第一层的索引
        arrOuter[arrOuter_index - 1][arrSec_index] = arr[k];
        arrSec_index++;
      }
    }
  }
  return arrOuter
};
