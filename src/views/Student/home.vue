<template>
  <div>
    <el-container >
      <el-main >
<!--        <h1>学生主页</h1>-->
<!--        <info-card></info-card>-->
        <div>
        <el-card style="width: 60%">
        <el-descriptions title="我的信息" direction="vertical" :column="3" border>
          <el-descriptions-item label="学号">{{ sno }}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{ sname }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ ssex }}</el-descriptions-item>
          <el-descriptions-item label="学院">{{ collegename }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{ majorname }}</el-descriptions-item>
          <el-descriptions-item label="学年">{{ termname }}</el-descriptions-item>

        </el-descriptions>
        </el-card>
        </div>
        <div>
        <el-card style="width: 60%; margin-top: 10px">
          <p><i class="el-icon-s-custom" style="margin-right: 18px">Created By 段宇辉</i></p>
          <p><i class="el-icon-s-flag" style="margin-right: 18px">前后端分离，基于Springboot和Vue，数据库使用Mysql，数据库ORM框架采用Mybatis-Plus</i></p>

        </el-card>
        </div>
<!--        <logout></logout>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Logout from "@/components/logout";
import InfoCard from "@/components/infoCard";

export default {
  name: "home",
  components: {InfoCard, Logout},
  data(){
    return{
        sno: sessionStorage.getItem('sno'),
        sname: sessionStorage.getItem('name'),
        ssex: sessionStorage.getItem('ssex'),
        collegename: sessionStorage.getItem('college'),
        majorname: sessionStorage.getItem('major'),
        termname: sessionStorage.getItem('term'),

    }
  }
}
</script>

<style scoped>

</style>