
<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sno">
              <el-input v-model.number="ruleForm.sno"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="sname">
              <el-input v-model="ruleForm.sname"></el-input>
            </el-form-item>
            <el-form-item label="模糊查询" prop="fuzzy">
              <el-switch
                  v-model="ruleForm.fuzzy"
                  @change="changeFuzzy"
              ></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetForm('ruleForm')"
              >重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          <student-list :ruleForm="this.ruleForm"></student-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import StudentList  from "@/views/Admin/studentManage/studentList";
export default {
  components:{StudentList},
  data() {
    return {
      ruleForm: {
        sno: null,
        sname: null,
        fuzzy: true,
        password: "fuzzy",
      },
      rules: {
        sno: [
          { type: 'number', message: '必须是数字类型' }
        ],
        sname: [],
      }
    };
  },
  create() {
    this.sno = null
    this.sname = null
    this.fuzzy = true
    this.password = "fuzzy";
  },
  methods: {
    changeFuzzy(ruleForm) {
      let that = this.ruleForm;
      that.fuzzy ? that.password = 'fuzzy' : that.password = 'notfuzzy';
      console.log(that.password);
    },
    // flush(formName) {
    //   this.$router.push('/queryStudent');
    //   this.$refs[formName].resetFields();
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       if (this.ruleForm.password === true) {
    //         this.ruleForm.password = 'fuzzy'
    //       }
    //       else {
    //         this.ruleForm.password = null
    //       }
    //       let url = null
    //       if (this.ruleForm.sid === null && this.ruleForm.sname === null) {
    //         url = '/studentList'
    //       }
    //       else {
    //         url = '/queryStudent/studentList'
    //       }
    //       this.$router.push({
    //         path: url,
    //         query: {
    //           ruleForm: this.ruleForm
    //         }})
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>