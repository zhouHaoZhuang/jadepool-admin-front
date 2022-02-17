// 渠道价格折扣方式
export const channelPriceType = {
  "0": "固定价格",
  "1": "比例折扣",
};
// 企业列表企业认证状态
export const certificationStatusEnum = {
  0: "已认证",
  1: "未认证",
};
// 企业列表企业状态
export const corporationStatusEnum = {
  0: "正常",
  1: "冻结",
};
// 控制台-云服务器-状态
export const runningStatusEnum = {
  0: "创建中",
  1: "运行中",
  2: "已停止",
  3: "已过期",
  4: "停止中",
  5: "启动中",
};
// 用于下拉选择的渲染
export const runningStatusSelect = {
  0: "创建中",
  1: "运行中",
  2: "已停止",
  3: "已过期",
};
// 降费续配
export const feeReduction = {
  1: "资源池新购",
  5: "阿里云采购",
  15: "资源池续费",
  16: "阿里云续费",
  25: "资源池升配",
  26: "阿里云升配",
};
// 订单状态
export const orderStatus = {
  '-1': '交易关闭',
  '1': '订单待支付',
  '5': '交易完成',
  '-3': '服务器创建异常',
}
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
  35: "云服务降配",
  45: "交易关闭"
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
