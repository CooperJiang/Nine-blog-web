/**
 * @description 常规正则校验表达式
 */
export const validatorsExp = {
  number: /^[0-9]*$/,
  nameLength: (n, m) => new RegExp(`^[\\u4E00-\\u9FA5]{${n},${m}}$`),
  idCard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  backCard: /^([1-9]{1})(\d{15}|\d{18})$/,
  phone: /^1[23456789]\d{9}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
}

/**
 * @description 常规正则校验方法
 */
export const validatorsFun = {
  number: (val) => validatorsExp.number.test(val),
  idCard: (val) => validatorsExp.idCard.test(val),
  backCard: (val) => validatorsExp.backCard.test(val)
}

/**
 * @description 表单校验
 */
export const validatorsFrom = {
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  naturalNumberMsg: '请输入自然数',
  // 英文
  english: /^.[A-Za-z]+$/,
  englishMsg: '请输入英文字符',
  // 座机
  telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  telephoneMsg: '请输入正确的座机号',
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  bankCardMsg: '请输入正确的银行卡号码',
  // 证件号码
  IDNumber: /^[a-z0-9A-Z]{0,50}$/,
  IDNumberMsg: '请输入正确的证件号码',
  // 身份证号码,包括15位和18位的
  IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  IDCardMsg: '请输入正确的身份证号码',
  // QQ号码
  qq: /^[1-9]\d{4,11}$/,
  qqMsg: '请输入正确的QQ号码',
  // 网址, 仅支持http和https开头的
  url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
  urlMsg: '请输入以http和https开头的网址',
  // 0到20位的英文字符和数字
  enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
  enNum0to20Msg: '请输入20位以内的英文字符和数字',
  // 2到100位的中英文字符和空格
  cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
  cnEnSpace2to100Msg: '请输入2到100位的中英文字符和空格',
  // 数字和换行符
  numLinefeed: /^[0-9\n*]+$/,
  numLinefeedMsg: '请输入数字和换行符',
  // 255位以内的字符
  char0to255: /^.{0,255}$/,
  char0to255Msg: '请输入255位以内的字符'
}
