<template>
  <div>
    <div class="enterprise-list-detail">
      <div class="tabs-content">
        <div class="bot-content">
          <div class="item">
            <div class="label">ID:</div>
            <div class="value">11111</div>
          </div>
          <div class="item">
            <div class="label">姓名:</div>
            <div class="value"></div>
          </div>
          <div class="item">
            <div class="label">角色权限：</div>
            <div class="value"></div>
          </div>
          <div class="item">
            <div class="label">手机：</div>
            <div class="value"></div>
          </div>
          <div class="item">
            <div class="label">邮箱：</div>
            <div class="value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .bot-content {
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding-top: 25px;
      }
    }
  }
}
</style>
