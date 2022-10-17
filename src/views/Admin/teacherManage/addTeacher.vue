<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师编号" prop="tno">
        <el-input v-model="ruleForm.tno"></el-input>
      </el-form-item>
      <el-form-item label="教师姓名" prop="tname">
        <el-input v-model="ruleForm.tname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="tsex">
        <el-select v-model="ruleForm.tsex" placeholder="请选择性别">
          <el-option
              v-for="item in infoList.tsexList"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属学院" prop="collegeid">
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


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getCollegeList, getMajorList} from "@/api/utils";

export default {
  data() {
    return {
      collegeList: [],

      ruleForm: {
        tname: null,
        password: 123456,
        tsex:null,
        collegeid:null,
      },
      infoList: {
        tsexList: ["男", "女"],
      },
      rules: {
        tno: [
          {required: true, message: "请输入学号", trigger: "blur"},
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        tname: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur"},
        ],
        tsex: [
          {required: true, message: "请选择性别", trigger: "blur"},
        ],
        collegeid: [
          {required: true, message: "请输入学院", trigger: "blur"},
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          console.log(this.ruleForm)
          // if (that.ruleForm.tname === 'admin') {
          //   that.$message({
          //     showClose: true,
          //     message: 'admin 不可添加',
          //     type: 'error'
          //   });
          //   return
          // }
          axios.post("/teacher/add", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg + '  初始密码为123456',
                type: "success",
              });
            } else if (resp.data.code===400) {
              that.$message.error(resp.data.msg);
            }
            //that.$router.push("/studentList");
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  }
}
</script>