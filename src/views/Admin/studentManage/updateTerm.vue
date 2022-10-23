<template>
<div>
  <el-popconfirm
      confirm-button-text='好的'
      cancel-button-text='不用了'
      icon="el-icon-info"
      icon-color="red"
      title="是否将所有学生的学期更新为下一学期？该操作无法撤销"
      @confirm="update_Term"
  >
    <el-button slot="reference">更新学期</el-button>
  </el-popconfirm>

  <el-popconfirm
      confirm-button-text='好的'
      cancel-button-text='不用了'
      icon="el-icon-info"
      icon-color="red"
      title="是否将所有学生的学期回退为上一学期？该操作无法撤销"
      @confirm="update_Termbefore"
  >
    <el-button slot="reference">回退学期</el-button>

  </el-popconfirm>
</div>
</template>

<script>
import {updateTerm, updateTerm_before} from "@/api/utils";

export default {
  name: "updateTerm",
  methods: {
    update_Term() {
          updateTerm().then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '更新失败!'
              });
            }
          })

    },
    update_Termbefore() {
      updateTerm_before().then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '更新失败!'
          });
        }
      })

    }
  },




}
</script>

<style scoped>

</style>