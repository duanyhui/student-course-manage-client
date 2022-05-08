<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程号" prop="cno">
        <el-input v-model="ruleForm.cno"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="cname">
        <el-input v-model="ruleForm.cname"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="ccredit">
        <el-input v-model.number="ruleForm.ccredit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="test">test</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        cno: null,
        cname: null,
        ccredit: null
      },
      rules: {
        cno: [
          // { required: true, message: '请输入学分', trigger: 'change' },
          // { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        cname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        ccredit: [
          { required: true, message: '请输入学分', trigger: 'change' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          // console.log(this.ruleForm)

          axios.post("/course/add", this.ruleForm).then(function (resp) {//??
          let message=resp.data.msg;
            console.log(resp)
            if (resp.data.code===200) {//200没出问题？
            
              that.$message({
                
                showClose: true,
                message: message,
                type: 'success'
              });
            }
            else {
              
              that.$message.error(message);
            }
            // that.$router.push("/queryCourse")//请求接口对了没
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      console.log(this.ruleForm)
    }
  }
}
</script>