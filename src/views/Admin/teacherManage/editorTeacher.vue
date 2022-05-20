<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师编号" prop="tno">
        <el-input v-model="ruleForm.tno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="quirybytno('ruleForm')"
        >查询
        </el-button
        >
      </el-form-item>
      <el-form-item label="教师密码" prop="password">
        <el-button type="primary" @click="resetPassword('ruleForm')"
        >重置教师密码为123456
        </el-button
        >
      </el-form-item>
      <el-form-item label="教师姓名" prop="tname">
        <el-input v-model="ruleForm.tname" :value="ruleForm.tname"></el-input>
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
        tsex:null,
        college:null,
      },
      resetpass: {
       tno:null,
       password:123456,
      },
      infoList: {
        tsexList: ["男", "女"],
      },
      rules: {
        tno: [
          {required: true, message: "请输入学号", trigger: "blur"},
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},
        ],

        tname: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        tsex: [
          {required: true, message: "请选择性别", trigger: "blur"},
        ],
        college: [
          {required: true, message: "请输入学院", trigger: "blur"},
        ],
      }
    };
  },
  // created() {
  //   const that = this
  //   if (this.$route.query.tno === undefined) {
  //
  //   }
  //   else {
  //     this.ruleForm.tno = this.$route.query.tno
  //   }
  //   axios.get('/teacher/findByTno/' + this.ruleForm.tno).then(function (resp) {
  //     that.ruleForm = resp.data
  //   })
  // },
  methods: {
    resetPassword(){
      const that=this
      if(this.ruleForm.tno!=null && this.ruleForm.tno!='') {
        this.resetpass.tno = this.ruleForm.tno
        axios.post("/teacher/update", this.resetpass).then(function (resp) {
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
    quirybytno() {//点击查询按钮查询教师编号对应学生信息，并且填入对应输入框，选择框中
      const that = this;
      //try {
      axios
          .get("/teacher/getByTno/" + this.ruleForm.tno)
          .then(function (resp) {
            // that.ruleForm = resp.data
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: "查询到了该学号对应的教师信息如下",
                type: "success",
              });

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
          if (that.ruleForm.tname === 'admin') {
            that.$message({
              showClose: true,
              message: 'admin 不可编辑',
              type: 'error'
            });
            this.$router.push('/queryTeacher')
            return
          }
          console.log(this.ruleForm)
          axios.post("/teacher/update", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              });
            } else {
              that.$message.error(resp.data.data);
            }
            //that.$router.push("/queryTeacher")
          })
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