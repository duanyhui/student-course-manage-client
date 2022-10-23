<template>
  <div >
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师编号" prop="tno">
        <el-input v-model="ruleForm.tno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="quirybytno('ruleForm')"
        >查询
        </el-button
        >
      </el-form-item>
      <el-form-item label="教师密码" prop="password">
        <el-button type="primary" @click="resetPassword('ruleForm')"
        >重置教师密码为123456
        </el-button
        >
      </el-form-item>
      <el-form-item label="教师姓名" prop="tname">
        <el-input v-model="ruleForm.tname" :value="ruleForm.tname"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age" >
        <el-input v-model="ruleForm.age"></el-input>
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

      <!--      学历-->
      <el-form-item label="学历" prop="education">
        <el-select v-model="ruleForm.education" placeholder="请选择">
          <el-option
              v-for="item in educationList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
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
import {getCollegeList, getCollegeName} from "@/api/utils";

export default {
  data() {
    return {
      showCard:false,
      collegeList: [],
      educationList: [ {
        label: '硕士',
        value: '硕士'
      },{
        label: '博士',
        value: '博士'
      }, {
        label: '副教授',
        value: '副教授'
      }, {
        label: '教授',
        value: '教授'
      }],

      ruleForm: {
        collegeid: null,

        tno: this.$route.query.tno,
        tname: null,
        tsex:null,
        college:null,
        education: null,
        age: null,
      },
      resetpass: {
       tno:null,
       password:123456,
      },
      infoList: {
        tsexList: ["男", "女"],
      },
      rules: {
        tno: [
          {required: true, message: "请输入教师号", trigger: "blur"},
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},
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
        age: [
          {required: true, message: "请输入年龄", trigger: "blur"},
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},
        ],
        education: [
          {required: true, message: "请输入学历", trigger: "blur"},
        ],
      }
    };
  },
  // created() {
  //   const that = this
  //   if (this.$route.query.tno === undefined) {
  //
  //   }
  //   else {
  //     this.ruleForm.tno = this.$route.query.tno
  //   }
  //   axios.get('/teacher/findByTno/' + this.ruleForm.tno).then(function (resp) {
  //     that.ruleForm = resp.data
  //   })
  // },
  created() {

  },
  methods: {
    resetPassword(){
      const that=this
      if(this.ruleForm.tno!=null && this.ruleForm.tno!='') {
        this.resetpass.tno = this.ruleForm.tno
        axios.post("/teacher/update", this.resetpass).then(function (resp) {
          if (resp.data.code === 200) {

            that.$message({
              showClose: true,
              message: '修改密码成功！',
              type: 'success'
            });
          } else {
            that.$message.error(resp.data.msg);
          }
          //that.$router.push("/queryTeacher")
        })
      }
      else {
        that.$message({
          showClose: true,
          message: '学号未输入，请重试！',
          type: 'error'
        });
      }
    },
    quirybytno() {//点击查询按钮查询教师编号对应学生信息，并且填入对应输入框，选择框中
      const that = this;
      //try {
      if (this.ruleForm.tno === '' || this.ruleForm.tno === null)
        that.$message.error('未输入教师号！')
      else
        axios
            .get("/teacher/getByTno/" + this.ruleForm.tno)
            .then(function (resp) {

              // that.ruleForm = resp.data
              if (resp.data.code === 200) {


                that.$message({
                  showClose: true,
                  message: "查询到的教师信息如下",
                  type: "success",
                });

                //学院名称通过异步请求获取
                 getCollegeName(resp.data.data.collegeid).then((res) => {
                   that.ruleForm.college = res.data.data;
                   this.showCard = true;

                 })


                that.ruleForm.tname = resp.data.data.tname;
                that.ruleForm.tsex = resp.data.data.tsex;
                that.ruleForm.age = resp.data.data.age;
                that.ruleForm.education = resp.data.data.education;





              } else if (resp.data.code === 400) {
                that.$message.error(resp.data.msg);
              }
            });
      // } catch (error) {
      //   this.$message.error("无法连接到服务器");
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          if (that.ruleForm.tname === 'admin') {
            that.$message({
              showClose: true,
              message: 'admin 不可编辑',
              type: 'error'
            });
            this.$router.push('/queryTeacher')
            return
          }
          console.log(this.ruleForm)
          axios.post("/teacher/update", this.ruleForm).then(function (resp) {
            if (resp.data.code === 200) {
              that.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              });
            } else {
              that.$message.error(resp.data.data);
            }
            //that.$router.push("/queryTeacher")
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      console.log(this.ruleForm)
    },

    getCollegeList() {
      const that = this;
      getCollegeList().then((resp) => {
        that.collegeList = resp.data.data;
      });
    },

  }

}
</script>