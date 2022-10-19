<template>
  <el-form :rules="rules" label-width="100px"
           style="width: 60%">
    <el-form-item label="上课时间" prop="classtimeid"  >
      <el-select v-model="classtimeid" placeholder="请选择时间" @change="sendData">
        <el-option
            v-for="item in infoList.TimeList"
            :key="item.classtime"
            :label="item.classtime"
            :value="item.classtimeid"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  name: "TermTable",
  data(){
    return{
      infoList: {TimeList: [
          {classtimeid:1, classtime:"一二节"},
          {classtimeid:2, classtime:"三四节"},
          {classtimeid:3, classtime:"五六节"},
          {classtimeid:4, classtime:"七八节"},


        ]
      },
      classtimeid: null,
      rules: {classtimeid: [{ required: true, message: "请选择学期", trigger: "blur" }]}
    }
  },
  methods:{
    sendData(){
      console.log("this.classtimeid",this.classtimeid);
      this.$store.commit("setClasstimeid",this.classtimeid);
      console.log("this.$store.state.classtimeid",this.$store.state.classtimeid);
    }
  }

}
</script>

<style scoped>

</style>