<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="课程号" prop="cno">
              <el-input v-model.number="ruleForm.cno"></el-input>
            </el-form-item>
            <el-form-item label="课程名" prop="cname">
              <el-input v-model="ruleForm.cname"></el-input>
            </el-form-item>
            <el-form-item label="模糊查询" prop="fuzzy">
              <el-switch v-model="ruleForm.fuzzy"></el-switch>
            </el-form-item>
<!--            <el-form-item label="学分下限" prop="lowBound">-->
<!--              <el-input v-model.number="ruleForm.lowBound"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="学分上限" prop="highBound">-->
<!--              <el-input v-model.number="ruleForm.highBound"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
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
            <el-form-item label="选课容量" prop="capacity">
              <el-input v-model.number="ruleForm.capacity"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-top: 10px">
          <offer-course-list :rule-form="ruleForm"></offer-course-list>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import OfferCourseList from "@/views/Teacher/offerCourseList";

export default {
  components: {OfferCourseList},
  data() {
    return {
      ruleForm: {
        cno: '',
        cname: '',
        fuzzy: true,
        capacity: '',
        // lowBound: null,
        // highBound: null

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
        term: [
          { required: true, message: '请选择学期' }
        ],
        capacity: [
          {required: true, message: '请输入容量'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
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