/**
本页于2022.5.11由肖阳修改，主要添加了性别，学期的选择框，修改了请求的接口，修改了检验输入的逻辑
2022-10-16 by duanyhui
**/
<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        style="width: 60%"
    >
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
<!--      <el-form-item label="学生学号" prop="sno">-->
<!--        <el-input v-model="ruleForm.sno"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="学生姓名" prop="sname">
        <el-input v-model="ruleForm.sname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ssex">
        <el-select v-model="ruleForm.ssex" placeholder="请选择性别">
          <el-option
              v-for="item in infoList.ssexList"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="学生学院" prop="college">-->
<!--        <el-input v-model="ruleForm.college"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="学生学院" prop="collegeid">
        <el-select v-model="ruleForm.collegeid"  placeholder="请选择" @focus="getCollegeList">
          <el-option
              v-for="item in collegeList"
              :key="item.collegeid"
              :label="item.collegename"
              :value="item.collegeid"
          >
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="学生专业" prop="majorid">
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

      <el-form-item label="学生班级" prop="classid">
        <el-select v-model="ruleForm.classid" filterable placeholder="请先选择专业" @focus="getClassList">
          <el-option
              v-for="item in classList"
              :key="item.classid"
              :label="item.classid+'班'"
              :value="item.classid"
          >
          </el-option>
        </el-select>
      </el-form-item>



<!--      <el-form-item label="学期" prop="termid">-->
<!--        <el-select v-model="ruleForm.termid" placeholder="请选择学期">-->
<!--          <el-option-->
<!--              v-for="item in infoList.termList"-->
<!--              :key="item.term"-->
<!--              :label="item.term"-->
<!--              :value="item.termid"-->
<!--          >-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->




      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >提交
        </el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getClassListByCollegeAndMajorAndSchoolYear, getCollegeList, getMajorList, getSchoolYearList} from "@/api/utils";

export default {
  data() {


    var check_sno = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };

    return {
      majorList: [],
      collegeList: [],
      termList: [],
      schoolYearList: [],
      classList: [],

      ruleForm: {
        schoolyear: sessionStorage.getItem("schoolyear"),

        collegeid: "",
        majorid: "",
        termid: "",
        classid: "",
        sno: "",
        password:123456,
        sname: "",
        ssex: "",
        ssexList: ["男", "女"],
        major: "",
        college: "",
        term: "",
        termList: [
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
      infoList: {
        ssexList: ["男", "女"],
        termList: [
          {termid:1, term:"大一上"},
          {termid:2, term:"大一下"},
          {termid:3, term:"大二上"},
          {termid:4, term:"大二下"},
          {termid:5, term:"大三上"},
          {termid:6, term:"大三下"},
          {termid:7, term:"大四上"},
          {termid:8, term:"大四下"},

        ],
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
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this;
          console.log(this.ruleForm);
          axios.post("/student/add", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg + '  初始密码为123456',
                type: "success",
              });
            } else if (resp.data.code===400) {
              that.$message.error("操作失败");
            }
            //that.$router.push("/studentList");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      console.log(this.ruleForm);
    },

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

    getTermList(){
      const that = this;
      getTerm().then((resp) => {
        console.log(resp.data.data);
        that.termList = resp.data.data;
      });
    },

    getSchoolYearList(){
      const that = this;
      getSchoolYearList().then((resp) => {
        console.log(resp.data.data);
        that.schoolYearList = resp.data.data;
      });
    },
    getClassList(){
      const that = this;
      getClassListByCollegeAndMajorAndSchoolYear(that.ruleForm.collegeid,that.ruleForm.majorid,that.ruleForm.schoolyear).then((resp) => {
        console.log(resp.data.data);
        that.classList = resp.data.data;
      });
    },



  },
};
</script>
