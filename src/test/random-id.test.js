// 生成随机id
let str = (Math.random() * 256).toString(21)
console.log(str.substring(str.indexOf('.')+1))
