<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column
          fixed
          prop="cno"
          label="课程号"
          width="150">
      </el-table-column>
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
          prop="type"
          label="课程类型"
          width="150">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='删除'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="删除不可复原"
              @confirm="deleteCourse(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
          <el-button @click="editor(scope.row)" type="text" size="small">编辑</el-button>
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
export default {
  methods: {
    select(row) {
      console.log(row)
    },
    deleteCourse(row) {
      const that = this
      axios.post('course/deleteByCno/' + row.cno).then(function (resp) {

        if (resp.data.code === 200) {//200代表操作执行成功
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'success'
          });
          window.location.reload()
        }
        else {
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'error'
          });
        }
      })
      //     .catch(function (error) {
      //   that.$message({
      //     showClose: true,
      //     message: message,
      //     type: 'error'
      //   });
      // })
    },
    // offer(row) {
    //   const tid = sessionStorage.getItem("tid")
    //   const cno = row.cno
    //   const term = sessionStorage.getItem("currentTerm")
    //
    //   const that = this
    //   axios.get('courseTeacher/insert/' + cno + '/' + tid + '/' + term).then(function (resp) {
    //     if (resp.data === true) {
    //       that.$message({
    //         showClose: true,
    //         message: '开设成功',
    //         type: 'success'
    //       });
    //       window.location.reload()
    //     }
    //     else {
    //       that.$message({
    //         showClose: true,
    //         message: '开设失败，请联系管理员',
    //         type: 'error'
    //       });
    //     }
    //   })
    //
    //
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
        path: '/editorCourse',
        query: {
          cno: row.cno
        }
      })
    }
  },
  created() {
    console.log(this.type)
  },
  data() {
    return {
      typename: [{

      }],
      tableData: null,
      pageSize: 10,
      total: null,
      tmpList: null,
      type: sessionStorage.getItem("type"),
    }
  },
  props: {
    ruleForm: Object,
    isActive: Boolean
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
        axios.post("/course/findBySearch", newRuleForm).then(function (resp) {
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