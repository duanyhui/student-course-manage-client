<template>
  <div>
    <el-container>
      <el-main>
<!--        <h1>teacher home</h1>-->
<!--        <info-card></info-card>-->
        <div>
        <el-card style="width: 60%
        ; margin-top: 10px">

        <el-descriptions title="我的信息">
          <el-descriptions-item label="工号">{{ no }}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{ name }}</el-descriptions-item>
          <el-descriptions-item label="学院">
            <el-tag size="small">{{ college }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
          </el-card>
        </div>
        <el-card style="width: 60%">
          <p><i class="el-icon-s-custom" style="margin-right: 18px">Created By 段宇辉</i></p>
          <p><i class="el-icon-s-flag" style="margin-right: 18px">前后端分离，基于Springboot和Vue，数据库使用Mysql，数据库ORM框架采用Mybatis-Plus</i>
          </p>

        </el-card>
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
  data() {
    return {
      no: sessionStorage.getItem('no'),
      name: sessionStorage.getItem('name'),
      college: this.$store.state.collegename
      // college: sessionStorage.getItem('college')
    }
  }
}
</script>

<style scoped>

</style>