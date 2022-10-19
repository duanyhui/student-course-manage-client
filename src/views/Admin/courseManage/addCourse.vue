<template>
  <div>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程号" prop="cno">
        <el-input v-model="ruleForm.cno"></el-input>
      </el-form-item>
      <el-form-item label="课程名" prop="cname">
        <el-input v-model="ruleForm.cname"></el-input>
      </el-form-item>
      <el-form-item label="学分" prop="ccredit">
        <el-input v-model.number="ruleForm.ccredit"></el-input>
      </el-form-item>

      <el-form-item label="课程类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择课程类型">
          <el-option
              v-for="item in typeList"
              :key="item.typename"
              :label="item.typename"
              :value="item.typeid"
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
export default {
  data() {
    return {
      typeList:[
        {typeid:"公共课",typename:"公共课"},
        {typeid:"专业课",typename:"专业课"},
        {typeid:"通识课",typename:"通识课"}
      ],
      ruleForm: {
        cno: '',
        cname: '',
        ccredit: '',
        type:''
      },
      rules: {
        cno: [
          { required: true, message: '请输入课程号', trigger: 'change' },
          {pattern: /^-?\d+$/, message: "请输入数字", trigger: "blur"},

        ],
        cname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        ccredit: [
          { required: true, message: '请输入学分', trigger: 'change' },
          { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        type:[
          {required: true,message: '请选择课程类型', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过前端校验
          const that = this
          // console.log(this.ruleForm)

          axios.post("/course/add", this.ruleForm).then(function (resp) {
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
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // test() {
    //   console.log(this.ruleForm)
    // }
  }
}
</script>