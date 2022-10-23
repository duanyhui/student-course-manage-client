<template>
  <div>
    <div>
    <el-card>
      <el-form style="width: 60%" :model="rul" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学院" prop="collegename">
          <el-input v-model="ruleForm.collegename" :value="ruleForm.collegename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="majorname">
          <el-input v-model="ruleForm.majorname" :value="ruleForm.majorname" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="学期" prop="termname">
          <el-input v-model="ruleForm.termname" :value="ruleForm.termname" :disabled="true"></el-input>
        </el-form-item>

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->

<!--        </el-form-item>-->
      </el-form>

      <course-table-for-plan style="margin-left: 50px"
      ></course-table-for-plan>
    </el-card>


    </div>


  </div>

</template>

<script>
import CourseList from "@/views/Admin/courseManage/courseList";
import CourseTableForPlan from "@/components/courseTableForPlan";

export default {
  name: "addPlanTableCourse",
  components: {CourseTableForPlan, CourseList},
  created() {
    const that = this
    this.ruleForm.collegeid = this.$route.query.collegeid
    this.ruleForm.majorid = this.$route.query.majorid
    this.ruleForm.termid = this.$route.query.termid
    this.ruleForm.collegename = this.$route.query.collegename
    this.ruleForm.majorname = this.$route.query.majorname
    this.ruleForm.termname = this.$route.query.termname
    this.ruleForm.planid = this.$route.query.planid
    this.$store.commit('setCollegeid', this.ruleForm.collegeid)
    this.$store.commit('setMajorid', this.ruleForm.majorid)
    this.$store.commit('setTermid', this.ruleForm.termid)
    this.$store.commit('setPlanid', this.ruleForm.planid)
  },
  data(){
    return{
      ruleForm: {
        collegename:'',
        majorname:'',
        termname: '',
        collegeid:'',
        majorid:'',
        termid: '',
        planid:'',
      },
    }
  }
}
</script>

<style scoped>

</style>