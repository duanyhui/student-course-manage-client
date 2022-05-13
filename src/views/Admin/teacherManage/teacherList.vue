<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          label="工号"
          prop="tno"
          width="150">
      </el-table-column>
      <el-table-column
          label="姓名"
          prop="tname"
          width="150">
      </el-table-column>
      <!--      <el-table-column-->
      <!--          prop="password"-->
      <!--          label="密码"-->
      <!--          width="150">-->
      <!--      </el-table-column>-->
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-popconfirm
              cancel-button-text='取消'
              confirm-button-text='删除'
              icon="el-icon-info"
              icon-color="red"
              title="删除不可复原"
              @confirm="deleteTeacher(scope.row)"
          >
            <el-button slot="reference" size="small" type="text">删除</el-button>
          </el-popconfirm>
          <el-button size="small" type="text" @click="editor(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :page-size="pageSize"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    deleteTeacher(row) {
      // if (row.tname === 'admin') {
      //   this.$message({
      //     showClose: true,
      //     message: 'admin 不可删除',
      //     type: 'error'
      //   });
      //   return
      // }
      const that = this
      axios.post('/teacher/deleteByTno/' + row.tno).then(function (resp) {
        if (resp.data.code === 200) {
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'success'
          });
          console.log(that.tmpList === null)
          window.location.reload()
        } else if(resp.data.code === 400) {
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'error'
          });
        }
        else{
          that.$message({
            showClose: true,
            message: '无法连接到服务器',
            type: 'error'
          });
        }
      })
      //     .catch(function (e) {
      //   that.$message({
      //     showClose: true,
      //     message: '删除出错，存在外键依赖',
      //     type: 'error'
      //   });
      // })
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
      // if (row.tname === 'admin') {
      //   this.$message({
      //     showClose: true,
      //     message: 'admin 不可编辑',
      //     type: 'error'
      //   });
      //   return
      // }
      this.$router.push({
        path: '/editorTeacher',
        query: {
          tno: row.tno
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
    ruleForm: Object
  },
  watch: {
    ruleForm: {
      handler(newRuleForm, oldRuleForm) {
        console.log("组件监听 form")

        const that = this
        that.tmpList = null
        that.total = null
        that.tableData = null
        console.log(this.ruleForm);

        axios.post("/teacher/findBySearch", newRuleForm).then(function (resp) {

          // console.log("查询结果:");
          // console.log(newRuleForm)
          // console.log(resp)
          // that.tmpList = resp.data
          // that.total = resp.data.length
          // let start = 0, end = that.pageSize
          // let length = that.tmpList.length
          // let ans = (end < length) ? end : length
          // that.tableData = that.tmpList.slice(start, end)
          console.log("查询结果:");
          console.log(newRuleForm)
          console.log(resp.data)
          that.tmpList = resp.data.data;
          that.total = resp.data.data.length
          let start = 0, end = that.pageSize
          let length = that.tmpList.length
          let ans = (end < length) ? end : length
          that.tableData = that.tmpList.slice(start, end)
        })
      },
      deep: true,
      immediate: true
    }
  },
}
</script>