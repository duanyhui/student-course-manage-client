
<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="140px"
        style="width: 60%"
    >

      <el-form-item label="修改密码" prop="password">
        <el-input v-model="ruleForm.password" show-password :value="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmpassword">
        <el-input v-model="ConfirmPassword.confirmpassword" show-password :value="ConfirmPassword.confirmpassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >提交
        </el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {

  data() {

    var validateConfirmPassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }

    };


    return {
      ruleForm: {
        sno: sessionStorage.getItem('sno'),
        password: null,
      },
      ConfirmPassword:{confirmpassword:null},


    };
  },
  rules: {
    password: [
      { required: true, message:"请输入密码", trigger: 'blur' }
    ],
    confirmpassword: [
      { required: true, validator: 'validateConfirmPassword',
        trigger: 'blur' }
    ],
  },


  methods: {



    submitForm(formName) {//提交逻辑，主要是修改了接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this;
          console.log(this.ruleForm);
          axios.post("/student/update", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: "success",
              });
            } else if (resp.data.code === 400) {
              that.$message.error(resp.data.msg);
            }
            // that.$router.push("/studentList")
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();

    },
    test() {
      console.log(this.ruleForm);
    },
  },
};
</script>