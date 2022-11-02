<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="需编辑的课程号" prop="cno">
        <el-input v-model="ruleForm.cno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="quirybycno('ruleForm')"
        >查询
        </el-button
        >
      </el-form-item>
      <el-form-item label="课程名称" prop="cname">
        <el-input v-model="ruleForm.cname" :value="ruleForm.cname"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="ccredit">
        <el-input v-model.number="ruleForm.ccredit" :value="ruleForm.ccredit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--        <el-button @click="test">test</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        cno: this.$route.query.cno,
        cname: '',
        ccredit: ''
      },
      rules: {
        cname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        ccredit: [
          { required: true, message: '请输入学分', trigger: 'change' },
          { type: 'number', message: '请输入数字', trigger: 'change'},
        ],
      }
    };
  },
  // created() {
  //   const that = this
  //   if (this.$route.query.cid === undefined) {
  //     this.ruleForm.cid = 1
  //   }
  //   else {
  //     this.ruleForm.cid = this.$route.query.cid
  //   }
  //   axios.get('http://localhost:10086/course/findById/' + this.ruleForm.cid).then(function (resp) {
  //     that.ruleForm = resp.data[0]
  //     console.log(that.ruleForm)
  //   })
  // },
  methods: {
    quirybycno() {//点击查询按钮查询学号对应学生信息，并且填入对应输入框，选择框中
      const that = this;
      //try {
      axios
          .get("/course/findByCno/" + this.ruleForm.cno)
          .then(function (resp) {
            // that.ruleForm = resp.data
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: "查询到了该课程号对应的课程信息如下",
                type: "success",
              });
              console.log(resp.data)
              that.ruleForm = resp.data.data;

            } else if (resp.data.code === 400) {
              that.$message.error(resp.data.msg);
            }
          });
      // } catch (error) {
      //   this.$message.error("无法连接到服务器");
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          console.log(this.ruleForm)
          axios.post("/course/update", this.ruleForm).then(function (resp) {
            // that.ruleForm = resp.data
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: "success",
              });

            } else if (resp.data.code === 400) {
              that.$message.error(resp.data.msg);
            }
            else{
              that.$message.error('请检查服务器链接')
            }
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