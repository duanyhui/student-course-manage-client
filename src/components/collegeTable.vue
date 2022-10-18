<template>
  <el-form
      ref="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="100px"
  >
  <el-form-item label="学院" prop="collegeid">
    <el-select  v-model="collegeid"  placeholder="请选择" @change="sendData(collegeid)" @focus="getCollegeList">
      <el-option
          v-for="item in collegeList"
          :key="item.collegeid"
          :label="item.collegename"
          :value="item.collegeid"
      >
      </el-option>
    </el-select>
  </el-form-item>
  </el-form>

</template>

<script>
import {getCollegeList} from "@/api/utils";

export default {
  name: "collegeTable",
  data(){

    return{
      collegeList: [],
      collegeid: "",
      rules: {
        collegeid: [
          { required: true, message: '请选择学院', trigger: 'blur' },
        ],
      },

    }
  },
  methods:{
    getCollegeList() {
      const that = this;
      getCollegeList().then((resp) => {
        console.log(resp.data.data);
        that.collegeList = resp.data.data;

      });
    },
    sendData(data){
      console.log("this.collegeid",this.collegeid);
      this.$emit("sendData",this.collegeid);

    }
  }
}
</script>

<style scoped>

</style>