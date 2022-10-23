<template>
  <div>
    <el-table
        :data="tableData"
        border
        show-header
        stripe
        style="width: 100%">


      <el-table-column
          prop="cname"
          label="课程名称"
          width="150">
      </el-table-column>

      <el-table-column
          prop="tname"
          label="教师名称"
          width="150">
      </el-table-column>
      <el-table-column
          prop="classtime"
          label="上课时间"
          width="150">
      </el-table-column>
      <el-table-column
          prop="type"
          label="课程类型"
          width="150">
      </el-table-column>
      <el-table-column
          prop="capacityable"
          label="课程剩余容量"
          width="150">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">

        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='选择'
              cancel-button-text='取消'
              icon="el-icon-info"
              title="确定选择该教师开设的课程？"
              @confirm="select(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">选择</el-button>
          </el-popconfirm>
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
import {getAbleCourseBySno, selectCourse} from "@/api/utils";

export default {
  methods: {
    select(row) {
      const sno = sessionStorage.getItem("sno");
      const ctid = parseInt(row.ctid);
      selectCourse(ctid,sno).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '选择成功',
            type: 'success'
          });
          setTimeout(function () {
            window.location.reload()
          }, 1000)
          this.getData();
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
      // console.log(row)
      // const ctid = row.ctid;
      // const sno=sessionStorage.getItem('sno');
      // const term=sessionStorage.getItem('term');
      // const sct = {
      //   ctid: ctid,
      //   sno: sno,
      //   term: term,
      //
      // }
      //
      //
      // const that = this
      //
      // axios.post('/sc/add', sct).then(function (resp) {
      //
      //   if (resp.data.code === 200) {
      //     that.$message({
      //       showClose: true,
      //       message: resp.data.msg,
      //       type: 'success'
      //     });
      //   }
      //   else if(resp.data.code===400) {
      //     that.$message({
      //       showClose: true,
      //       message: resp.data.msg,
      //       type: 'error'
      //     });
      //   }
      //
      // }).errorCode


    },
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
      type: sessionStorage.getItem('type'),
      sno: this.$store.state.sno
    }
  },
  props: {
    ruleForm: Object
  },
  watch: {
    ruleForm: {
      handler(newRuleForm, oldRuleForm) {
        const that = this
        that.tmpList = null
        that.total = null
        that.tableData = null
        console.log(newRuleForm)
        getAbleCourseBySno(sessionStorage.getItem("sno")).then(function (resp) {
          console.log(resp.data);
          that.tmpList = resp.data.data;
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