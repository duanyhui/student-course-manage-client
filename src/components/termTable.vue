<template>
  <el-form :rules="rules" label-width="100px"
           style="width: 60%">
    <el-form-item label="学期" prop="termid"  >
      <el-select v-model="termid" placeholder="请选择学期" @change="sendData">
        <el-option
            v-for="item in infoList.termList"
            :key="item.term"
            :label="item.term"
            :value="item.termid"
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
      infoList: {termList: [
          {termid:1, term:"大一上"},
          {termid:2, term:"大一下"},
          {termid:3, term:"大二上"},
          {termid:4, term:"大二下"},
          {termid:5, term:"大三上"},
          {termid:6, term:"大三下"},
          {termid:7, term:"大四上"},
          {termid:8, term:"大四下"},

        ]
      },
      termid: null,
      rules: {termid: [{ required: true, message: "请选择学期", trigger: "blur" }]}
    }
  },
  methods:{
    sendData(){
      console.log("this.termid",this.termid);
      this.$store.commit("setTermid",this.termid);
      console.log("this.$store.state.termid",this.$store.state.termid);
    }
  }

}
</script>

<style scoped>

</style>