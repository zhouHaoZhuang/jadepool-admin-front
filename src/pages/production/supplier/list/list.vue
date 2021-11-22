<template>
  <div>
    <!-- 头信息 -->
    <div class="box-wrap">
      <div class="btn1">
        <a-button type="primary">+ 新建供应商</a-button>
      </div>
      <div class="xiala">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user" />1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user" />2nd menu item
            </a-menu-item>
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            供应商ID <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <div class="inpu">
        <a-input placeholder="搜索关键字" />
      </div>
      <div class="btn2">
        <a-button type="primary">查询</a-button>
      </div>
      <!-- 表单 -->
      <div class="biao">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '供应商ID',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    width:100
  },
  {
    title: '全称',
    dataIndex: 'age',
    key: 'age',
    width: 200,
  },
  {
    title: '简称',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
    width:80,
  },
  {
    title: '网址',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
  {
    title:'操作',
    dataIndex:'address',
    key:'address 5',
    ellipsis:true
  }
];

const data = [
  {
    key: '1',
    name: 'S00001',
    age: '阿里云计算有限公司',
    address: '阿里云',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'S00001',
    age: '阿里云计算有限公司',
    address: '阿里云',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'S00001',
    age: '阿里云计算有限公司',
    address: '阿里云',
    tags: ['cool', 'teacher'],
  },
];
export default {
  name: "index",
  data() {
    return {
      data,columns,
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.box-wrap {
  width: 1220px;
  height: 615px;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  .btn1 {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .xiala {
    position: absolute;
    top: 15px;
    left: 180px;
  }
  .inpu {
    position: absolute;
    top: 15px;
    left: 310px;
  }
  .btn2 {
    position: absolute;
    top: 15px;
    left: 510px;
  }
  .biao {
    position: absolute;
    top: 60px;
    left: 15px;
  }
}
</style>
