/**
本页于2022.5.11由肖阳修改，修改了接口，添加了点击按钮根据fuzzy修改password的逻辑
**/
<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form
              ref="ruleForm"
              :inline="true"
              :model="ruleForm"
              :rules="rules"
              class="demo-ruleForm"
              label-width="100px"
          >
            <el-form-item label="工号" prop="tno">
              <el-input v-model.number="ruleForm.tno"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名" prop="tname">
              <el-input v-model="ruleForm.tname"></el-input>
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
              </el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          <teacher-list :ruleForm="this.ruleForm"></teacher-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import TeacherList from "@/views/Admin/teacherManage/teacherList";
export default {
  components: {TeacherList},
  data() {

    return {
      ruleForm: {
        tno: null,
        tname: null,
        fuzzy: true,
        password: "fuzzy",
      },
      rules: {
        tno: [{type: "number", message: "必须是数字类型"}],
        tname: [],
      },
    };
  },
  create() {
    this.tno = null;
    this.tname = null;
    this.fuzzy = true;
    this.password = "fuzzy";
  },
  methods: {
    changeFuzzy(ruleForm) {
      var that = this.ruleForm;
      that.fuzzy ? that.password = 'fuzzy' : that.password = 'notfuzzy';
      console.log(that.password);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>