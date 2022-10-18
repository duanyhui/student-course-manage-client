<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  style="width: 35%">
      <el-form-item label="学院名称" prop="collegeName">
        <el-input v-model="ruleForm.collegeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createCollege} from "@/api/utils";

export default {

  data() {
    return {
      ruleForm: {
        collegeName: '',
      },
      rules: {
        collegeName: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createCollege(this.ruleForm.collegeName).then(res =>{
            if (res.data.code=== 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}

</script>

<style scoped>

</style>