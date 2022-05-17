<template>
  <div>
    <el-container>
      <el-header >
        <div style="text-align: center; font-size: 25px; font-weight: bolder">
          <i class="el-icon-s-home" style="margin-right: 25px"></i>
          选课管理系统
        </div>
      </el-header>
      <el-main>
        <el-card class="login-module" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="text-align: center; font-size: 20px; font-family: 'Microsoft YaHei'">
              <p><i class="el-icon-office-building" style="margin-right: 18px"></i>登陆</p>
            </span>
          </div>
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户 id" prop="id">
                <el-input v-model.number="ruleForm.id" prefix-icon="el-icon-lollipop"></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password">
                <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password prefix-icon="el-icon-ice-cream-round"></el-input>
              </el-form-item>
              <el-form-item label="用户类型" prop="type">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="student" value="student">学生</el-radio>
                  <el-radio label="teacher" value="teacher">老师</el-radio>
                  <el-radio label="admin" value="admin">admin</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <!-- <el-button @click="test('ruleForm')">test</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        id: null,
        password: null,
        type: null,
      },
      rules: {
        id: [
          { required: true, message: '请输入用户 id', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let check = false
          let name = null

          // axios.get('/student/getTerm' + this.ruleForm.sno).then(function (resp) {
          //   sessionStorage.setItem("currentTerm", resp.data.data)
          // })

          // axios.get('http://localhost:10086/info/getForbidCourseSelection').then(function (resp) {
          //   sessionStorage.setItem("ForbidCourseSelection", resp.data)
          // })

          /**
           * author:duanyhui
           * build at 2022-5-4
           *
           */
          //
          if (that.ruleForm.type === 'admin'){
            let form = {uid: that.ruleForm.id, password: that.ruleForm.password}
            console.log(form)

            axios.post("/admin/login",form).then(function (resp){
              //这里resp返回的是bool值,没有进行封装所以resp返回的是没有封装的数据，用resp.data即可访问
              console.log("管理员登陆验证信息：" + resp.data)

              if (resp.data === true) {
                axios.get("/admin/getbyuid",{params:{uid: that.ruleForm.id}}
                ).then(function (resp){
                  /**  这里的resp被封装成了Result对象，
                   * 这个对象有三个属性分别为data，code，msg，所以要用resp.data.data访问数据
                   * */
                  console.log("登陆页正在获取用户信息" + resp.data.data)
                  name = resp.data.data.name
//test
                  /** 按照模板复制粘贴即可，后端没有返回token没有鉴权，没屁用*/
                  sessionStorage.setItem("token", 'true')
                  sessionStorage.setItem("type", that.ruleForm.type)
                  sessionStorage.setItem("name", name)
                  sessionStorage.setItem("uid", resp.data.data.uid)
                  that.$router.push('/admin')
                  console.log('管理员姓名: ' + name + ' ' + that.ruleForm.type + ' ' + resp.data.data.uid)

                  that.$message({
                    showClose: true,
                    message: '登陆成功，欢迎 ' + name + '!',
                    type: 'success'
                  });
                })
              }
              else {
                that.$message({
                    showClose: true,
                    message: '登录失败，密码错误',
                    type: 'error'
                  });
              }
            })
          } else if (that.ruleForm.type === 'student') {
            let form = {sno: that.ruleForm.id, password: that.ruleForm.password};
            console.log(form);

            axios.post("/student/login", form).then(function (resp) {
                  //这里resp返回的是bool值,没有进行封装所以resp返回的是没有封装的数据，用resp.data即可访问
                  console.log("学生登陆验证信息：" + resp.data.code)


                  if (resp.data.code === 200) {

                    axios.get("/student/getbysno/" + form.sno
                    ).then(function (resp) {
                      /**  这里的resp被封装成了Result对象，
                       * 这个对象有三个属性分别为data，code，msg，所以要用resp.data.data访问数据
                       * */
                      console.log("登陆页正在获取用户信息" + resp.data.data)
                      /** 按照模板复制粘贴即可，后端没有返回token没有鉴权，没屁用*/
                      sessionStorage.setItem("token", 'true')
                      sessionStorage.setItem("type", that.ruleForm.type)
                      sessionStorage.setItem("sname", resp.data.data.sname)
                      sessionStorage.setItem("sno", resp.data.data.sno)
                      sessionStorage.setItem("ssex", resp.data.data.ssex)
                      sessionStorage.setItem("major", resp.data.data.major)
                      sessionStorage.setItem("term", resp.data.data.term)
                      that.$router.push('/student'
                      )
                      console.log('学生姓名: ' + name + ' ' + that.ruleForm.type + ' ' + resp.data.data.sno)
                      that.$message({
                        showClose: true,
                        message: '登陆成功，欢迎 ' + name + '!',
                        type: 'success'
                      });
                    })

                  }
                  else{
                    that.$message({
                        showClose: true,
                        message: resp.data.msg,
                        type: 'error'
                      });
                  }

                }
            )
          }
          else if (that.ruleForm.type === 'teacher'){
            let form = {tno: that.ruleForm.id, password: that.ruleForm.password}
            console.log(form)

            axios.post("/teacher/login",form).then(function (resp){
              //这里resp返回的是bool值,没有进行封装所以resp返回的是没有封装的数据，用resp.data即可访问
              console.log("老师登陆验证信息：" + resp.data)
              // check = resp.data.data
              if (resp.data.code===200 ) {
                // axios.get("/teacher/getbytno",{params:{tid: that.ruleForm.id}}
                // ).then(function (resp){
                  /**  这里的resp被封装成了Result对象，
                   * 这个对象有三个属性分别为data，code，msg，所以要用resp.data.data访问数据
                   * */
                  console.log("登陆页正在获取用户信息" + resp.data.data)
                  name = resp.data.data.tname
//test
                  /** 按照模板复制粘贴即可，后端没有返回token没有鉴权，没屁用*/
                  sessionStorage.setItem("token", 'true')
                  sessionStorage.setItem("type", that.ruleForm.type)
                  sessionStorage.setItem("tname", resp.data.data.tname)
                  sessionStorage.setItem("tno", resp.data.data.tno)
                sessionStorage.setItem("college", resp.data.data.college)
                sessionStorage.setItem("ssex", resp.data.data.ssex)

                  that.$router.push('/teacher')
                  console.log('管理员姓名: ' + name + ' ' + that.ruleForm.type + ' ' + resp.data.data.tno)

                  that.$message({
                                showClose: true,
                                message: '登陆成功，欢迎 ' + name + '!',
                                type: 'success'
                              });
                // })
              }
              else if(resp.data.code===400){
                that.$message({
                  showClose: true,
                  message: resp.data.msg,
                  type: 'error'
                });
              }
            })
          }

          else {
            console.log("! error type")
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test(forName) {
      console.log(this.ruleForm)
    }
  }
}
</script>

<style>
.login-module {
  /*width: 380px;*/
  /*height: 325px;*/
  margin-top: 60px;
  /*border: none;*/
  position: absolute;
  right: 500px;
  text-align: center;
  width: 30%;
  margin: 0 auto;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  text-align: center;
}
</style>