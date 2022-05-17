<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="开课编号" prop="ctid">
              <el-input v-model.number="ruleForm.ctid"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="sno">
              <el-input v-model.number="ruleForm.sno"></el-input>
            </el-form-item>
            <el-form-item label="学生名" prop="sname">
              <el-input v-model="ruleForm.sname"></el-input>
            </el-form-item>
            <el-form-item label="教师号" prop="tno">
              <el-input v-model.number="ruleForm.tno"></el-input>
            </el-form-item>
            <el-form-item label="教师名" prop="tname">
              <el-input v-model="ruleForm.tname"></el-input>
            </el-form-item>
            <el-form-item label="课程号" prop="cno">
              <el-input v-model.number="ruleForm.cno"></el-input>
            </el-form-item>
            <el-form-item label="课程名" prop="cname">
              <el-input v-model="ruleForm.cname"></el-input>
            </el-form-item>

            <el-form-item label="选择学期">
              <el-select v-model="ruleForm.term" placeholder="请选择学期">
                <el-option v-for="(item, index) in infoList.termList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模糊查询" prop="fuzzy">
              <el-switch v-model="ruleForm.fuzzy"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px">
          <grade-course-list :rule-form="ruleForm"></grade-course-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import GradeCourseList from "@/views/Admin/gradeCourseManage/gradeCourseList";
export default {
  components: {GradeCourseList},
  data() {
    return {

      ruleForm: {
        ctid:'',
        sno: '',
        sname: '',
        tno: '',
        tname: '',
        cno: '',
        cname: '',
        fuzzy: true,
        term: '',
      },
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



      }
    };
  },
  // created() {
  //   const that = this
  //   axios.get('http://localhost:10086/SCT/findAllTerm').then(function (resp) {
  //     that.termList = resp.data
  //   })
  // },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>