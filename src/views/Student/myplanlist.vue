<template>
  <el-table
      :data="tableData"
      border
      style="width: 60%">
    <el-table-column
        prop="cname"
        label="课程名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ccredit"
        label="学分"
        width="180">
    </el-table-column>
    <el-table-column
        prop="type"
        label="类型">
    </el-table-column>

  </el-table>



</template>

<script>

import {getPlanListBySno} from "@/api/utils";
import SearchTable from "@/components/searchTable/searchTable";

export default {
  name: "index",
  components: {SearchTable},

  data() {
    return {
      tableData:[]
    }
  },
  created() {
    getPlanListBySno(sessionStorage.getItem("sno")).then(res => {
      if (res.data.code === 200) {
        this.tableData = res.data.data;
      }
      else {
        this.$message.error(res.data.msg);
      }
    })
  }

}
</script>

<style scoped>

</style>