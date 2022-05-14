<template>
  <div>
    <el-card>
      <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学号" prop="sno">
          <el-input v-model="ruleForm.sno" :value="ruleForm.sno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开课编号" prop="tname">
          <el-input v-model="ruleForm.ctid" :value="ruleForm.ctid" :disabled="true"></el-input>
        </el-form-item>
<!--        <el-form-item label="学生名" prop="sname">-->
<!--          <el-input v-model="ruleForm.sname" :value="ruleForm.sname" :disabled="true"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="分数" prop="grade">
          <el-input v-model.number="ruleForm.grade" :value="ruleForm.grade"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var checkGrade = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('成绩不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 100 || value < 0) {
          callback(new Error('成绩范围 [0 - 100]'));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        cno: null,
        cname: null,
        grade: null,
        sno: null,
        sname: null,
        tno: null,
        tname: null,
        ctid: null,
      },
      rules: {
        grade: [
          { required: true, message: '请输入学分', trigger: 'change'},
          { type: 'number', message: '请输入数字', trigger: 'change'},
          { validator: checkGrade, trigger: 'blur'}
        ],
      }
    };
  },
  created() {
    const that = this
    this.ruleForm.ctid = this.$route.query.ctid

    this.ruleForm.sno = this.$route.query.sno


  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          const sno = that.ruleForm.sno
          const grade = that.ruleForm.grade
          const  ctid=that.ruleForm.ctid
const sc={
            sno:sno,
  ctid:ctid,
  grade:grade
}
          axios.post("/sc/updateGrade/" ,sc).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              });
            }
            else {
              that.$message.error(resp.data.msg);
            }
            that.$router.push("/teacherQueryGradeCourseManage")
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