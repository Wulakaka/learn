<template>
  <div class="bs-table">
    <TslTable :data="tableList" tsl theme="dark" height="400" stripe>
      <TslTableColumn type="selection" fixed />
      <TslTableColumn type="index" />
      <TslTableColumn prop="name" label="姓名" show-overflow-tooltip />
      <TslTableColumn
        prop="age"
        label="年龄"
        sortable
        :filters="testFilter"
        :filter-method="() => {}"
      />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" fixed="right" />
    </TslTable>
  </div>
</template>

<script>
export default {
  name: "TestTable",
  data() {
    return {
      tableList: [
        { name: "的说法是法师法萨芬水电费水电费是地方撒放地方撒发", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
      ],
      testFilter: [
        { text: "张三11111111111111", value: "张三1" },
        { text: "张三222222222222222", value: "张三2" },
      ],
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
