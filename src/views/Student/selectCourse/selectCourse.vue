<template>
  <div>
    <el-container>
      <el-main>
<!--        <el-card>-->
<!--          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">-->
<!--            <el-form-item label="工号" prop="tno">-->
<!--              <el-input v-model.number="ruleForm.tno"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="教师名" prop="tname">-->
<!--              <el-input v-model.number="ruleForm.tname"></el-input>-->
<!--            </el-form-item>-->
<!--&lt;!&ndash;            <el-form-item label="教师模糊查询">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-switch v-model="ruleForm.tFuzzy"></el-switch>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--            <el-form-item label="课程号" prop="cno">-->
<!--              <el-input v-model.number="ruleForm.cno"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="课程名" prop="cname">-->
<!--              <el-input v-model.number="ruleForm.cname"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="课程模糊查询">-->
<!--              <el-switch v-model="ruleForm.fuzzy"></el-switch>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </el-card>-->
        <el-card style="margin-top: 10px">
          <select-course-list :rule-form="ruleForm"></select-course-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import SelectCourseList from "@/views/Student/selectCourse/selectCourseList";
export default {
  components: {SelectCourseList},
  data() {
    return {
      ruleForm: {
        tno: '',
        cno: '',
        cname: '',
        tname: '',
        fuzzy: true,
        term: sessionStorage.getItem("term"),
      },
      rules: {
        tid: [
          { type: 'number', message: '必须是数字类型' }
        ],
        cid: [
          { type: 'number', message: '必须是数字类型' }
        ],
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>