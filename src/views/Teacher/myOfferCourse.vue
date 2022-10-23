<template>
  <div>
    <el-container>
      <el-main>
        <h1>当前学期开设的课程</h1>
        <el-card>
          <el-table
              :data="tableData"
              stripe
              style="width: 100%">
            <el-table-column
                prop="cname"
                label="课程名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="ccredit"
                label="学分"
                width="150">
            </el-table-column>
            <el-table-column
                prop="classtime"
                label="上课时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="capacity"
                label="容量"
                width="150">
            </el-table-column>
            <el-table-column
                prop="capacityable"
                label="可选容量容量"
                width="150">
            </el-table-column>
          </el-table>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              @current-change="changePage"
          >
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {getClassListByTno} from "@/api/utils";

export default {
  methods: {
    changePage(page) {
      page = page - 1
      const that = this
      let start = page * that.pageSize, end = that.pageSize * (page + 1)
      let length = that.tmpList.length
      let ans = (end < length) ? end : length
      that.tableData = that.tmpList.slice(start, ans)
    },
  },

  data() {
    return {
      tableData: null,
      pageSize: 10,
      total: null,
      tmpList: null,
      tno: null,

    }
  },
  created() {
    this.tno = sessionStorage.getItem("tno");
    const tno=this.tno;
    const that = this
    getClassListByTno(that.$store.state.tno).then(function (resp) {
      console.log(resp.data)
      that.tmpList = resp.data.data
      that.total = resp.data.length
      let start = 0, end = that.pageSize
      let length = that.tmpList.length
      let ans = (end < length) ? end : length
      that.tableData = that.tmpList.slice(start, ans)

    })

  }

}
</script>