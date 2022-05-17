<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
<!--            <el-form-item label="工号" prop="tno">-->
<!--              <el-input v-model.number="ruleForm.tno"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="教师名" prop="tname">
              <el-input v-model.number="ruleForm.tname"></el-input>
            </el-form-item>

<!--            <el-form-item label="课程号" prop="cno">-->
<!--              <el-input v-model.number="ruleForm.cno"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="课程名" prop="cname">
              <el-input v-model.number="ruleForm.cname"></el-input>
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
            <el-form-item label="模糊查询" prop="fuzzy">
              <el-switch
                  v-model="ruleForm.fuzzy"
                  @change="changeFuzzy"
              ></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px">
          <course-tacher-list :ruleForm="ruleForm"></course-tacher-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import CourseTacherList from "@/views/Admin/selectCourseManage/CourseTacherList";
export default {
  components: {CourseTacherList},
  data() {
    return {
      ruleForm: {
        tno: '',
        cno: '',
        cname: '',
        tname: '',
        term:'',
        fuzzy: true,


      },
      rules: {
        tno: [
          { type: 'number', message: '必须是数字类型' }
        ],
        cno: [
          { type: 'number', message: '必须是数字类型' }
        ],
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeFuzzy(ruleForm) {
      // let that = this.ruleForm;
      // that.fuzzy ? that.password = 'fuzzy' : that.password = 'notfuzzy';
      // console.log(that.password);
    },
  }
}
</script>