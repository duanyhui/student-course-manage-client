<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%"



    >
      <el-table-column
          fixed
          prop="sno"
          label="学号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="schoolyear"
          label="学年"
          width="70">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="ssex"
          label="性别"
          width="50">
      </el-table-column>
      <el-table-column
          prop="termname"
          label="学期"
          width="100">
      </el-table-column>

      <el-table-column
          prop="collegename"
          label="学院"
          width="150">
      </el-table-column>
      <el-table-column
          prop="majorname"
          label="专业"
          width="150">
      </el-table-column>
      <el-table-column
          prop="classid"
          label="班级"
          width="50">
      </el-table-column>
      <el-table-column
          prop="onclassid"
          label="在班编号"
          width="50">
      </el-table-column>

<!--      <el-table-column-->
<!--          prop="password"-->
<!--          label="密码"-->
<!--          width="120">-->
<!--      </el-table-column>-->
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
<!--              @confirm="deleteStudent(scope.row)"-->
<!--          >-->
<!--            <el-button slot="reference" type="text" size="small">删除</el-button>-->
<!--          </el-popconfirm>-->
          <el-popconfirm
              cancel-button-text='取消'
              confirm-button-text='删除'
              icon="el-icon-info"
              icon-color="red"
              title="删除不可复原"
              @confirm="deleteStudent(scope.row)"
          >
            <el-button slot="reference" size="small" type="text">删除</el-button>
          </el-popconfirm>
<!--          <el-button @click="editor(scope.row)" type="text" size="small">编辑</el-button>-->
          <el-button size="small" type="text" @click="editor(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="handleList.length">
      </el-pagination>

    </el-table>
<!--    <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :total="total"-->
<!--        :page-size="pageSize"-->
<!--        @current-change="changePage"-->
<!--    >-->
<!--    </el-pagination>-->
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

  data() {
    return {
      handleList: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,

      tableData: null,
      total: null,
      tmpList: null,
    }
  },

  props: {
    ruleForm: Object
  },//加入

  mounted() {
    axios.post("/student/findBySearch", newRuleForm)
        .then(function (resp){
          if (resp.data.code === 200) {
            this.handleList = resp.data.data;
          }else{
            console.log('没有获取到数据')
          }
        })
        .catch((err) => {
          console.log('获取数据出错', err)
        });
    },

  methods: {

    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },


    deleteStudent(row) {
      const that = this
      axios.post('/student/deleteBySno/' + row.sno).then(function (resp) {
        if (resp.data.code === 200) {
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'success'
          });
          console.log(that.tmpList === null)
          window.location.reload()
        }
        else if(resp.data.code === 400) {
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
        path: '/editorStudent',
        query: {
          sno: row.sno
        }
      })
    }
  },



  watch: {
    ruleForm: {
      handler(newRuleForm, oldRuleForm) {
        if (this.ruleForm.sno === '')
          this.ruleForm.sno = null;//解决空sno无法模糊查询
        console.log("组件监听 form")

        const that = this
        that.tmpList = null
        that.total = null
        that.tableData = null
        console.log(this.ruleForm);

        axios.post("/student/findBySearch", newRuleForm).then(function (resp) {

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