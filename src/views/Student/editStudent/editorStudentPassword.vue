
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
        <el-input v-model="ruleForm.confirmpassword" show-password :value="ruleForm.confirmpassword"></el-input>
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

    let validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }

    };


    return {
      ruleForm: {
        sno: sessionStorage.getItem('sno'),
        password: '',
        confirmpassword:'',
  },
      rules: {
        password: [
          { required: true, message:"请输入密码", trigger: 'blur' }
        ],
        confirmpassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' },

        ],
      },


    };
  },



  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm);
        if (valid) {
          // 通过前端校验
          console.log(this.ruleForm);
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