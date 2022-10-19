<template>
  <div>
    <el-form :model="Form" :rules="rules" ref="Form" label-width="100px"  style="width: 35%">
      <college-table @sendData="sendData"></college-table>
      <el-form-item label="专业名称" prop="majorname">
        <el-input v-model="Form.majorname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createCollege, createMajor, createPlanIndex} from "@/api/utils";
import CollegeTable from "@/components/collegeTable";


export default {
  components: {CollegeTable},
  data() {
    return {
      Form: {
        majorname: '',
        collegeid: null,
        code: null,
        majorid: null,
      },
      rules: {
        majorname: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {

    sendData(data) {
      //从子组件获取数据
      console.log("data",data);
      this.Form.collegeid = data;
    },


    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // createPlanIndex(this.Form.majorid,this.Form.collegeid).then(res =>{
          //   if (res.data.code=== 200) {
          //     this.$message({
          //       message: '成功创建专业和该专业八个学期的计划索引表',
          //       type: 'success'
          //     });
          //   } else {
          //     this.$message({
          //       message: res.data.msg,
          //       type: 'error'
          //     });
          //   }
          // })

          console.log(this.Form.majorname);

          console.log(this.Form.collegeid);
          createMajor(this.Form.majorname,this.$store.state.collegeid).then(res =>{
            if (res.data.code=== 200) {
              console.log("进来了吗1")
              this.Form.majorid = res.data.data;
              this.Form.code = res.data.code;
              console.log("code"+this.Form.code);



              this.$message({
                message: '添加成功,成功创建专业和该专业八个学期的计划索引表',
                type: 'success'
              });
            }
            else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }



          })


        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}

</script>

<style scoped>

</style>