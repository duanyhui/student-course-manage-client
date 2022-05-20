<template>
  <div>
    <el-card>
      <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="开课编号" prop="ctid">
          <el-input v-model="ruleForm.ctid" :value="ruleForm.ctid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="ctid">
          <el-input v-model="ruleForm.ctid" :value="ruleForm.sno" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="分数" prop="grade">
          <el-input v-model="ruleForm.grade" :value="ruleForm.grade"></el-input>
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
      let v = parseFloat(value)
      if ((v - 100.0 > 0.0 || v - 0.0 < 0.0)) {
        callback(new Error('成绩范围 [0 - 100]'));
      } else {
        callback();
      }

    };
    return {
      ruleForm: {
        ctid:'',
        sno:''
      },
      rules: {
        grade: [
          {required: true, message: '请输入成绩', trigger: 'change'},
          {pattern: /[1-9]\d*.\d*|0.\d*[1-9]\d*/, message: '请输入正确的小数', trigger: 'blur'},
          {validator: checkGrade, trigger: 'blur'}
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
          const cid = that.ruleForm.cid
          const tid = that.ruleForm.tid
          const ctid=that.ruleForm.ctid
          const term = that.ruleForm.term
          const grade = that.ruleForm.grade
          const sc={
            sno:sno,
            ctid:ctid,
            grade:grade
          }
          axios.post("/sc/updateGrade" ,sc).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              });
            } else {
              that.$message.error(resp.data.msg);
            }
            // if (sessionStorage.getItem('type') === 'admin') {
            //   that.$router.push("/queryGradeCourse")
            // } else {
            //   that.$router.push("/teacherQueryGradeCourseManage")
            // }
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