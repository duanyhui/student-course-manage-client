<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">

      <el-table-column

          prop="cno"
          label="课程号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="tname"
          label="教师名"
          width="100">
      </el-table-column>
      <el-table-column

          prop="sno"
          label="学号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="学生名"
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
<!--          <el-popconfirm-->
<!--              confirm-button-text='删除'-->
<!--              cancel-button-text='取消'-->
<!--              icon="el-icon-info"-->
<!--              icon-color="red"-->
<!--              title="删除不可复原"-->
<!--              @confirm="deleteTeacher(scope.row)"-->
<!--          >-->
<!--            <el-button slot="reference" type="text" size="small">删除</el-button>-->
<!--          </el-popconfirm>-->
          <el-button @click="editor(scope.row)" type="text" size="small">编辑成绩</el-button>
        </template>
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
  </div>
</template>

<script>
import {getStudentClassList_Admin} from "@/api/utils";

export default {
  methods: {
    select(row) {
      console.log(row)
    },

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
        path: '/editorGradeCourse',
        query: {
          ctid:row.ctid,
          cno: row.cno,
          tno: row.tno,
          sno: row.sno,
          term: row.term,
          sname:row.sname,
          cname:row.cname,
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
        getStudentClassList_Admin(newRuleForm.sname,newRuleForm.tname,newRuleForm.cname).then(function (resp) {
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