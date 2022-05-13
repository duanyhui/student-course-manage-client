<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师编号" prop="tno">
        <el-input v-model="ruleForm.tno"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名" prop="tname">
        <el-input v-model="ruleForm.tname"></el-input>
      </el-form-item>
      <el-form-item label="初始密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-select v-model="ruleForm.tsex" placeholder="请选择性别">
          <el-option
              v-for="item in infoList.tsexList"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-input v-model="ruleForm.college" :value="ruleForm.college"></el-input>
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
        tno: null,
        tname: null,
        password: null,
        tsex:null,
        college:null,
      },
      infoList: {
        tsexList: ["男", "女"],
      },
      rules: {
        tno: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { pattern:/^-?\d+$/,message: "请输入数字", trigger: "blur" },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        tname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        ssex: [
          { required: true, message: "请输入性别", trigger: "blur" },
        ],
        college: [
          { required: true, message: "请输入学院", trigger: "blur" },
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
          console.log(this.ruleForm)
          // if (that.ruleForm.tname === 'admin') {
          //   that.$message({
          //     showClose: true,
          //     message: 'admin 不可添加',
          //     type: 'error'
          //   });
          //   return
          // }
          axios.post("/teacher/add", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg + '  初始密码为123456',
                type: "success",
              });
            } else if (resp.data.code===400) {
              that.$message.error(resp.data.msg);
            }
            //that.$router.push("/studentList");
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // test() {
    //   console.log(this.ruleForm)
    // }
  }
}
</script>