<template>
  <div>

    <el-form :inline="true" :model="Form"
              label-width="70px" class="demo-ruleForm">
      <el-form-item label="课程名" >
        <el-input v-model="Form.cname"></el-input>
      </el-form-item>
    </el-form>

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

          <el-button @click="editor(scope.row)" type="text" size="small">选择</el-button>
          <el-button @click="deletePlan(scope.row)" type="text" size="small">退选</el-button>
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
import {createPlanTable, deletePlanByPlanidAndCid} from "@/api/utils";

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
      createPlanTable(this.$store.state.planid,row.cid).then(res =>{
        if(res.data.code === 200){
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          setTimeout(function () {
            window.location.reload()
          }, 2000)
        }
        else {
          this.$message({
            showClose: true,
            message: '添加失败,请勿重复添加',
            type: 'error'
          });
        }
      })
    },
    deletePlan(row){
      deletePlanByPlanidAndCid(this.$store.state.planid,row.cid).then(res=>{
        if(res.data.code === 200){
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'success'
          });

          setTimeout(function () {
            window.location.reload()
          }, 2000)
        }
        else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
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
      Form: {
        cno: '',
        cname: '',
        fuzzy: true,
      },

      fuzzy:true,

      tableData: null,
      pageSize: 10,
      total: null,
      tmpList: null,
      type: sessionStorage.getItem("type"),

    }
  },
  props: {
    ruleForm: Object,
    isActive: Boolean,
    cname: String,
  },

  watch: {
    Form: {
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