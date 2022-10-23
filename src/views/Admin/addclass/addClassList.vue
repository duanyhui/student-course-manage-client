<template>
<div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm"
         label-width="120px" class="demo-ruleForm">
  <el-form-item label="学年" prop="schoolyear">
    <el-select v-model="ruleForm.schoolyear" placeholder="请选择学年" @focus="getSchoolYearList">
      <el-option
          v-for="item in schoolYearList"
          :key="item.schoolyear"
          :label="item.schoolyear"
          :value="item.schoolyear"
      >
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="学院" prop="collegeid">
    <el-select v-model="ruleForm.collegeid" placeholder="请选择学院" @focus="getCollegeList">
      <el-option
          v-for="item in collegeList"
          :key="item.collegename"
          :label="item.collegename"
          :value="item.collegeid"
      >
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="专业" prop="majorid">
    <el-select v-model="ruleForm.majorid" filterable placeholder="请先选择学院" @focus="getMajorList">
      <el-option
          v-for="item in majorList"
          :key="item.majorname"
          :label="item.majorname"
          :value="item.majorid"
      >
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="班级(数字)" prop="classid">
    <el-input v-model="ruleForm.classid"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>

</div>
</template>

<script>
import {addClass, getCollegeList, getMajorList, getSchoolYearList} from "@/api/utils";

export default {
  name: "addClassList",
  data() {
    return {
      majorList: [],
      collegeList: [],
      termList: [],
      schoolYearList: [],
      classList: [],

      ruleForm:{
        schoolyear: sessionStorage.getItem("schoolyear"),
        collegeid: "",
        majorid: "",
        termid: "",
        classid: "",
      },
      rules: {

        sno: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { pattern:/^-?\d+$/,message: "请输入数字", trigger: "blur" },
        ],
        sname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        ssex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        majorid: [
          {required: true, message: "请输入名称", trigger: "blur"},
          // {min: 2, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        termid: [{ required: true, message: "请选择学期", trigger: "blur" }],
        collegeid: [
          { required: true, message: "请输入学院", trigger: "blur" },
        ],
        classid: [
          { required: true, message: "请输入班级", trigger: "blur" },
          { pattern:/^-?\d+$/,message: "请输入数字", trigger: "blur" },
        ],
      },

    };
  },

  methods:{
    getCollegeList() {
      const that = this;
      getCollegeList().then((resp) => {
        console.log(resp.data.data);
        that.collegeList = resp.data.data;
        console.log(this.collegeList);
      });
    },

    getMajorList() {
      const that = this;
      getMajorList(that.ruleForm.collegeid).then((resp) => {
        if(resp.data.code===400){
        }
        that.majorList = resp.data.data;

      });
    },

    getSchoolYearList(){
      const that = this;
      getSchoolYearList().then((resp) => {
        console.log(resp.data.data);
        that.schoolYearList = resp.data.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this;
          console.log(this.ruleForm);
          addClass(that.ruleForm.collegeid,that.ruleForm.majorid,
              that.ruleForm.schoolyear,that.ruleForm.classid).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg ,
                type: "success",
              });
            } else if (resp.data.code===400) {
              that.$message.error(resp.data.msg);
            }
            //that.$router.push("/studentList");
          });
        } else {
          return false;
        }
      });
    },

  }
}
</script>

<style scoped>

</style>