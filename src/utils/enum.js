// 渠道价格折扣方式
export const channelPriceType = {
  "0": "固定价格",
  "1": "比例折扣"
};
// 企业列表企业认证状态
export const certificationStatusEnum = {
  0: "已认证",
  1: "未认证"
};
// 企业列表企业状态
export const corporationStatusEnum = {
  0: "正常",
  1: "冻结"
};
// 控制台-云服务器-状态
export const runningStatusEnum = {
  "-1": "退订",
  0: "创建中",
  1: "运行中",
  2: "已停止",
  3: "已过期",
  4: "停止中",
  5: "启动中"
};
// 用于下拉选择的渲染
export const runningStatusSelect = {
  0: "创建中",
  1: "运行中",
  2: "已停止",
  3: "已过期"
};
// 订单状态
export const orderStatus = {
  "-1": "交易关闭",
  "1": "订单待支付",
  "5": "交易完成",
  "-3": "服务器创建异常",
  0: "支付失败"
};
// 降费续配
export const feeReduction = {
  1: "资源池新购",
  5: "阿里云采购",
  15: "资源池续费",
  16: "阿里云续费",
  25: "资源池升配",
  26: "阿里云升配",
  35: "资源池降配",
  36: "阿里云降配",
  55: "服务器退订",
  65:'CDN流量',
  66:"阿里云采购CDN流量"
};
// 权限管理-权限单选map
export const systemAdminMapEnum = {
  MENU: "一级菜单",
  DATA: "二级菜单",
  BUTTON: "三级菜单"
};
// 订单来源/用途
export const tradeTypeEnum = {
  1: "云服务新购",
  15: "云服务续费",
  25: "云服务升配",
  35: "资源池降配",
  36: "阿里云降配",
  45: "交易关闭",
  55: "服务器退订"
};
// 工单状态
export const workOrderStatusEnum = {
  1: "待接单",
  2: "接单处理中",
  3: "处理完成"
};
// 工单类别-所属分组map
export const workOrderGroupEnum = {
  1: "技术类问题",
  2: "账户和财务类",
  3: "其他咨询类"
};
// 工单类别-问题类型map
export const workOrderTypeEnum = {
  1: "普通类型工单",
  2: "可转接资源池类型工单"
};
// 地域列表map
export const regionDataEnum = {
  "cn-qingdao": "华北1（青岛）",
  "cn-beijing": "华北2（北京）",
  "cn-zhangjiakou": "华北3（张家口）",
  "cn-huhehaote": "华北5（呼和浩特）",
  "cn-wulanchabu": "华北6（乌兰察布）",
  "cn-hangzhou": "华东1（杭州）",
  "cn-shanghai": "华东2（上海）",
  "cn-shenzhen": "华南1（深圳）",
  "cn-heyuan": "华南2（河源）",
  "cn-guangzhou": "华南3（广州）",
  "cn-chengdu": "西南1（成都）",
  "cn-hongkong": "中国（香港）",
  "ap-northeast-1": "日本（东京）",
  "ap-northeast-2": "韩国（首尔）",
  "ap-southeast-1": "新加坡",
  "ap-southeast-2": "澳大利亚（悉尼）",
  "ap-southeast-3": "马来西亚（吉隆坡）",
  "ap-southeast-6": "菲律宾（马尼拉）",
  "ap-southeast-5": "印度尼西亚（雅加达）",
  "ap-south-1": "印度（孟买）",
  "ap-southeast-7": "泰国（曼谷）",
  "us-east-1": "美国（弗吉尼亚）",
  "us-west-1": "美国（硅谷）",
  "eu-west-1": "英国（伦敦）",
  "me-east-1": "阿联酋（迪拜）",
  "eu-central-1": "德国（法兰克福）"
};

//cdn状态
export const cdnStatus = {
  0: "校验域名",
  1: "正常运行",
  2: "停用",
  3: "配置中",
  4: "配置失败",
  5: "正在审核",
  6: "审核失败",
  '-1':'已下线',
  '-2':'已下线'
};
//提现申请状态
export const applyStatus = {
  0: "草稿",
  1: "已完成",
  2: "已提交",
  3: "已驳回",
  4: "已取消",
  5: "待处理"
};
//提现申请状态1
export const applyMenStatus = {
  1: "已完成",
  2: "已提交",
  3: "已驳回",
  4: "已取消",
  5: "待处理"
};
// 订单状态
export const orderStatusEnum = {
  "-3": "操作服务器异常",
  "-1": "交易关闭",
  1: "待支付",
  3: "支付中",
  5: "交易完成"
};
export const orderTypeMap = {
  1: "云服务新购",
  15: "云服务续费",
  25: "云服务升配",
  35: "云服务降配",
  55: "服务器退订"
};