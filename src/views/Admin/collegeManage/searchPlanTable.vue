<template>
  <div>
  <college-table></college-table>
  <el-form label-width="100px"
           style="width: 60%"
  :rules="rules">
    <el-form-item label="专业" prop="majorid">
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
    <term-table @change="getCourseList"></term-table>
    <el-button @click="getCourseList" style="margin-left: 100px">查询</el-button>
  </el-form>

    <el-table
        :data="tableData"
        height="250"
        border
        style="width: 60%
        ;margin-left: 50px">
      <el-table-column
          prop="cno"
          label="课程编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="ccredit"
          label="学分">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型">
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
import CollegeTable from "@/components/collegeTable";
import TermTable from "@/components/termTable";
import {getMajorList} from "@/api/utils";
export default {
  name: "searchPlanTable",
  components: {TermTable, CollegeTable},
  data() {
    return {
      majorList: [],
      tableData: [],
      ruleForm: {
        majorid: "",
        collegeid: "",
      },
      rules:{
        majorid: [
          { required: true, message: '请选择专业', trigger: 'blur' },
        ],
      }
    };
  },
  methods:{
    getMajorList() {
      const that = this;
      getMajorList(this.$store.state.collegeid).then((resp) => {
        if(resp.data.code===400){
        }
        that.majorList = resp.data.data;

      });
    },
    getCourseList(){
    axios.get("/plan/get_course_list",{
      params:{
        majorid:this.ruleForm.majorid,
        collegeid:this.$store.state.collegeid,
        termid:this.$store.state.termid
      }
    }).then((resp)=>{
      console.log(resp.data.data);
      this.tableData = resp.data.data;
    })
    }

  },


}
</script>

<style scoped>

</style>