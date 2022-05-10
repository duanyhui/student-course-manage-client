/**
本页于2022.5.11由肖阳修改，主要添加了性别，学期的选择框，修改了请求的接口，修改了检验输入的逻辑
**/
<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        style="width: 60%"
    >
      <el-form-item label="学生学号" prop="sno">
        <el-input v-model="ruleForm.sno"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="sname">
        <el-input v-model="ruleForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-select v-model="ruleForm.ssex" placeholder="请选择性别">
          <el-option
              v-for="item in ruleForm.ssexList"
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
              v-for="item in ruleForm.termList"
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
    var check_sno = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        sno: "",
        sname: "",
        ssex: "",
        ssexList: ["男", "女"],
        major: "",
        college: "",
        term: "",
        termList: [
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
        sno: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { pattern:/^-?\d+$/,message: "请输入数字", trigger: "blur" },
        ],
        sname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        ssex: [
          { required: true, message: "请输入性别", trigger: "blur" },
        ],
        major: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        term: [{ required: true, message: "请选择学期", trigger: "blur" }],
        college: [
          { required: true, message: "请输入学院", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this;
          console.log(this.ruleForm);
          axios.post("/student/add", this.ruleForm).then(function (resp) {
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
