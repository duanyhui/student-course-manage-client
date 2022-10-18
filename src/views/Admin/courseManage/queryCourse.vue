<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
<!--            <el-form-item label="课程号" prop="cno">-->
<!--              <el-input v-model.number="ruleForm.cno"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="课程名" prop="cname">
              <el-input v-model="ruleForm.cname"></el-input>
            </el-form-item>
            <el-form-item label="模糊查询" prop="fuzzy">
              <el-switch v-model="ruleForm.fuzzy"></el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          <course-list :ruleForm="ruleForm" :isActive="true"></course-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import CourseList from "@/views/Admin/courseManage/courseList";
export default {
  components: {CourseList},
  data() {
    return {
      ruleForm: {
        cno: '',
        cname: '',
        fuzzy: true,

      },
      rules: {
        cno: [
          { type: 'number', message: '必须是数字类型' }
        ],
        cname: [
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