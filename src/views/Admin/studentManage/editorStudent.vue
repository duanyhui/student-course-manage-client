/**
本页于2022.5.11由肖阳修改，主要添加了性别，学期的选择框，添加了根据学号点击查询获取学生信息后填入框的功能，修改了请求的接口，修改了检验输入的逻辑
**/
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
      <el-form-item label="需编辑的学生学号" prop="sno">
        <el-input v-model="ruleForm.sno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="quirybysno('ruleForm')"
        >查询
        </el-button
        >
      </el-form-item>
      <el-form-item label="学生密码" prop="password">
        <el-button type="primary" @click="resetPassword('ruleForm')"
        >重置学生密码为123456
        </el-button
        >
      </el-form-item>
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
        sno: "",
        sname: "",
        ssex: "",
        password: 123456,
        major: "",
        college: "",
        term: "",


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
      resetpass: {
        sno:null,
        password:123456,
      },


      rules: {
        sno: [
          {required: true, message: "请输入学号", trigger: "blur"},
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},

        ],
        sname: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        ssex: [{required: true, message: "请选择性别", trigger: "blur"}],
        major: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        term: [{required: true, message: "请选择学期", trigger: "blur"}],
        college: [{required: true, message: "请输入学院", trigger: "blur"}],
      },
    };
  },

  methods: {
    resetPassword(){

      const that=this
      if(this.ruleForm.sno!=null && this.ruleForm.sno!='') {
        this.resetpass.sno = this.ruleForm.sno
        axios.post("/student/update", this.resetpass).then(function (resp) {
          if (resp.data.code === 200) {
            that.$message({
              showClose: true,
              message: '修改密码成功！',
              type: 'success'
            });
          } else {
            that.$message.error(resp.data.msg);
          }
          //that.$router.push("/queryTeacher")
        })
      }
      else {
        that.$message({
          showClose: true,
          message: '学号未输入，请重试！',
          type: 'error'
        });
      }
    },
    quirybysno() {//点击查询按钮查询学号对应学生信息，并且填入对应输入框，选择框中
      const that = this;
      //try {

      axios
          .get("/student/getbysno/" + this.ruleForm.sno)
          .then(function (resp) {
            // that.ruleForm = resp.data
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: "查询到了该学号对应的学生信息如下",
                type: "success",
              });

              that.ruleForm = resp.data.data;

            } else if (resp.data.code === 400) {
              that.$message.error(resp.data.msg);
            }
            else{
              that.$message.error('请检查服务器链接')
            }
          });
      // } catch (error) {
      //   this.$message.error("无法连接到服务器");
      // }
    },
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