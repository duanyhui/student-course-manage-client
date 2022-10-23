<template>
  <el-card>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column
          fixed
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
          prop="termname"
          label="学期"
          width="150">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="editor(scope.row)" type="text" size="small">编辑</el-button>
          <el-popconfirm
              confirm-button-text='删除'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="删除不可复原"
              @confirm="editor(scope.row)"
          >
            <el-button slot="scope" type="text" size="small">删除</el-button>
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
  </el-card>
</template>

<script>

import {getPlanIndexList} from "@/api/utils";

export default {
  methods: {
    select(row) {
      console.log(row)
    },
    deleteCourse(row) {
      const that = this
      getPlanIndexList().then(function (resp) {

        if (resp.data.code === 200) {//200代表操作执行成功
          that.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'success'
          });
          //等待2秒后刷新页面
          setTimeout(function () {
            window.location.reload()
          }, 2000)

        }
        else {
          that.$message({
            showClose: true,
            message: resp.data.msg,
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
      // console.log("测试提交row"+row.collegename)

      this.$router.push({
        path: '/addPlanTableCourse',
        query: {
          collegename: row.collegename,
          majorname: row.majorname,
          termname: row.termname,
          collegeid: row.collegeid,
          majorid: row.majorid,
          termid: row.termid,
          planid:row.planid
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
        getPlanIndexList().then(function (resp) {
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

<style scoped>

</style>