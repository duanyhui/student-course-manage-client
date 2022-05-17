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
      <!--      <el-form-item label="需编辑的学生学号" prop="tno">-->
      <!--        <el-input v-model="ruleForm.tno"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="quirybytno('ruleForm')"-->
      <!--        >查询-->
      <!--        </el-button-->
      <!--        >-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="学生密码" prop="password">-->
      <!--        <el-input v-model="ruleForm.password" show-password :value="ruleForm.password"></el-input>-->
      <!--        -->
      <!--      </el-form-item>-->
      <el-form-item label="教师姓名" prop="tname">
        <el-input v-model="ruleForm.tname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="tsex">
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
      <el-form-item label="所属学院" prop="college">
        <el-input v-model="ruleForm.college"></el-input>
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

    // var check_tno = (rule, value, callback) => {
    //   if (!is_quiry) {
    //     callback(new Error("请先查询学号对应学生信息是否存在后再提交")); //to do:检查是否查询了学号
    //   } else {
    //     callback();
    //   }
    // };
    var check_quiry = (rule, value, callback) => {

      callback();
    };

    return {
      ruleForm: {
        tno: sessionStorage.getItem('tno'),
        tname: sessionStorage.getItem('tname'),
        tsex: sessionStorage.getItem('tsex'),
        college: sessionStorage.getItem('college'),
      },
      //infoList是选择框的内容
      infoList: {
        tsexList: ["男", "女"]
      },


      rules: {
        tname: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 1, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        tsex: [{required: true, message: "请选择性别", trigger: "blur"}],
        college: [{required: true, message: "请输入学院", trigger: "blur"}],
      },
    };
  },
  created() {
    // const that = this
    // if (this.$route.query.sid === undefined) {
    //   this.ruleForm.sid = 1
    // }
    // else {
    //   this.ruleForm.sid = this.$route.query.sid
    // }
    // axios.get('/student/getbytno/' + this.ruleForm.sid).then(function (resp) {
    //   that.ruleForm = resp.data
    // })
  },
  methods: {
    submitForm(formName) {//提交逻辑，主要是修改了接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this;
          console.log(this.ruleForm);
          axios.post("/teacher/update", this.ruleForm).then(function (resp) {
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