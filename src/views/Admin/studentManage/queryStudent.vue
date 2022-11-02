
<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--            <el-form-item label="学号" prop="sno">-->
<!--              <el-input v-model.number="ruleForm.sno"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="学生姓名" prop="sname">
              <el-input v-model="ruleForm.sname"></el-input>
            </el-form-item>
            <el-form-item label="学生学院" prop="collegeid">
              <el-select v-model="ruleForm.collegeid" placeholder="请选择" @focus="getCollegeList">
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
                    :key="item.majorid"
                    :label="item.majorname"
                    :value="item.majorid"
                >
                </el-option>
              </el-select>
            </el-form-item>
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

            <el-form-item label="学生班级" prop="classid">
              <el-select v-model="ruleForm.classid" filterable placeholder="请先选择专业" @focus="getClassList">
                <el-option
                    v-for="item in classList"
                    :key="item.classid"
                    :label="item.classid"
                    :value="item.classid"
                >
                </el-option>
              </el-select>
            </el-form-item>





<!--            <el-form-item label="模糊查询" prop="fuzzy">-->
<!--              <el-switch-->
<!--                  v-model="ruleForm.fuzzy"-->
<!--                  @change="changeFuzzy"-->
<!--              ></el-switch>-->
<!--            </el-form-item>-->
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
import StudentList from "@/views/Admin/studentManage/studentList";
import {getClassListByCollegeAndMajorAndSchoolYear, getCollegeList, getMajorList, getSchoolYearList} from "@/api/utils";

export default {
  components: {StudentList},
  data() {
    return {
      collegeList: [],
      majorList: [],
      schoolYearList: [],
      classList: [],

      ruleForm: {
        sno: '',
        sname: '',
        fuzzy: true,
        password: "fuzzy",
        schoolyear: '',
        majorid: '',
        collegeid: '',
      },
      rules: {}
    };
  },
  create() {
    this.sno = this.$route.query.sno
    this.sname = null
    this.fuzzy = true
    this.password = "fuzzy";
  },
  methods: {

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

    getClassList(){
      const that = this;
      getClassListByCollegeAndMajorAndSchoolYear(that.ruleForm.collegeid,that.ruleForm.majorid,that.ruleForm.schoolyear).then((resp) => {
        console.log(resp.data.data);
        that.classList = resp.data.data;
      });
    },




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