<template>
  <div>
    <el-card>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="ctid"
            label="开课编号"
            width="150">
        </el-table-column>
        <el-table-column
            fixed
            prop="cno"
            label="课号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="cname"
            label="课程号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="tno"
            label="教师号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="tname"
            label="教师名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="学分"
            width="150">
        </el-table-column>
        <el-table-column
            label="操作"
            width="100">

          <template slot-scope="scope">
            <el-popconfirm
                confirm-button-text='退课'
                cancel-button-text='取消'
                icon="el-icon-info"
                title="确定退课？"
                @confirm="deleteSCT(scope.row)"
            >
              <el-button slot="reference" type="text" size="small">退课</el-button>
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
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    deleteSCT(row) {
      const cno = row.cno
      const ctid = row.ctid
      const grade =row.grade
      const sno = sessionStorage.getItem('sno')

      const sct = {

        ctid: ctid,
        sno: sno,
        grade:grade

      }

      const that = this
      axios.post('/sc/delete', sct).then(function (resp) {
        if (resp.data.code === 200) {
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
      type: sessionStorage.getItem('type')
    }
  },
  created() {
    const sno = sessionStorage.getItem('sno')

    const that = this
    const sc={

      sno:sno,
    };
    axios.post('/sc/findBySearch/',sc).then(function (resp) {
      that.tmpList = resp.data.data
      that.total = resp.data.length
      let start = 0, end = that.pageSize
      let length = that.tmpList.length
      let ans = (end < length) ? end : length
      that.tableData = that.tmpList.slice(start, end)
    })
  },
}
</script>