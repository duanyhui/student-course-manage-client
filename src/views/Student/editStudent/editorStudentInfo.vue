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
<!--      <el-form-item label="需编辑的学生学号" prop="sno">-->
<!--        <el-input v-model="ruleForm.sno"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="quirybysno('ruleForm')"-->
<!--        >查询-->
<!--        </el-button-->
<!--        >-->
<!--      </el-form-item>-->
<!--      <el-form-item label="学生密码" prop="password">-->
<!--        <el-input v-model="ruleForm.password" show-password :value="ruleForm.password"></el-input>-->
<!--        -->
<!--      </el-form-item>-->
      <el-form-item label="学生姓名" prop="sname">
        <el-input v-model="ruleForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-select v-model="ruleForm.ssex" placeholder="请选择性别">
          <el-option
              v-for="item in infoList.ssexList"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生专业" prop="major">
        <el-input v-model="ruleForm.major"></el-input>
      </el-form-item>

      <el-form-item label="学生学院" prop="college">
        <el-input v-model="ruleForm.college"></el-input>
      </el-form-item>
      <el-form-item label="学期" prop="term">
        <el-select v-model="ruleForm.term" placeholder="请选择学期">
          <el-option
              v-for="item in infoList.termList"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
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

    // var check_sno = (rule, value, callback) => {
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
        sno: sessionStorage.getItem('sno'),
        sname: sessionStorage.getItem('sname'),
        ssex: sessionStorage.getItem('ssex'),
        major: sessionStorage.getItem('major'),
        college: sessionStorage.getItem('college'),
        term: sessionStorage.getItem('term'),


      },
      //infoList是选择框的内容
      infoList: {
        ssexList: ["男", "女"], termList: [
          "大一上",
          "大一下",
          "大二上",
          "大二下",
          "大三上",
          "大三下",
          "大四上",
          "大四下",
        ],
      },


      rules: {
        sname: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
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
    // axios.get('/student/getbysno/' + this.ruleForm.sid).then(function (resp) {
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