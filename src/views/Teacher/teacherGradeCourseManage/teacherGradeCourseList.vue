<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column
          prop="cname"
          label="课程名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="classtime"
          label="上课时间"
          width="150">
      </el-table-column>
      <el-table-column

          prop="sno"
          label="学号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="学生姓名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="成绩"
          width="100">
      </el-table-column>

      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="editor(scope.row)" type="text" size="small">编辑成绩</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <p>-->
<!--      平均成绩：{{ avg }}-->
<!--    </p>-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import {getStudentClassList} from "@/api/utils";

export default {
  methods: {
    // select(row) {
    //   console.log(row)
    // },
    changePage(page) {
      page = page - 1
      const that = this
      let start = page * that.pageSize, end = that.pageSize * (page + 1)
      let length = that.tmpList.length
      let ans = (end < length) ? end : length
      that.tableData = that.tmpList.slice(start, ans)
    },
    editor(row) {
      this.$router.push({
        path: '/teacherEditorGradeCourse',
        query: {
          sno: row.sno,
          ctid:row.ctid,
          cname:row.cname,
          sname:row.sname,
        }
      })
    }
  },
  data() {
    return {
      tableData: null,
      pageSize: 10,
      total: null,
      tmpList: null,
      avg: 0,
    }
  },
  props: {
    ruleForm: Object,
  },
  watch: {
    ruleForm: {
      handler(newRuleForm, oldRuleForm) {
        console.log("组件监听 form")
        console.log(newRuleForm)
        const that = this
        that.tmpList = null
        that.total = null
        that.tableData = null
        getStudentClassList(sessionStorage.getItem("no"),newRuleForm.cname,newRuleForm.sname).then(function (resp) {
          console.log("查询结果:");
          console.log(resp)
          that.tmpList = resp.data.data
          that.total = resp.data.length
          let start = 0, end = that.pageSize
          let length = that.tmpList.length
          let ans = (end < length) ? end : length
          that.tableData = that.tmpList.slice(start, ans)
        })
      },
      deep: true,
      immediate: true
    }
  },
}
</script>